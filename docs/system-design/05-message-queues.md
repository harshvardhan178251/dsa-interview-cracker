---
title: Message queues and event streaming
order: 5
summary: Decoupling with queues — delivery guarantees, ordering, retries, dead letters, and the difference between a message queue and an event log.
---

# Message queues and event streaming

## Why decouple at all

Without a queue, `Service A` calls `Service B` synchronously:

- **Latency adds up.** A → B → C → D is four network round trips.
- **Availability multiplies.** If B is down, A is down.
- **Traffic spikes hit the weakest link.** A burst of 100,000 requests hits B instantly.

With a queue, A writes a message and returns:

- **Latency drops** — A no longer waits for B to finish the work.
- **Availability improves** — A stays up while B is down; the backlog drains later.
- **Load is smoothed** — the consumer works at its own steady rate.
- **New consumers can be added** without touching the producer.

---

## Message queue vs event log

| | Message queue | Event log (Kafka) |
|---|---|---|
| **Delivery** | Each message goes to one consumer group | Each group reads the whole log independently |
| **Ordering** | Per-queue, usually FIFO | Per-partition, guaranteed |
| **Retention** | Delete on read | Retained for a period; replayable |
| **Use for** | Work distribution, task queues | Event sourcing, log aggregation, many consumers |
| **Examples** | SQS, RabbitMQ, Google Pub/Sub | Kafka, Pulsar, Kinesis |

**The key difference is replayability.** A Kafka topic is a durable, replayable log — you
can rewind and reprocess. A classic queue deletes messages once acknowledged.

---

## The publisher/subscriber pattern

One event, many independent consumers:

```
              ┌─▶ fraud checker
Producer ──▶ topic ─┼─▶ notification service
              └─▶ analytics pipeline
```

Each consumer tracks its own offset, so adding a consumer does not affect the others. This
is how you add a new feature (say, SMS notifications) without touching the producer.

---

## Delivery guarantees

| Guarantee | Meaning | Cost |
|---|---|---|
| **At most once** | The message may be lost | Fast, simple |
| **At least once** | The message may be delivered twice | The common default |
| **Exactly once** | Exactly one delivery, no duplicates | Expensive, usually not end-to-end |

**Exactly once is a lie in distributed systems.** What usually exists is "effectively once":
at-least-once delivery plus **idempotent consumers**.

### Idempotent consumers

Make the consumer safe to re-run:

```java
public void handle(OrderCreated event) {
    if (processedEvents.contains(event.eventId())) {
        return;                       // already applied
    }
    applyEffect(event);
    processedEvents.add(event.eventId());
}
```

Or make the effect itself idempotent — `INSERT ... ON CONFLICT DO NOTHING`, or a
`SET` operation instead of an `INCREMENT`.

**Design every consumer to be idempotent.** Assume the message will arrive twice; the only
question is when.

---

## Ordering

FIFO ordering is only guaranteed **within a partition**. If you partition by `customer_id`,
then all events for one customer are ordered, but events for different customers are
interleaved.

**That is usually exactly what you want.** Partition by the entity whose order matters.

Ordering across the whole topic is rarely required and is expensive to provide.

---

## Failure handling

### Retry with exponential backoff

```java
int delay = (int) (baseDelayMs * Math.pow(2, attempt));
// attempt 0 → 100ms, 1 → 200ms, 2 → 400ms, ...
// add jitter so retries from many clients do not synchronise
delay += ThreadLocalRandom.current().nextInt(0, 100);
```

**Jitter is essential.** Without it, every client that failed at the same time retries at
the same time, and you get a retry storm — the classic cause of a cascading outage.

### Dead-letter queue (DLQ)

Messages that fail after N retries go to a separate queue for inspection and replay.

```
main queue ──fail──▶ retry queue ──fail──▶ dead-letter queue
                                            (inspect + fix + replay)
```

Without a DLQ, a poison message (one that always fails) blocks the queue forever, and
nothing tells you.

### Circuit breaker

If a downstream service is failing, stop sending it messages. Fail fast, let the backlog
build, resume when it recovers. Otherwise you turn a small failure into a total one.

---

## Poison messages and ordering

A single message that always throws will be retried forever and can stall everything
behind it. Mitigations:

- **Bounded retries** → DLQ.
- **Skip and continue** — log it, move on, alert.
- **Partition by key** — only the messages for that key stall, not the whole topic.

---

## Backpressure

When producers outrun consumers, the queue grows. Options:

| Strategy | How | Trade-off |
|---|---|---|
| **Blocking the producer** | The queue applies backpressure | The producer slows down — correct, but visible |
| **Dropping messages** | Discard when full | Data loss; only acceptable for metrics |
| **Buffering** | Accept and process later | Memory grows unboundedly — a latent OOM |
| **Scaling consumers** | Add workers | Costs money, but keeps up |
| **Load shedding** | Reject with 429/503 | The client retries elsewhere |

**Every queue needs a bounded size and an explicit overflow policy.** An unbounded queue is
a delayed outage.

---

## Fan-out and fan-in

**Fan-out** — one message triggers many actions:

```
OrderPlaced ─┬─▶ reserve inventory
             ├─▶ charge payment
             ├─▶ create shipment
             └─▶ notify warehouse
```

Each is independent and can fail on its own. Make each idempotent and give each its own
retry policy.

**Fan-in** — many results combine into one:

```
OrderPlaced ─┬─▶ reserve ──┐
             ├─▶ charge  ──┼─▶ await all ──▶ commit
             └─▶ ship    ──┘
```

Fan-in needs a **saga** — a distributed transaction without a distributed transaction.

---

## Sagas

A saga is a sequence of local transactions, each with a compensating action:

```
Step 1: Reserve inventory     → compensate: release inventory
Step 2: Charge payment        → compensate: refund payment
Step 3: Create shipment       → compensate: cancel shipment
```

If step 3 fails, run the compensations for steps 2 and 1 in reverse order.

**Sagas give you eventual consistency, not atomicity.** Intermediate states are visible —
the customer may briefly see "paid but not shipped". Design the UI for that.

Alternatives: **two-phase commit** (slower, blocking, and the classic cause of
distributed deadlocks) or an **outbox pattern** for guaranteed message publication.

---

## The transactional outbox

The classic dual-write problem: writing to the database and publishing a message are two
operations, and you cannot make them atomic.

**Outbox pattern:**
1. In one database transaction: write the entity **and** write an outbox row.
2. A separate process polls the outbox and publishes to the queue.
3. After publishing, mark the outbox row as sent.

The publish is **at least once**, so consumers must be idempotent. But there is never a
lost event, and there is no window where the database committed but the message was never
sent.

This is the standard fix and worth mentioning by name.

---

## Choosing a technology

| Need | Use |
|---|---|
| Simple task distribution, managed | SQS, Google Pub/Sub |
| Complex routing, per-message priority, delayed delivery | RabbitMQ |
| High throughput event log, many consumers, replay | Kafka, Kinesis |
| Async work between services, exactly-once-ish | SQS + a DLQ |

---

## Interview questions to expect

**"How do you ensure the message is not lost?"**
> "At-least-once delivery plus an idempotent consumer. For the publish side I use the
> transactional outbox so the database commit and the message publish cannot diverge."

**"What if the consumer is slow?"**
> "The queue absorbs the burst. I'd autoscale consumers on queue depth, which reacts much
> faster than CPU, and I'd bound the queue size so a sustained overload fails visibly
> instead of silently consuming memory."

**"How do you handle ordering?"**
> "Ordering is only guaranteed within a partition, and I partition by the entity whose
> order matters — the customer id for an order stream. I don't need global ordering, and
> providing it would be expensive."

**"How do you handle a poison message?"**
> "Bounded retries with exponential backoff and jitter, then a dead-letter queue. Nothing
> blocks the queue behind it, and the DLQ gives me something to inspect and replay."

**"How do you test this?"**
> "The publisher and consumer are separate deployables, so I test them separately. The
> consumer is tested by replaying a recorded stream of messages and asserting the effects.
> I also test the failure paths — a message that throws, a broker that is down, and a
> duplicate delivery."

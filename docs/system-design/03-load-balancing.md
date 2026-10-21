---
title: Load balancing and scaling
order: 3
summary: How requests get distributed, how systems grow from one box to a global deployment, and the health checks, autoscaling and failover that keep it running.
---

# Load balancing and scaling

## What a load balancer does

1. **Distributes** incoming requests across a pool of servers.
2. **Health checks** — removes unhealthy servers from the pool.
3. **SSL termination** — decrypts the TLS connection so app servers do not pay for it.
4. **Routing** — by path, host, header, cookie (canary releases, A/B tests).
5. **Rate limiting** — sometimes, at the edge.

### Layer 4 vs Layer 7

| | Layer 4 (TCP) | Layer 7 (HTTP) |
|---|---|---|
| Inspects | Connection only | Full request: path, headers, body |
| Routing | By IP/port | By path, host, header |
| SSL | Passes through | Terminates |
| Cost | Cheap, fast | More CPU per request |
| Use for | TCP/UDP services, DB connection pools | HTTP APIs |

Most web traffic is Layer 7. Say so, and say why (you need per-route routing and SSL
termination).

### Algorithms

| Algorithm | How | When |
|---|---|---|
| **Round robin** | Next server in the list | Servers are identical, sessions are external |
| **Least connections** | Server with the fewest active connections | Requests have wildly different durations |
| **IP hash** | Hash of the client IP | Sessions are sticky and cannot be externalised |
| **Weighted round robin** | Capacity-proportional weights | A heterogeneous fleet (big and small boxes) |
| **Least response time** | Lowest latency | Heterogeneous or noisy fleets |
| **Consistent hashing** | Hash ring | You shard the *cache* or the *data*, not the traffic |

**Consistent hashing** deserves a sentence in interviews because you may be asked to
design it: hash the keys onto a ring of virtual nodes, each server owns a range of the
ring, and when a server dies only its range moves to its neighbour. Adding a server moves
only the keys that fall in its new range — unlike modulo hashing, which reshuffles
everything.

---

## Sessions: the sticky-session trap

Sticky sessions (hash the user to a server) are convenient and cause problems:

- A server dying loses that user's session.
- Autoscaling becomes hard — you cannot remove a server with sticky traffic.
- Load becomes uneven as users spread unevenly.

**Prefer stateless services.** Keep the session in a shared store (Redis) or in a signed,
encrypted cookie. Then the load balancer is free to route anywhere.

If you must use stickiness, say why: *"The session holds a large in-memory game state that
we cannot serialise, so we pin users to a shard."*

---

## Vertical vs horizontal scaling

**Vertical** — upgrade the box. Bigger RAM, faster CPU.

- Pro: simple, no code change, great for stateful systems like a database.
- Con: has a ceiling, expensive, and you still have to restart.

**Horizontal** — add machines.

- Pro: the ceiling is economic, not technical.
- Con: requires statelessness, and coordination (consensus, sharding).

**The realistic answer:** most systems scale vertically first (it is one change, not an
architecture), then horizontally once a single box cannot keep up. Say both, in that order.

---

## Stateless services

A stateless service keeps **no state between requests**. All state lives in a database, a
cache, or the client's request.

This is the property that makes horizontal scaling trivial: any instance can serve any
request, so the load balancer can route freely and instances can be added or removed at
will.

**How to make a service stateless:**
- Store session data in Redis or a signed cookie.
- Put large uploads in object storage (S3) and pass a URL, not bytes.
- Do not cache derived data in instance memory (or if you do, accept that it is a
  per-instance cache).

---

## Autoscaling

**Metrics that trigger scaling:**

| Metric | Good for |
|---|---|
| CPU utilisation | CPU-bound services |
| Request rate per instance | Stateless services with variable cost per request |
| Queue depth | Asynchronous workers, message consumers |
| Custom business metric | Most accurate, but needs work |

**Why CPU is often a poor trigger:** it lags. By the time CPU is high, latency is already
spiking. Request rate or queue depth reacts sooner.

**Scaling policies:**
- **Target tracking** — "keep 60% CPU utilisation". The default, and the right answer
  most of the time.
- **Step scaling** — rules at fixed thresholds.
- **Scheduled scaling** — scale up before a known event (a launch, a game release).
- **Predictive scaling** — forecast from history.

**Scale down carefully.** A scale-down needs a drain period: stop sending new requests,
let in-flight ones finish, then terminate. Killing a server mid-request is a visible
error to the user.

**Warm-up.** A cold JVM takes 30–60 seconds to reach full speed. Scale-out without warm-up
means the new instances are slow exactly when you need them fast.

---

## Multi-AZ and multi-region

**Multi-AZ (availability zones)** — three or more physically separate data centres in one
region.

- Deploy the app across 3 AZs.
- The primary database has a synchronous standby in another AZ.
- A load balancer with an AZ-aware health check routes around a failed AZ.
- This gets you **99.99%** availability for a single-region system.

**Multi-region** — separate deployments in different regions.

- **Active-active:** both regions serve traffic. Lowest latency, hardest to keep
  consistent.
- **Active-passive:** one region serves, the other is warm. Simpler; failover is slower.
- **Data residency** may force you to keep some data in one region.

**Consistency across regions is the hard part.** Options:

| Approach | Latency | Consistency | Complexity |
|---|---|---|---|
| Single-writer, read replicas in other regions | High on cross-region reads | Strong on writes | Low |
| Multi-writer, async replication | Low | Eventual | Medium |
| Multi-writer, sync replication | High (2× RTT) | Strong | High, and it hurts throughput |
| Eventual with conflict resolution (CRDT / LWW) | Low | Converges | High |

**Be honest about the trade-off.** "I'm choosing eventual consistency here, which means a
user in another region may see their own write up to 200 ms later. That's acceptable because
this feature is a feed, not a payment." That is a senior answer.

---

## Zero-downtime deployment

1. **Deploy** the new version to a few instances (canary).
2. **Shift 1% of traffic** to the canary.
3. **Watch** error rate and p99 latency.
4. **Ramp up** gradually: 1% → 10% → 50% → 100%.
5. **Roll back** automatically if the error rate crosses the threshold.

Blue-green is the simpler variant: deploy the new fleet alongside the old, then flip the
load balancer. Rollback is instant, but you pay for double the capacity during the deploy.

**Feature flags** decouple deploy from release. Ship the code dark, enable the flag for
1% of users, ramp up. That is how large companies avoid deploying on a Friday.

---

## Health checks

| Type | Checks | Used by |
|---|---|---|
| **Liveness** | "Is the process alive?" | The orchestrator — restart it if it fails |
| **Readiness** | "Can this instance serve traffic right now?" | The load balancer — remove it if it fails |
| **Startup** | "Has it finished booting?" | The orchestrator — do not kill it while it warms up |

**The distinction matters.** A liveness check that also tests dependencies causes a
restart storm: the database hiccups, every instance fails liveness, the whole fleet
restarts, and the database is now overloaded by a cold-start stampede.

**Liveness should be shallow** (is the main thread alive?). **Readiness can be deep**
(can I reach the DB?) — but even that should have a short timeout and be cached, because a
slow dependency will otherwise take out the whole fleet.

---

## What to say in the interview

> "I'll start with a stateless service behind a load balancer, so I can scale horizontally.
> The load balancer does least-connections routing since my request cost varies. I'll keep
> sessions in Redis rather than using sticky cookies, which means I can scale down
> aggressively. I'll run across three availability zones with an AZ-aware health check,
> and I'll autoscale on request rate rather than CPU because CPU lags.
>
> The first bottleneck will be the database, since 95% of traffic is reads but every request
> still hits the primary. So I'll put a read-through cache in front of it, which also gives
> me the headroom to scale the app tier further."

That paragraph shows the whole chain of reasoning: requirement → structure → failure mode
→ mitigation → next bottleneck.

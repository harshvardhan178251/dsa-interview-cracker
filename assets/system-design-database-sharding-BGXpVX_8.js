var e=`system-design:database-sharding`,t=`
# Database sharding and replication

## Replication vs partitioning

They are different answers to different problems.

| | Replication | Partitioning (sharding) |
|---|---|---|
| **Problem solved** | Read throughput, availability, fault tolerance | Write throughput, storage capacity |
| **Data** | Copies of the *same* data | *Disjoint* slices of the data |
| **Can a query span it?** | Yes — one query, many replicas | Hard — needs a scatter-gather |
| **Cost** | Storage | Coordination complexity |

**Do not confuse them in an interview.** Replication is easy and safe. Sharding is a
commitment.

---

## Replication topologies

**Primary → replicas (asynchronous).**
The primary writes; replicas pull. Reads scale out. But the replicas **lag** — so a client
that writes then immediately reads from a replica may not see its own write.

> "Read-your-writes" is the problem this creates. The fixes, in increasing cost:
> 1. Read from the primary for a short window after a write (sticky reads).
> 2. Pass the replica's LSN with the write and require the replica to be at least that far.
> 3. Route that user's reads to the primary until the replica catches up.

**Primary → replicas (synchronous).**
The primary waits for at least one replica to acknowledge. No lost writes if the primary
dies. But every write pays an extra round trip, and if the sync replica dies, writes stall.

**Quorum.** Any \`w\` of \`2w+1\` nodes acknowledge. \`w = 1\` and \`w = 2\` both tolerate \`w-1\`
failures, but with different latency and consistency trade-offs.

---

## The CAP theorem, said precisely

Under a **network partition**, a distributed system must choose between:

- **C**onsistency: every read returns the most recent write.
- **A**vailability: every request returns a non-error response.
- **P**artition tolerance: the system keeps working despite the network splitting.

Partitions are not an option — they happen. So you choose C or A.

| Choice | You get | You lose |
|---|---|---|
| CP | Strong consistency, no stale reads | Requests fail during a partition |
| AP | Always responds | Stale data; needs conflict resolution |

**The industry default is AP with eventual consistency**, plus CP where it actually matters
(payments, inventory counters, account balances).

**Say the trade-off explicitly.** "Feed reads are AP — a user might see a post 200 ms late,
which is fine. Payments are CP — during a partition I would rather reject the request than
double-charge someone."

---

## Choosing a shard key

This is the decision you cannot easily undo. It determines your data distribution, your
query patterns, and how painful a re-shard will be.

**Good shard keys:**
- **High cardinality** — many distinct values, so the data spreads.
- **Evenly distributed** — no hot shard. \`user_id % 16\` fails if one user owns 40% of the data.
- **Aligned with query patterns** — most queries hit one shard, so they stay a single-shard
  query.
- **Monotonically increasing data should not go into a range key** — \`user_id\` as a range key
  means every new row lands on the newest shard.

**Common keys and their failure modes:**

| Key | Good for | Fails when |
|---|---|---|
| \`user_id\` | Per-user data, feeds | One user is huge (a whale) |
| \`tenant_id\` | Multi-tenant SaaS | One tenant dominates |
| \`created_at\` (range) | Time-series, log data | Writes concentrate on the newest shard |
| \`hash(id)\` | Even distribution | Cross-shard queries; no locality |
| \`country\` / \`region\` | Geographic latency | Unbalanced populations |

**The range-sharding trap.** With \`created_at\` ranges, every new write hits the last shard.
That shard melts while the others idle. Fix: shard by a hash, or write to a small number of
"current" shards and roll them over.

**The hot-shard fix.** If one key is disproportionately hot:
- **Split the key** — \`key:0\`, \`key:1\`, … distribute the sub-entities.
- **Replicate the key** — a separate small table for hot entities, fanned out.
- **Add a dedicated cache** in front of that key.

### Consistent hashing

When you need to add or remove a shard without reshuffling everything:

1. Hash every key onto a ring of \`N\` virtual points (say 100 per node).
2. Each node owns a contiguous arc of the ring.
3. A key belongs to the first node clockwise from its hash position.
4. Adding a node moves only the keys in its new arc.
5. Removing a node moves only its keys to the successor.

**Virtual nodes are essential.** Without them, the distribution is uneven and adding a node
causes a large rebalance.

---

## Resharding

Resharding a live system is the hardest part of sharding. The usual approach:

1. **Dual write** — write to both the old and the new shard layout.
2. **Backfill** — a background job copies historical data to the new layout.
3. **Verify** — compare checksums between the two layouts.
4. **Switch reads** — flip reads to the new layout.
5. **Stop writing the old layout** — after a safety window.

**Why not just do an outage?** Sometimes you must, for a small system, and saying so
honestly is better than pretending it is impossible. For anything large, dual-write plus
backfill is the standard.

**Modern managed databases do this for you.** DynamoDB, Spanner and CockroachDB handle
partitioning, rebalancing and cross-shard queries. If the interviewer allows managed
services, saying *"I would use a managed NoSQL store with automatic partition management,
and the sharding decision reduces to choosing the partition key"* is often the strongest
answer — it shows you know what to build and what *not* to build.

---

## Cross-shard queries

The cost you pay for sharding.

| Strategy | How | When |
|---|---|---|
| **Scatter-gather** | Query every shard, merge in the app | Small fan-out, tolerable latency |
| **Fan-out on write** | At write time, update a denormalised read model | Reads must be fast and simple |
| **Global secondary index** | Maintain a global index across shards | Cross-shard queries by another dimension |
| **CQRS** | Separate write model and read model | Different read and write shapes at scale |
| **Change data capture** | Stream writes into a specialised store | Analytics, search, recommendations |

**Fan-out on write** is the pattern most often missed, and it is the one that keeps reads
fast. It is a deliberate trade: you pay more on write so that reads are simple and fast.

---

## Indexing and the queries you actually serve

List the hot queries first, then design the schema to serve them.

\`\`\`sql
-- hot query: "the 20 most recent posts by user X"
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);
\`\`\`

Column order in an index matters:
- \`(user_id, created_at DESC)\` serves "posts by user, newest first" **and** "posts by user".
- \`(created_at, user_id)\` serves only the second, poorly.

**Covering indexes.** Include the columns you select in the index so the query is answered
from the index without touching the table:

\`\`\`sql
CREATE INDEX idx_posts_cover ON posts (user_id, created_at DESC) INCLUDE (title, image_url);
\`\`\`

**Avoid over-indexing.** Every index is a write cost and memory cost. Two or three
well-chosen indexes beat ten.

---

## Connection pooling

Every database connection is an expensive resource. A pool sits between your app and the
database.

- **Size it from the database's capacity**, not from the app's thread count.
  Postgres's default \`max_connections\` is 100. With 10 app servers, that is 10 connections
  each — and one more server breaks the database.
- Formula: \`pool size ≈ (max_connections − reserved) / number of app instances\`.
- **Long-lived transactions hold connections.** A transaction that waits on a slow query
  holds its connection the whole time. This is the most common cause of "the database is
  out of connections".
- **Use a proxy** (PgBouncer, RDS Proxy) when you need hundreds of app instances.

---

## Database selection, in one table

| Need | Use |
|---|---|
| Transactions, joins, moderate scale | Postgres |
| Key-value, huge write volume, simple queries | DynamoDB / Cassandra |
| Global, strongly consistent, relational | Spanner / CockroachDB |
| Search and analytics | Elasticsearch / ClickHouse |
| Object and file storage | S3 / GCS |
| Long-lived, ordered event log | Kafka |
| Graph traversal | Neo4j |

---

## Talking points for the interview

**"How do you shard?"**
> "I'd pick a shard key based on the primary access pattern — for a messaging system that's
> \`conversation_id\`, which keeps both the read and the write on one shard. I'd use consistent
> hashing with virtual nodes so I can add nodes without a big reshuffle."

**"What if one key is too hot?"**
> "I'd split the key by sub-entity or shard it by a secondary dimension, and put a dedicated
> cache in front of it."

**"What about the write bottleneck?"**
> "Replication doesn't help writes — only one primary can accept them. So the write path
> scales by partitioning, and reads scale by replication. Those are separate axes."

**"How do you handle a shard failure?"**
> "Each shard has a replica. On failure the coordinator promotes the replica and the
> application retries against the new primary. Cross-shard consistency is eventually
> consistent; within a shard it is strong."

**"When would you not shard?"**
> "Until vertical scaling stops being economical, or until a single query's working set
> no longer fits in memory. Sharding is a commitment with a real operational cost, and it
> should be the last step, not the first."
`,n={id:e,body:t};export{t as body,n as default,e as id};
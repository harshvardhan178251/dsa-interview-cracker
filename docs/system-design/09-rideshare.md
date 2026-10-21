---
title: Design a rideshare service
order: 9
summary: Uber-style ride matching — the hardest real-time system to design, because it is a matching problem on a moving graph with strict latency budgets.
---

# Design a rideshare service

*The hardest of the standard case studies, because matching is a live optimisation problem
over a spatial graph, not a lookup.*

## Requirements

**Functional**
- Riders request a ride with a pickup and dropoff location.
- Drivers are matched to nearby riders.
- Fare calculation, ETA for both parties, driver navigation, trip status.

**Non-functional**
- **Match within seconds** — a rider will abandon if the wait is long.
- Driver location updates arrive **every 4 seconds** from ~1M active drivers.
- Surge pricing, ETAs, and routing must all be near real time.
- Safety: every trip is monitored, and there is an SOS path.

**Estimates**

```
1M drivers × 1 update / 4s = 250,000 location writes/second
Rides: ~1M/day in a mid-sized city; a large city might see 10M/day ≈ 115/s average,
       ~2,300/s peak
```

**250k writes/s of location data is the dominant load.** Everything else is secondary.

## The three hard parts

1. **Location ingestion** — 250k writes/s, only the latest value matters.
2. **Matching** — find a nearby driver fast, and do not send two drivers to one rider.
3. **Routing** — ETA and fare need a real road-network routing service.

## High-level design

```
Driver app ──▶ Location Service ──▶ Redis geo (GEOADD / GEOSEARCH)
                                          │
Rider app ──▶ Ride Request Service ───────┤
                    │                     │
                    ▼                     ▼
             Matching Service ◄────── Driver Pool
                    │
                    ├──▶ Pricing Service (surge, fare)
                    ├──▶ Routing Service (ETA, route) → Map provider
                    └──▶ Trip Service (status) → Notification service
```

## Location service

**Use a geo-capable store.** Redis has built-in geospatial indexes:

```
GEOADD drivers geo:drivers lng lat driverId
GEOSEARCH drivers FROMLONLAT lng lat BYRADIUS 5 km WITHDIST ASC COUNT 10
```

Redis geospatial commands are O(log N) and can find the nearest drivers in milliseconds.

**Only the latest location matters**, so never store a history of driver positions in the
primary path. Redis gives you that for free: a geo-set holds one entry per driver.

**To reduce write pressure:**
- Batch location updates (flush every 2 seconds instead of every 4).
- Only update if the driver has moved more than ~50 metres.
- Downsample: a stationary driver (at a restaurant) does not need 4-second updates.

**Historical traces** (for analytics, ETAs, surge heatmaps) go to a separate Kafka topic
and land in a time-series store — never to the hot path.

## Matching

### The naive approach

Find the nearest driver and assign. **This fails** because two riders can be matched to the
same driver at the same time.

### The correct approach: a distributed lock

```
1. GET candidate drivers (nearest 10 within 5 km)
2. For each candidate, in order of distance:
     a. Try to acquire a lock on the driver: SET driver:{id}:lock riderId NX PX 5000
     b. If acquired → check the rider is also unlocked (SET rider:{id}:lock ...)
     c. If both acquired → assign, release both after a TTL
3. If no candidate succeeds → expand the radius and retry
```

The `NX PX` (set-if-not-exists, with expiry) makes the lock safe against crashes — if the
process dies, the lock expires in 5 seconds.

**The double lock prevents the double-assignment race**, and the ordering (lock driver
first, then rider) prevents a deadlock.

### Optimisation: batch the search

Do one `GEOSEARCH` for the radius, then try to lock candidates **in a batch** using a Lua
script — acquire as many as possible atomically, then pick the closest.

```lua
-- KEYS = driver ids, ARGV = rider id, now
for i = 1, #KEYS do
  if redis.call('SET', KEYS[i], ARGV[1], 'NX', 'PX', 5000) then
    return i                       -- first successfully locked driver wins
  end
end
return -1
```

Lua scripts run atomically in Redis, so this removes the per-driver round trip.

### Fairness and load balancing

Pure nearest-driver matching always drains the closest drivers first and leaves the
peripheral ones idle. Add a small random or load-based factor to the distance, so demand
spreads across the available drivers.

## Pricing and surge

**Fare = base + distance × rate + time × rate + surge multiplier.**

Surge is driven by **supply/demand imbalance in a spatial grid**:

1. Partition the city into hexagons (~1 km²).
2. Count available drivers and open requests per hexagon, refreshed every minute.
3. `surge = f(requests / max(available_drivers, 1))`, capped at some maximum.

**Expected wait time** is a better driver of surge than raw supply/demand, because
demand depends on how long the trip takes, not just on how many drivers are nearby.

**When surge changes**, existing trips keep their quoted price. Only new quotes use the
new multiplier — otherwise the price changes under the rider.

## Routing and ETA

Routing is a separate, specialised service (Google Maps, Mapbox, OSRM). Do not build it.

For the ETA, the options are:

| Approach | Accuracy | Cost |
|---|---|---|
| Call the routing provider per request | High | High — expensive and slow |
| Precompute a road-network distance matrix per grid cell | Medium | Medium — refreshes periodically |
| Straight-line distance × a road-winding factor | Low | Free |

The standard approach is a **precomputed distance matrix** for nearby cell pairs, with the
real routing provider used only for the final, user-visible route.

## Data model

```sql
CREATE TABLE trips (
  id            UUID PRIMARY KEY,
  rider_id      BIGINT NOT NULL,
  driver_id     BIGINT,
  status        TEXT NOT NULL,     -- REQUESTED, MATCHED, DRIVER_ARRIVED, ONGOING, COMPLETED, CANCELLED
  pickup_lat    DOUBLE PRECISION,
  pickup_lng    DOUBLE PRECISION,
  dropoff_lat   DOUBLE PRECISION,
  dropoff_lng   DOUBLE PRECISION,
  fare_cents    INTEGER,
  surge         NUMERIC(3,2),
  requested_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  matched_at    TIMESTAMPTZ,
  completed_at  TIMESTAMPTZ
);
CREATE INDEX idx_trips_rider ON trips (rider_id, requested_at DESC);
CREATE INDEX idx_trips_driver ON trips (driver_id, requested_at DESC);
```

## Trip state machine

```
REQUESTED ──▶ MATCHED ──▶ DRIVER_ARRIVED ──▶ ONGOING ──▶ COMPLETED
     │            │             │              │
     └────────────┴─────────────┴──────────────┴──▶ CANCELLED
```

Make it an explicit state machine with legal transitions, because rideshare is full of
edge cases: the driver cancels, the rider cancels, the driver never arrives, the app
crashes mid-trip.

**Timeouts are essential.** A `MATCHED` trip where the driver never arrives must time out
and re-match. Handle every state transition as idempotent, driven by events.

## Safety and SOS

A dedicated path, not an afterthought:

- Every trip has a recording capability, disabled by default, enabled automatically by
  the SOS button.
- Location sharing with a trusted contact during a trip.
- Anomaly detection — a long detour, a route that stops, or a very long trip triggers a
  automatic check-in.
- A separate, highly-available service so it does not share failure domains with the
  matching service.

## Failure modes

| Failure | Mitigation |
|---|---|
| Location service down | Riders see "driver location temporarily unavailable"; matching pauses, queue requests |
| The geo index is stale | Increase the search radius; accept a slightly worse match |
| Two drivers matched to one rider | The double lock prevents it |
| Matching service overloaded | Queue the requests and match in batches — a 3-second delay is better than a failed request |
| Map provider down | Fall back to the straight-line estimate; show an approximate ETA |
| A driver app crashes mid-trip | The trip times out and is reassigned; the fare is computed from the recorded trace |

## Monitoring

- **Time to match** — the single most important metric. Track p50, p95, p99.
- Requests waiting per grid cell (drives surge).
- Drivers idle per grid cell.
- Cancellation rate by reason.
- Trip fare vs. the model's estimate (pricing accuracy).
- Location ingestion lag.

## Follow-ups to expect

- **"How do you scale this to 10× cities?"** → each city is an independent deployment
  with its own geo index. The matching algorithm does not change; only the cell sizes and
  the partition boundaries do.
- **"How do you handle surge pricing disputes?"** → the multiplier is logged with the
  quote, and the rider sees it before confirming.
- **"What if a driver rejects?"** → release the locks, put the rider back in the matching
  queue, and exclude that driver for that request.
- **"How do you compute the fare?"** → a polyline of the actual route (from the driver's
  location trace), priced by distance and duration. Use the trace, not the straight line.
- **"How do you test the matching logic?"** → simulate against a replayed dataset of
  driver locations and requests, and assert invariants: no driver is double-booked, every
  match respects the radius, and the time-to-match distribution is stable.

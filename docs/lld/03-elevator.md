---
title: LLD — Elevator system
order: 3
summary: Designing elevators as a state machine — the request queue, the scheduling algorithm, and the observer pattern that keeps the display in sync.
---

# LLD — Elevator system

## Requirements

- Multiple elevators in a building, multiple floors.
- A passenger requests an elevator from floor A to floor B.
- The system picks the best elevator and dispatches it.
- The car display and the lobby indicator update in real time.
- Support for different dispatch strategies.

## Core design

```
ElevatorSystem
 ├── elevators: List<Elevator>
 └── strategy: DispatchStrategy

Elevator
 ├── id, currentFloor, direction (UP/DOWN/IDLE)
 ├── state: MOVING | IDLE | DOORS_OPEN | DOORS_CLOSED
 ├── passengers: Deque<Passenger>
 └── requests: Deque<Request>

Request
 ├── sourceFloor, destinationFloor, direction, id

Passenger
 ├── request, pickupFloor, destinationFloor
```

## The dispatch strategy

This is the heart of the design. Implement it as a **strategy interface** so the algorithm
can be swapped:

```java
public interface DispatchStrategy {
    Optional<Elevator> select(List<Elevator> elevators, Request request);
}
```

**Strategies to implement:**

| Strategy | Rule |
|---|---|
| **Nearest** | The closest idle elevator |
| **Direction-aware** | Prefer an elevator already moving in the requested direction |
| **Load-balancing** | Prefer the least loaded |
| **Zone** | Assign fixed elevators to fixed floor zones |
| **First-come-first-served** | FIFO queue |

**The direction-aware strategy** is the one worth writing carefully, because it is what
real systems use:

```java
public Optional<Elevator> select(List<Elevator> elevators, Request request) {
    // 1. an idle elevator
    Optional<Elevator> idle = elevators.stream()
            .filter(e -> e.getState() == State.IDLE)
            .min(Comparator.comparingInt(e -> Math.abs(e.getCurrentFloor() - request.getSourceFloor())));
    if (idle.isPresent()) return idle;

    // 2. an elevator already heading in the right direction
    Optional<Elevator> sameDirection = elevators.stream()
            .filter(e -> e.getDirection() == request.getDirection())
            .filter(e -> willPass(e, request.getSourceFloor()))
            .min(Comparator.comparingInt(Elevator::getCurrentFloor));
    if (sameDirection.isPresent()) return sameDirection;

    // 3. fall back to the closest, regardless of direction
    return elevators.stream()
            .min(Comparator.comparingInt(e -> Math.abs(e.getCurrentFloor() - request.getSourceFloor())));
}
```

## The state machine

```
        ┌──────────┐  doors open   ┌──────────────┐
        │  IDLE    │──────────────▶│ DOORS_OPEN   │
        │          │◀──────────────│              │
        └────┬─────┘  doors close  └──────────────┘
             │ start moving
             ▼
        ┌──────────┐  arrived      ┌──────────────┐
        │ MOVING   │──────────────▶│ DOORS_OPEN   │
        └──────────┘               └──────────────┘
```

**Implement the transitions explicitly** and reject invalid ones. An elevator that is
`MOVING` cannot be told to open its doors mid-floor.

```java
public boolean transitionTo(State next) {
    if (!canTransition(this.state, next)) {
        return false;
    }
    this.state = next;
    notifyObservers();      // update the displays
    return true;
}
```

## The request lifecycle

```
Passenger presses a button at floor 5
  → a Request is created and pushed to the elevator system's request queue
  → the strategy picks an elevator
  → the request is added to that elevator's request queue
  → the elevator's state machine drives it:
       move to source floor → open doors → passenger boards → close doors
       → move to destination → open doors → passenger leaves
```

**Inside the elevator**, the passenger presses a floor button. The request queue inside
the car is a **SCAN algorithm** queue:

- Going **up**: serve the requests in ascending floor order.
- Going **down**: descending order.
- When the direction reverses, reverse the order.

```java
public void request(int floor) {
    if (direction == Direction.UP) {
        // insert before the first request above this floor
    } else {
        // insert before the first request below this floor
    }
}
```

**A naive implementation just sorts the queue on every request** — O(n log n) per
request. The SCAN approach inserts in O(n) but keeps the queue always sorted, which is
what makes the elevator feel efficient. Either is acceptable in an interview; the SCAN
version is more impressive.

## The observer pattern for displays

The car display, the lobby indicator and the app should all update when the elevator's
state changes.

```java
public interface ElevatorObserver {
    void onStateChanged(Elevator elevator);
}
```

The elevator holds a list of observers and notifies them on every transition. This
decouples the elevator from the display hardware and lets you add an app display later
without touching the elevator.

## Concurrency

- Each elevator runs on its own thread, or the system ticks all elevators on a scheduler.
- The request queue and the assignment of a request to an elevator must be atomic — use a
  lock or a `ConcurrentLinkedQueue` plus careful ordering.
- **Never let two passengers be assigned to the same elevator slot**, and never let an
  elevator serve two requests for the same floor simultaneously.

## Common mistakes

- ❌ Not modelling the elevator as a state machine, so it can be told to open doors while
  moving.
- ❌ Hard-coding the dispatch algorithm inside `ElevatorSystem` instead of using a
  strategy.
- ❌ Forgetting to reverse the internal request queue when the direction changes.
- ❌ Not updating the display on every state change.
- ❌ Ignoring the case where no elevator can serve the request (all busy) — the request
  must wait, not be dropped.

## Extensions to be ready for

| Extension | Design |
|---|---|
| Multiple buildings | A `Building` entity; the system dispatches within a building first |
| Access control | A card reader per floor; the elevator checks authorisation before moving |
| Fire mode | A mode that overrides everything and sends all cars to the ground floor |
| Energy saving | Park idle cars near the lobby at off-peak times |
| Freight elevators | A separate pool with different capacity and scheduling |
| Waiting passengers | Track the number of people waiting per floor for display purposes |

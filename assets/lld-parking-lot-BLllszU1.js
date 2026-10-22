var e=`lld:parking-lot`,t=`
# LLD — Parking lot

## Requirements

- A parking lot with **multiple floors**, each with rows and spots.
- Spot sizes differ: motorcycles, cars, and trucks.
- A vehicle is assigned the **nearest available spot** of the right size.
- Tickets are issued on entry and settled on exit.
- Pricing is per hour, with the first hour often free.
- Availability must be queryable in real time.

## Core design

\`\`\`
ParkingLot
 ├── floors: List<ParkingFloor>
 └── ticketToSpot: Map<Ticket, ParkingSpot>

ParkingFloor
 ├── level: int
 └── rows: List<ParkingRow>

ParkingRow
 └── spots: List<ParkingSpot>

ParkingSpot
 ├── id, row, level
 ├── size: MOTORCYCLE | CAR | TRUCK
 ├── isFree: boolean
 └── vehicle: Vehicle (nullable)

Vehicle
 ├── plateNumber, type

Ticket
 ├── id, vehicle, entryTime, spot
\`\`\`

## Spot assignment

The interesting algorithmic part.

**Rule:** a truck may only park in a truck spot; a car may park in a car or truck spot; a
motorcycle may park in any spot. This is a "sized" allocation problem.

**Simplest correct approach:** scan the floors in order and, within a floor, scan the rows
and spots in order, taking the first free spot that is big enough.

\`\`\`java
public Optional<ParkingSpot> findSpot(VehicleType type) {
    for (ParkingFloor floor : floors) {
        for (ParkingRow row : floor.getRows()) {
            for (ParkingSpot spot : row.getSpots()) {
                if (spot.isFree() && spot.canFit(type)) {
                    return Optional.of(spot);
                }
            }
        }
    }
    return Optional.empty();
}
\`\`\`

**Better:** maintain a free-spot index per vehicle type.

\`\`\`java
Map<VehicleType, Deque<ParkingSpot>> freeSpotsByType;
\`\`\`

On entry, pop the deque for the vehicle's type — O(1). On exit, push the spot back.
For a truck, the deque must exclude spots already taken by cars and motorcycles, so
**release a spot to every type it can serve** when it is freed:

\`\`\`java
void release(ParkingSpot spot) {
    for (VehicleType type : spot.getServedTypes()) {
        freeSpotsByType.get(type).add(spot);
    }
}
\`\`\`

**The "nearest" requirement.** If "nearest" means nearest to the entrance, keep the
deques ordered by distance from the entrance. A \`PriorityQueue\` ordered by distance gives
that, at O(log n) instead of O(1).

**Alternative: a free-spot bitmap per floor.** Each floor keeps a \`BitSet\` per vehicle
type; \`nextSetBit\` finds the first free spot of that size in O(1)-ish. Elegant, and worth
mentioning.

## Ticket lifecycle

\`\`\`
Vehicle arrives
  → findSpot(type)
  → if none: reject ("Parking full")
  → occupy the spot, create a Ticket, record entryTime

Vehicle leaves
  → find the ticket
  → compute the fee from entryTime and exitTime
  → free the spot, close the ticket
\`\`\`

**The ticket is the source of truth for the fee.** Do not store the price on the vehicle or
the spot.

## Pricing

\`\`\`java
BigDecimal computeFee(Ticket ticket, LocalDateTime exitTime) {
    Duration duration = Duration.between(ticket.getEntryTime(), exitTime);
    long hours = Math.max(1, (duration.toMinutes() + 59) / 60);   // round up

    BigDecimal rate = switch (vehicleType) {
        case MOTORCYCLE -> new BigDecimal("1.50");
        case CAR        -> new BigDecimal("3.00");
        case TRUCK      -> new BigDecimal("5.00");
    };

    if (hours <= 1) {
        return BigDecimal.ZERO;         // first hour free
    }
    return rate.multiply(BigDecimal.valueOf(hours - 1));
}
\`\`\`

**Use \`BigDecimal\` for money**, never \`double\`. \`0.1 + 0.2 != 0.3\` is a bug that will
show up in production.

**Round up to the next hour** — parking lots bill in whole hours.

**Overnight and multi-day parking** need a daily maximum rate, and a grace period. Mention
these; the interviewer usually has one in mind.

## Concurrency

Two vehicles arriving at once must not get the same spot.

- Make \`findSpot\` + \`occupy\` **atomic**. A \`synchronized\` method on \`ParkingLot\` is
  enough for a single instance; for a distributed lot, use a database row lock or a
  distributed lock on the spot.
- The free-spot deques must be updated under the same lock as the spot itself, or they
  will drift out of sync. **Keep one source of truth** — ideally the spot's \`isFree\`
  flag — and treat the deques as an index that can be rebuilt.

## Extensions to be ready for

| Extension | Design |
|---|---|
| EV charging spots | A \`charger\` flag on the spot; a reservation queue per charger |
| Valet parking | A \`VALET\` ticket type; the spot is not assigned until the car is returned |
| Monthly passes | A subscription entity; the spot is not time-billed |
| Multiple entrances/exits | A \`gate\` on each spot; the nearest spot is computed per gate |
| Payment integration | A \`Payment\` strategy interface; the ticket references the payment |
| Reporting occupancy | Maintain a counter per floor updated on occupy/release |

## Common mistakes

- ❌ Not making the whole find-and-occupy operation atomic.
- ❌ Using \`double\` for money.
- ❌ Losing the entry time, so the fee cannot be computed.
- ❌ Not handling "parking full" — returning \`null\` without a message.
- ❌ Forgetting that a truck spot released by a car must go back into the car and
  motorcycle free-lists too.
- ❌ Assuming the lot has one floor.
`,n={id:e,body:t};export{t as body,n as default,e as id};
---
title: Java cheatsheet for DSA interviews
order: 5
summary: The Java standard library surface you actually need in a DSA interview, plus the language-level traps that cost candidates marks.
---

# Java cheatsheet for DSA interviews

## Collections at a glance

| Type | Backed by | `get(i)` | `contains` | `insert` | Use when |
|---|---|---|---|---|---|
| `ArrayList` | array | **O(1)** | O(n) | O(n) amortised | Default choice; random access |
| `LinkedList` | linked list | O(n) | O(n) | O(1) at the head | Rarely — usually `ArrayDeque` is better |
| `HashSet` / `HashMap` | hash table | — | O(1) avg | O(1) avg | Lookups, dedup, counting |
| `TreeSet` / `TreeMap` | red-black tree | — | O(log n) | O(log n) | Ordered traversal, `floorKey`, `ceilingKey` |
| `ArrayDeque` | circular array | — | O(n) | O(1) | Queues, stacks, monotonic deque |
| `PriorityQueue` | binary heap | — | O(n) | O(log n) | Top-K, multi-source BFS, Dijkstra |

> **In an interview, say which one you are choosing and why.** "I'll use a `HashMap` because
> I need constant-time lookup by value" is worth more than the code itself.

### Declaring the right interface

```java
Deque<Integer> stack = new ArrayDeque<>();   // NOT Vector/Stack
Deque<Integer> queue = new ArrayDeque<>();
Map<String, Integer> counts = new HashMap<>();
Set<Integer> seen = new HashSet<>();
```

Use `ArrayDeque` for stacks and queues — it is faster than `LinkedList` and has no
`null` restriction headaches you do not need.

## Sorting

```java
Arrays.sort(array);                              // int[] / Integer[] / any Object[]
Arrays.sort(array, Comparator.comparingInt(...));
Collections.sort(list, comparator);
list.sort(comparator);
```

**Sorting a `List<T>` with a custom comparator:**

```java
// By age ascending
people.sort(Comparator.comparingInt(Person::age));

// By age descending
people.sort(Comparator.comparingInt(Person::age).reversed());

// By last name, then first name
people.sort(Comparator.comparing(Person::lastName).thenComparing(Person::firstName));

// Multi-key with a manual lambda (the general form)
people.sort((a, b) -> {
    if (a.score != b.score) return Integer.compare(b.score, a.score); // descending
    return a.name.compareTo(b.name);
});
```

**The `Largest Number` comparator** — compare `a+b` against `b+a`:

```java
// Descending by concatenation
nums.sort((a, b) -> (b + a).compareTo(a + b));
```

Note the operand order: to sort **descending**, return `(b+a).compareTo(a+b)`.

**Avoid `Comparator.comparing` on a nullable key** — it throws NPE. Use
`Comparator.comparing(Person::age, Comparator.nullsFirst(Comparator.naturalOrder()))`.

## Hashing

```java
Map<Integer, Integer> map = new HashMap<>();
map.put(key, value);
int v = map.getOrDefault(key, 0);
boolean has = map.containsKey(key);
map.merge(key, 1, Integer::sum);        // counting idiom
map.computeIfAbsent(key, k -> new ArrayList<>()).add(item);  // group-by idiom
for (Map.Entry<K, V> e : map.entrySet()) { ... }
```

**Counting occurrences:**

```java
Map<String, Integer> freq = new HashMap<>();
for (String word : words) freq.merge(word, 1, Integer::sum);
```

**Grouping:**

```java
Map<Integer, List<String>> grouped = new HashMap<>();
for (String word : words) {
    grouped.computeIfAbsent(word.length(), k -> new ArrayList<>()).add(word);
}
```

**Detecting a duplicate with one pass:**

```java
Set<Integer> seen = new HashSet<>();
for (int x : nums) if (!seen.add(x)) return true;   // add() returns false if already present
```

## Strings and characters

```java
String s = "hello";
char c = s.charAt(0);
int len = s.length();
char[] chars = s.toCharArray();
String t = new String(chars);
String u = String.valueOf(chars);
boolean eq = s.equals(t);              // NOT == (that compares references)
String r = s.substring(1, 3);
String rev = new StringBuilder(s).reverse().toString();
String j = String.join(",", list);
String[] parts = s.split(",");
String joined = String.join("", parts);
```

**Character classification:**

```java
Character.isDigit(c)   Character.isLetter(c)   Character.isLetterOrDigit(c)
Character.isUpperCase(c) Character.isLowerCase(c) Character.isWhitespace(c)
Character.toLowerCase(c) Character.toUpperCase(c)
```

## Boxes and primitives

```java
int a = Integer.parseInt(s);
int b = Integer.valueOf(s);        // same thing, returns Integer
double d = Double.parseDouble(s);
long l = Long.parseLong(s);
String s2 = Integer.toString(a);
String s3 = String.valueOf(a);
Integer x = 127, y = 127;
System.out.println(x == y);        // true! (cached) — but do NOT rely on this
```

**Never use `==` to compare boxed values.** Use `.equals()`, or compare primitives with
`==`. A classic interview bug is `Integer` vs `int` in a `Map` key.

## Number safety

```java
long big = (long) a * b;            // cast BEFORE multiplying
Math.abs(Integer.MIN_VALUE);        // overflows! use long
Integer.MAX_VALUE + 1;              // overflows
```

- `Integer.MAX_VALUE` = 2³¹ − 1, `Integer.MIN_VALUE` = −2³¹.
- When a product of two ints can exceed 2³¹, cast one operand to `long` **first**.
- In Java 17+, `Math.multiplyExact(a, b)` throws on overflow — useful, rarely needed.
- `Math.abs(Integer.MIN_VALUE)` returns `Integer.MIN_VALUE` (still negative). Use
  `Math.abs((long) x)` if the input can be that extreme.

## Bit manipulation

```java
x & 1              // lowest bit
x >> 1             // arithmetic shift right (sign-extending)
x >>> 1            // logical shift right (fills with 0)
x & (x - 1)        // clears the lowest set bit
x | (x + 1)        // sets the lowest zero bit
Integer.bitCount(x)   // number of set bits
Integer.highestOneBit(x)
Integer.reverse(x)
x ^ y              // XOR
```

**Common idioms:**

| Goal | Expression |
|---|---|
| Is it odd? | `(x & 1) != 0` |
| Is it a power of two? | `x > 0 && (x & (x - 1)) == 0` |
| Swap without a temp | `a ^= b; b ^= a; a ^= b;` |
| Set the lowest set bit | `x & -x` |
| Check if a bit is set | `(x & (1 << n)) != 0` |
| Divide by 2 | `x >> 1` (careful with negatives) |

## Arrays

```java
int[] a = new int[5];
Arrays.fill(a, -1);
int[] b = {1, 2, 3};
Arrays.sort(b);
int idx = Arrays.binarySearch(b, 3);
int[] c = Arrays.copyOf(b, 5);
boolean same = Arrays.equals(a, b);
int[] range = Arrays.copyOfRange(b, 1, 3);
```

**`char[]` vs `String`:** `new String(chars)` copies. `chars = s.toCharArray()` also copies.
If you need speed, work on the `char[]` directly and convert once at the end.

## Two-dimensional arrays

```java
int[][] grid = new int[rows][cols];
grid[r][c] = 1;
int rows = grid.length;
int cols = grid[0].length;      // assumes non-empty — guard it
```

For jagged arrays: `int[][] grid = new int[rows][];` then assign each row separately.

## Streams (use sparingly in interviews)

Streams are fine for post-processing, but a hot loop written as a stream is harder to
reason about and often slower.

```java
int sum = Arrays.stream(nums).sum();
int max = Arrays.stream(nums).max().getAsInt();
long count = Arrays.stream(nums).filter(x -> x > 0).count();
List<Integer> even = Arrays.stream(nums).filter(x -> x % 2 == 0).boxed().collect(Collectors.toList());
Map<Integer, List<Integer>> grouped =
    Arrays.stream(nums).collect(Collectors.groupingBy(x -> x % 2));
```

> For a DSA interview, a plain loop is usually the clearer choice. Use a stream when it
> genuinely shortens the code, and be ready to rewrite it as a loop if asked.

## `Optional`

```java
Optional<Integer> maybe = Optional.ofNullable(value);
int v = maybe.orElse(-1);
maybe.ifPresent(x -> System.out.println(x));
```

`Optional` is for return values, not fields or parameters.

## Exceptions

```java
try {
    int v = Integer.parseInt(s);
} catch (NumberFormatException e) {
    v = 0;
}
```

Prefer returning a sentinel value in DSA code over throwing — the interviewer wants to see
the algorithm, not the error handling.

## Records and `var` (Java 17)

```java
record Point(int x, int y) {}

// var infers the type — fine for a local with an obvious type
var result = new ArrayList<String>();
```

`var` is fine for locals. It is **not** allowed for fields, parameters, or return types.

## Lambdas and method references

```java
list.forEach(item -> System.out.println(item));
list.forEach(System.out::println);
Comparator.comparingInt(Person::age)
list.stream().map(String::toUpperCase)
```

Capturing a local variable in a lambda requires it to be **effectively final** — assign it
to a new variable first if you need to modify it.

## The `main` method

```java
public static void main(String[] args) throws Exception {
    FastScanner fs = new FastScanner(System.in);
    int n = fs.nextInt();
    System.out.println(answer);
}
```

- `throws Exception` is fine and saves noise. It does not affect the exit code.
- Use `System.out.println`, not `System.out.print` with manual `\n`.
- `System.exit(0)` at the end of `main` is unnecessary and can hide buffered output.

## Common mistakes that cost marks

| Mistake | Why it hurts | Instead |
|---|---|---|
| `Integer` compared with `==` | Cached values hide the bug until it fails | Use `.equals()` or primitives |
| `a * b` on two ints that can overflow | Silent wrong answers | Cast to `long` first |
| `arr[i]` with `arr.length` instead of `arr.length - 1` | Off-by-one | `i < arr.length` |
| Mutating an `ArrayList` inside its own `for` loop | `ConcurrentModificationException` | Use an index loop or `Iterator.remove()` |
| `HashMap` with a mutable key | Key never matches again | Use immutable keys |
| Forgetting `hashCode`/`equals` on a custom key | Lookup silently fails | Implement both, or use `record` |
| Recursion without a base case | Stack overflow | Always write the base case first |
| Modifying a list while iterating it with an enhanced for | `ConcurrentModificationException` | Copy first, or use an index loop |
| `String` comparison with `==` | Compares references | Use `.equals()` |
| Assuming the input is sorted | Wrong answer | Check, or state the assumption |

## Performance notes worth mentioning in an interview

- `ArrayList.get(i)` is O(1) because it is array-backed; `LinkedList.get(i)` is O(n).
- `HashMap` is O(1) amortised but has a worst case of O(n) under adversarial hash collisions.
  Java 8+ treeifies a bucket after 8 collisions, which bounds it at O(log n).
- `StringBuilder` is O(n) for the whole build; repeated `s += x` is O(n²) because each
  concatenation copies.
- `PriorityQueue` does not preserve insertion order — `peek()`/`poll()` give the extreme
  element only.
- `TreeMap` gives you `floorKey`/`ceilingKey`/`subMap` — the tools for "largest key ≤ x",
  which is often what a "premium" problem wants.

## What to memorise cold

If you can only drill three things, drill these:

1. Sorting with a custom comparator (including the `a+b` vs `b+a` form).
2. The four `HashMap` counting/grouping idioms (`merge`, `computeIfAbsent`,
   `getOrDefault`, `containsKey`).
3. The five bit-manipulation idioms in the table above.

var e=`topic:bitmanipulation`,t=`
# Bit manipulation — concept notes

## The mental model

A Java \`int\` is 32 bits; a \`long\` is 64. Bitwise operators work on each bit
independently.

| Operator | Name | Truth table (a, b) |
|---|---|---|
| \`a & b\` | AND | 1 only if both are 1 |
| \`a \\| b\` | OR | 1 if either is 1 |
| \`a ^ b\` | XOR | 1 if exactly one is 1 |
| \`~a\` | NOT | flips every bit |
| \`a << b\` | left shift | multiply by 2^b |
| \`a >> b\` | arithmetic right shift | divide by 2^b (keeps the sign) |
| \`a >>> b\` | logical right shift | divide by 2^b (fills with 0) |

**XOR is the workhorse.** Its properties:

\`\`\`
a ^ a = 0        a ^ 0 = a
a ^ b = b ^ a    (commutative)
(a ^ b) ^ b = a  (self-inverse)
\`\`\`

**"Everything XORed with itself cancels."** That single fact solves the "single number"
family.

---

## The core idioms

| Goal | Expression | Why |
|---|---|---|
| Check if odd | \`(x & 1) != 0\` | The lowest bit is the parity bit |
| Set the lowest set bit | \`x & -x\` | Two's complement: \`-x\` is \`~x + 1\` |
| Clear the lowest set bit | \`x & (x - 1)\` | Borrow clears the lowest 1 |
| Is it a power of two? | \`x > 0 && (x & (x - 1)) == 0\` | A power of two has exactly one set bit |
| Toggle the lowest bit | \`x ^ 1\` | |
| Right shift | \`x >>> 1\` | Logical, avoids sign extension |
| Count set bits | \`Integer.bitCount(x)\` | |
| Reverse the bits | \`Integer.reverse(x)\` | |
| Is the k-th bit set? | \`(x & (1 << k)) != 0\` | |
| Set the k-th bit | \`x \\| (1 << k)\` | |
| Clear the k-th bit | \`x & ~(1 << k)\` | |
| Swap without a temp | \`a ^= b; b ^= a; a ^= b;\` | |
| Absolute value | \`(x ^ (x >> 31)) - (x >> 31)\` | Careful: \`Math.abs\` overflows on \`MIN_VALUE\` |

**The \`x & (x - 1)\` trick is the most useful one.** It removes the lowest set bit. From
that you get: counting set bits (loop until zero), checking for a power of two, and
finding the number of trailing zeros.

\`\`\`java
int countSetBits(int x) {
    int count = 0;
    while (x != 0) {
        x &= (x - 1);      // clear the lowest set bit
        count++;
    }
    return count;
}
\`\`\`

**\`Integer.bitCount\` does this in one instruction.** Use it in production; understand the
loop.

---

## XOR: the single-number family

**Single Number (LC 136)** — every number appears twice except one:

\`\`\`java
public static int singleNumber(int[] nums) {
    int result = 0;
    for (int x : nums) result ^= x;
    return result;
}
\`\`\`

**The reasoning:** the duplicates cancel (\`a ^ a = 0\`), leaving only the odd one out.

**Single Number III (LC 260)** — two numbers appear once, everything else twice:

\`\`\`java
public static int[] singleNumber(int[] nums) {
    int xor = 0;
    for (int x : nums) xor ^= x;

    // the rightmost set bit of xor is where the two answers differ
    int diff = xor & (-xor);

    int a = 0, b = 0;
    for (int x : nums) {
        if ((x & diff) != 0) a ^= x;
        else b ^= x;
    }
    return new int[]{a, b};
}
\`\`\`

**The reasoning:** the XOR of the two odd numbers has a set bit exactly where they differ.
Partitioning by that bit puts each odd number in its own group, and each group XORs to a
single value.

**This is the shape of every "appears once, everything else twice" problem.** Learn it
once.

**XOR of All Elements (LC 1486)** — XOR of everything except \`nums[i]\`, in O(1) per
query:

\`\`\`java
int total = 0;
for (int x : nums) total ^= x;
// answer for index i:
int answer = total ^ nums[i];
\`\`\`

---

## Addition and subtraction without + and −

**Add Two Integers (LC 371):**

\`\`\`java
public static int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1;     // carries: both bits set
        a = a ^ b;                    // sum without carry
        b = carry;                    // repeat until no carry
    }
    return a;
}
\`\`\`

**The reasoning:** \`a ^ b\` gives the sum bits ignoring carries. \`a & b\` identifies the
positions that generate a carry. Shift left by one and add them in.

**The loop terminates** because carries always move left, so they eventually run off the
top.

**Subtraction:** \`a - b = a + (~b + 1)\`.

\`\`\`java
public static int subtract(int a, int b) {
    int borrow = 0;
    while (b != 0) {
        int partial = (~a & b) << 1;
        a = a ^ b;
        b = partial | borrow;      // this simplified form is fiddly
        borrow = 0;
    }
    return a;
}
\`\`\`

**Honest advice:** subtraction without minus is a party trick. It is fine to show it, but
in an interview just say "I could implement it with a borrow chain, but the addition
version is the same idea and far less error-prone" — and write the addition version.

---

## Divide two integers (LC 29)

**Binary long division with shifts and subtraction:**

\`\`\`java
public static int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) {
        throw new ArithmeticException("overflow");
    }
    long a = dividend, b = divisor;
    boolean negative = (a < 0) ^ (b < 0);
    a = Math.abs(a);
    b = Math.abs(b);

    long result = 0;
    while (a >= b) {
        long value = b;
        long multiple = 1;
        while (value * 2 <= a) {
            value *= 2;
            multiple *= 2;
        }
        a -= value;
        result += multiple;
    }
    return negative ? (int) -result : (int) result;
}
\`\`\`

**The idea:** repeatedly subtract the largest doubled divisor that fits, doubling the
multiple each time. That gives you the quotient in O(log n) steps.

**The \`Integer.MIN_VALUE / -1\` overflow must be handled** — it is the one case that
overflows a 32-bit int.

---

## Bit manipulation in other topics

**Counting Bits (LC 338)** — \`dp[i] = dp[i >> 1] + (i & 1)\`:

\`\`\`java
int[] dp = new int[n + 1];
for (int i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
}
\`\`\`

**The reasoning:** dropping the lowest bit gives \`i >> 1\`, whose count is already known.

**Reverse Bits (LC 190):**

\`\`\`java
public static int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;                      // logical shift — must be unsigned
    }
    return result;
}
\`\`\`

**\`>>>\` not \`>>\`** — with \`>>\`, a negative input would keep sign-extending.

**Gray Code (LC 89):** consecutive values differ by exactly one bit.

\`\`\`java
int[] result = new int[n];
for (int i = 0; i < n; i++) {
    result[i] = i ^ (i >> 1);
}
\`\`\`

**The property to notice:** the XOR of a number with its right shift gives the Gray code,
and consecutive Gray codes differ in one bit.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Using \`>>\` instead of \`>>>\` on a negative number | Sign extension corrupts the result |
| \`x & -x\` on \`Integer.MIN_VALUE\` | Overflow — it stays \`MIN_VALUE\` |
| \`Math.abs(Integer.MIN_VALUE)\` | Returns \`MIN_VALUE\`, still negative |
| \`(1 << 31)\` in Java | That is \`Integer.MIN_VALUE\`, not \`2³¹\` |
| Shifting by 32 or more | Java shifts modulo 32 — \`x << 32\` is \`x\` |
| Forgetting the \`x > 0\` check in the power-of-two test | \`0\` and negatives pass |
| Using \`^\` when you meant \`|\` | Bit-clearing vs bit-setting |
| Overflow in \`a + b\` for addition without carry | Use \`long\` intermediates if needed |

**Java's shift semantics are worth stating:** "Java shifts by \`n & 31\` for ints, so
shifting by 32 is a no-op rather than undefined behaviour."

---

## Complexity cheat sheet

| Operation | Time | Notes |
|---|---|---|
| AND / OR / XOR | O(1) | Word-sized |
| Shift | O(1) | |
| Popcount (\`bitCount\`) | O(1) | One instruction |
| Popcount (loop) | O(k) where k = set bits | |
| \`x & (x - 1)\` | O(1) | |
| Reverse bits | O(32) | Fixed word size |

**Bit tricks are all O(1) for fixed-width integers.** That is their appeal — but the
**readability cost is real**, so use them in an interview only when they are clearly the
intended solution.

---

## How to crack it in an interview

1. **Know the properties of XOR** — \`a ^ a = 0\`, \`a ^ 0 = a\`, commutative, self-inverse.
2. **Say which bit you are isolating and why.** "The rightmost set bit of the XOR tells me
   where the two odd numbers differ."
3. **Derive, do not recite.** For "power of two", explain that a power of two has exactly
   one set bit, and \`x & (x-1)\` clears the lowest set bit — so if the result is zero, \`x\`
   had exactly one.
4. **Use \`long\` for intermediate results** in addition and division.
5. **Say the assumption** — 32-bit ints, two's complement.
6. **Prefer the readable version** unless the bit trick is the point. "I could write this
   with a loop, but the bit trick is O(1) versus O(log n) — here is why it works."
`,n={id:e,body:t};export{t as body,n as default,e as id};
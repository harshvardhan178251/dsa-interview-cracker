var e=`topic:math`,t=`
# Math and number theory — concept notes

## The mental model

Math problems in DSA interviews are mostly about:

1. **Overflow** — the single biggest source of wrong answers.
2. **Modular arithmetic** — keeping a computation bounded.
3. **Number properties** — primes, factorials, digit manipulation.
4. **Clever loops** — the O(√n) trick for divisors.

---

## Overflow: the thing that will bite you

**Java's \`int\` is 32-bit signed: −2³¹ to 2³¹ − 1.**

| Value | Fits in int? |
|---|---|
| 32,000 | Yes |
| 2,000,000,000 | Yes (barely) |
| 2,147,483,647 | \`Integer.MAX_VALUE\` — the largest int |
| 2,147,483,648 | **No** — overflow |
| 3,000,000,000 | **No** |

**The rule: cast to \`long\` BEFORE the multiplication.**

\`\`\`java
// WRONG — overflows before the cast
long result = (long) (a * b);

// RIGHT — the cast applies to the operand
long result = (long) a * b;
\`\`\`

**This is the single most common bug in numeric interview problems**, and it passes
every test on small inputs. If the interviewer gives you \`n = 10⁵\` and values up to
\`10⁵\`, the product is \`10¹⁰\` — far beyond int.

**Also watch for:**

\`\`\`java
Math.abs(Integer.MIN_VALUE)      // returns MIN_VALUE — still negative!
Integer.MAX_VALUE + 1            // wraps to MIN_VALUE
\`\`\`

**Use \`long\` for any accumulation over many terms**, and say so in the interview:
"I'll use \`long\` for the accumulator because with n up to 10⁵ and values up to 10⁵, the
sum can reach 10¹⁰."

**Java 8+ has \`Math.multiplyExact\`, \`Math.addExact\` and \`Math.subtractExact\`**, which
throw \`ArithmeticException\` on overflow instead of wrapping. Useful when you want to
detect the problem rather than handle it.

---

## Modular arithmetic

**When the answer is huge, keep only the remainder.**

\`\`\`java
// Computing a^b mod m
public static long powerMod(long base, long exponent, long modulus) {
    long result = 1;
    base %= modulus;
    while (exponent > 0) {
        if ((exponent & 1) != 0) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;      // square
        exponent >>= 1;                      // halve
    }
    return result;
}
\`\`\`

**This is binary exponentiation** — O(log b) instead of O(b). It is the standard
follow-up to "compute a^b".

**The order matters:** reduce modulo \`m\` **after every multiplication**, or the
intermediate overflows.

**The overflow-safe version** needs \`long\` multiplication of two values each < m, so
\`m\` must be < 3×10⁹ (since \`m²\` must fit in a long). For larger moduli, use
\`Math.multiplyHigh\` / \`BigInteger\`, or the "Russian peasant" trick.

**Fermat's little theorem:** if \`m\` is prime and \`m ∤ a\`, then \`a^(m−1) ≡ 1 (mod m)\`.
So \`a^b mod m = a^(b mod (m−1)) mod m\`. This turns an enormous exponent into a small
one. It is the trick behind "compute n! mod p" for huge n.

---

## Prime numbers

**Trial division to √n:**

\`\`\`java
public static boolean isPrime(int n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; (long) i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}
\`\`\`

**Why √n:** if \`n = a × b\` is composite, then one of \`a\` or \`b\` is ≤ √n. So you only
need to test up to √n.

**\`(long) i * i <= n\`** — the cast prevents overflow when \`i\` gets large.

**The 6k ± 1 optimisation:** beyond 2 and 3, every prime is of the form \`6k ± 1\`. So
test 5, 7, 11, 13, 17, 19, … — skip multiples of 2 and 3.

### The sieve of Eratosthenes

\`\`\`java
public static int countPrimes(int n) {
    if (n < 3) return 0;
    boolean[] composite = new boolean[n];
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (!composite[i]) {
            count++;
            for (long j = (long) i * i; j < n; j += i) {
                composite[(int) j] = true;
            }
        }
    }
    return count;
}
\`\`\`

**The key optimisation: start marking at \`i * i\`, not at \`i\`.** Multiples of \`i\` below
\`i²\` have already been marked by smaller primes.

**The \`long\` cast** prevents overflow when \`i * i\` exceeds \`int\` range.

**Time:** O(n log log n). **Space:** O(n).

**The linear sieve (Euler's)** is O(n) — it marks each composite exactly once by using
the smallest prime factor. More complex; mention it as an optimisation.

---

## Factorial trailing zeroes

**Count the factors of 5** (there are always more 2s than 5s):

\`\`\`java
public static int trailingZeroes(int n) {
    int count = 0;
    while (n > 0) {
        n /= 5;
        count += n;
    }
    return count;
}
\`\`\`

**The reasoning:** the number of trailing zeroes is the number of times the factorial is
divisible by 10, which is the number of factors of 5. Multiples of 5 contribute one,
multiples of 25 contribute another, multiples of 125 another, and so on. The loop adds
\`n/5 + n/25 + n/125 + ...\` by repeatedly dividing.

**Why 5 and not 2:** in \`n!\` there are always at least as many factors of 2 as of 5, so 5
is the limiting factor.

---

## Digit manipulation

**Happy Number (LC 202)** — repeatedly sum the squares of the digits until you reach 1
or a cycle.

\`\`\`java
public static boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();
    while (n != 1 && seen.add(n)) {
        n = squareSum(n);
    }
    return n == 1;
}
\`\`\`

**Why a set works:** the sequence either reaches 1 or enters a cycle, and because all
values are bounded by a few hundred, the set stays small.

**A cycle is guaranteed** — the values eventually repeat, so the loop terminates.

**The Floyd cycle-detection variant** uses O(1) space, but the set is clearer.

**Reverse an integer (LC 7)** — watch the overflow on \`Integer.MIN_VALUE\`:

\`\`\`java
public static int reverse(int x) {
    long result = 0;
    while (x != 0) {
        result = result * 10 + x % 10;
        x /= 10;
    }
    if (result > Integer.MAX_VALUE) return Integer.MAX_VALUE;
    if (result < Integer.MIN_VALUE) return Integer.MIN_VALUE;
    return (int) result;
}
\`\`\`

**Using \`long\` for the accumulator** avoids the intermediate overflow that the naive
\`int\` version hits on \`-2147483648\`.

**Palindrome number (LC 9)** — reverse half of the number:

\`\`\`java
public static boolean isPalindrome(int x) {
    if (x < 0 || (x != 0 && x % 10 == 0)) return false;
    int reverted = 0;
    while (x > reverted) {
        reverted = reverted * 10 + x % 10;
        x /= 10;
    }
    return x == reverted || x == reverted / 10;
}
\`\`\`

**The \`x == reverted / 10\` handles the odd-length case** — the middle digit is not
mirrored.

**The early return for trailing zeros** (\`x % 10 == 0\`) avoids the overflow in
\`reverted * 10\` for numbers like \`1534236469\`.

---

## Other classics

**Ugly Number (LC 313)** — the nth number whose prime factors are only 2, 3 and 5.

\`\`\`java
public static int nthUglyNumber(int n) {
    long[] ugly = new long[n];
    ugly[0] = 1;
    int i2 = 0, i3 = 0, i5 = 0;
    for (int i = 1; i < n; i++) {
        ugly[i] = Math.min(ugly[i2] * 2, Math.min(ugly[i3] * 3, ugly[i5] * 5));
        if (ugly[i] == ugly[i2] * 2) i2++;
        if (ugly[i] == ugly[i3] * 3) i3++;
        if (ugly[i] == ugly[i5] * 5) i5++;
    }
    return (int) ugly[n - 1];
}
\`\`\`

**The three-pointer merge** — exactly like merging three sorted lists. Note the
**three separate \`if\`s, not \`else if\`** — a value can be produced by more than one
factor (6 = 2×3), and all the matching pointers must advance.

**GCD and LCM:**

\`\`\`java
public static long gcd(long a, long b) {
    while (b != 0) {
        long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

public static long lcm(long a, long b) {
    return a / gcd(a, b) * b;
}
\`\`\`

**The division comes first in the LCM** — \`a * b / gcd\` can overflow.

**The Euclidean algorithm is O(log min(a,b))** — the number of steps is proportional to
the number of digits in the smaller number.

---

## Common traps

| Trap | Why it bites |
|---|---|
| \`int\` overflow in a product | Cast to \`long\` **before** multiplying |
| \`int\` overflow in a sum | Use a \`long\` accumulator |
| \`Math.abs(Integer.MIN_VALUE)\` | Stays negative |
| \`1 << 31\` | That is \`Integer.MIN_VALUE\` |
| Trial division with \`i * i\` as an int | Overflows for large \`i\` — cast to \`long\` |
| The sieve starting at \`i\` instead of \`i * i\` | Much slower, though still correct |
| Multiple \`else if\`s in the ugly-number merge | Misses values like 6 |
| The LCM computing \`a * b\` first | Overflow — divide first |
| Not handling \`n < 0\` or \`n = 0\` in the prime check | Wrong answers |
| Reversing \`Integer.MIN_VALUE\` with an \`int\` accumulator | Overflow — use \`long\` |

---

## Complexity cheat sheet

| Problem | Time | Space |
|---|---|---|
| Trial-division primality | O(√n) | O(1) |
| Sieve of Eratosthenes | O(n log log n) | O(n) |
| Linear sieve | O(n) | O(n) |
| GCD (Euclidean) | O(log min(a,b)) | O(1) |
| Binary exponentiation | O(log b) | O(1) |
| Happy number | O(log n) steps | O(1) |
| Digit reversal | O(log n) | O(1) |

---

## How to crack it in an interview

1. **Ask about the range.** "Are the values up to 10⁵ or 10⁹?" That decides between
   trial division and a sieve.
2. **Say whether you are using \`int\` or \`long\`, and why.** "I'll use a \`long\` accumulator
   because the sum can reach 10¹⁰."
3. **State the mathematical property you are using** — "the number of trailing zeroes is
   the number of factors of 5 in n!", or "if n is composite, one factor is at most √n".
4. **For modulo problems, reduce after every operation.**
5. **Mention the optimisation** — the 6k ± 1 wheel for primality, the √n bound for
   trial division, the three-pointer merge for ugly numbers.
6. **Handle the edge cases explicitly:** 0, 1, negatives, and \`Integer.MIN_VALUE\`.
`,n={id:e,body:t};export{t as body,n as default,e as id};
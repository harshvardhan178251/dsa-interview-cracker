package com.dsa.utils;

/**
 * Simple immutable pair, handy for problems that return two values.
 *
 * @param <A> first component type
 * @param <B> second component type
 */
public class Pair<A, B> {

    public final A first;
    public final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public static <A, B> Pair<A, B> of(A first, B second) {
        return new Pair<>(first, second);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pair)) {
            return false;
        }
        Pair<?, ?> other = (Pair<?, ?>) o;
        return java.util.Objects.equals(first, other.first)
                && java.util.Objects.equals(second, other.second);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(first, second);
    }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

package com.dsa.utils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Array-backed binary min-heap.
 *
 * <p>Used by the priority-queue problems (top-K, streaming median, merge-K) so the
 * heap mechanics stay visible instead of being hidden behind {@code PriorityQueue}.
 *
 * @param <T> element type
 */
public class MinHeap<T> {

    protected final List<T> heap;
    protected final Comparator<? super T> comparator;

    /** Natural ordering. */
    @SuppressWarnings("unchecked")
    public MinHeap() {
        this.comparator = (a, b) -> ((Comparable<Object>) a).compareTo(b);
        this.heap = new ArrayList<>();
    }

    public MinHeap(Comparator<? super T> comparator) {
        this.comparator = comparator;
        this.heap = new ArrayList<>();
    }

    /**
     * Natural comparison helper, usable from subclasses that need the reverse order.
     */
    @SuppressWarnings("unchecked")
    protected static <T> int compareNatural(T a, T b) {
        return ((Comparable<Object>) a).compareTo(b);
    }

    /** Builds a heap from an existing collection in O(n). */
    public MinHeap(List<T> items, Comparator<? super T> comparator) {
        this.comparator = comparator;
        this.heap = new ArrayList<>(items);
        for (int i = heap.size() / 2 - 1; i >= 0; i--) {
            siftDown(i);
        }
    }

    public void add(T item) {
        heap.add(item);
        siftUp(heap.size() - 1);
    }

    /** Smallest element without removing it. */
    public T peek() {
        return heap.get(0);
    }

    /** Removes and returns the smallest element. */
    public T poll() {
        T top = heap.get(0);
        int last = heap.size() - 1;
        heap.set(0, heap.get(last));
        heap.remove(last);
        if (!heap.isEmpty()) {
            siftDown(0);
        }
        return top;
    }

    public int size() {
        return heap.size();
    }

    public boolean isEmpty() {
        return heap.isEmpty();
    }

    /** Snapshot of the backing array (not a heap-ordered view). */
    public List<T> asList() {
        return new ArrayList<>(heap);
    }

    protected void siftUp(int index) {
        T item = heap.get(index);
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (comparator.compare(item, heap.get(parent)) >= 0) {
                break;
            }
            heap.set(index, heap.get(parent));
            index = parent;
        }
        heap.set(index, item);
    }

    protected void siftDown(int index) {
        int size = heap.size();
        T item = heap.get(index);
        while (true) {
            int left = 2 * index + 1;
            if (left >= size) {
                break;
            }
            int smaller = left;
            int right = left + 1;
            if (right < size && comparator.compare(heap.get(right), heap.get(left)) < 0) {
                smaller = right;
            }
            if (comparator.compare(item, heap.get(smaller)) <= 0) {
                break;
            }
            heap.set(index, heap.get(smaller));
            index = smaller;
        }
        heap.set(index, item);
    }
}

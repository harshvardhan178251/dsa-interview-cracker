package com.dsa.concurrency;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BoundedBlockingQueueTest {

    @Test
    void putsAndTakesInFifoOrder() throws Exception {
        BoundedBlockingQueue queue = new BoundedBlockingQueue(3);
        queue.put(1);
        queue.put(2);
        assertEquals(1, queue.take());
        assertEquals(2, queue.take());
        assertEquals(0, queue.size());
    }

    @Test
    void offerFailsWhenTheQueueIsFull() {
        BoundedBlockingQueue queue = new BoundedBlockingQueue(2);
        assertTrue(queue.offer(1));
        assertTrue(queue.offer(2));
        assertFalse(queue.offer(3));
        assertEquals(2, queue.size());
    }

    @Test
    void pollReturnsMinusOneWhenTheQueueIsEmpty() {
        BoundedBlockingQueue queue = new BoundedBlockingQueue(2);
        assertEquals(-1, queue.poll());
        assertEquals(0, queue.size());
    }

    @Test
    void takeBlocksUntilAnItemArrives() throws Exception {
        BoundedBlockingQueue queue = new BoundedBlockingQueue(2);
        CountDownLatch taken = new CountDownLatch(1);
        Thread consumer = new Thread(() -> {
            try {
                queue.take();
                taken.countDown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        consumer.start();
        assertFalse(taken.await(200, TimeUnit.MILLISECONDS), "the consumer must block");
        queue.put(42);
        assertTrue(taken.await(2, TimeUnit.SECONDS), "the consumer must be woken up");
        consumer.join();
    }

    @Test
    void putBlocksUntilThereIsRoomAgain() throws Exception {
        BoundedBlockingQueue queue = new BoundedBlockingQueue(1);
        queue.put(1);
        CountDownLatch produced = new CountDownLatch(1);
        Thread producer = new Thread(() -> {
            try {
                queue.put(2);
                produced.countDown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        producer.start();
        assertFalse(produced.await(200, TimeUnit.MILLISECONDS), "the producer must block");
        assertEquals(1, queue.take());
        assertTrue(produced.await(2, TimeUnit.SECONDS), "the producer must be woken up");
        producer.join();
        assertEquals(2, queue.take());
    }

    @Test
    void showsTheQueueContents() {
        BoundedBlockingQueue queue = new BoundedBlockingQueue(3);
        queue.offer(1);
        queue.offer(2);
        assertEquals(List.of(1, 2), queue.contents());
    }
}

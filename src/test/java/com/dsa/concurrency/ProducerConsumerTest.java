package com.dsa.concurrency;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProducerConsumerTest {

    @Test
    void consumesEveryItemExactlyOnce() throws Exception {
        List<Integer> items = ProducerConsumer.run(2, 5, 3);
        Collections.sort(items);
        assertEquals(List.of(1, 2, 3, 4, 5), items);
    }

    @Test
    void worksWithASingleConsumer() throws Exception {
        List<Integer> items = ProducerConsumer.run(4, 3, 1);
        Collections.sort(items);
        assertEquals(List.of(1, 2, 3), items);
    }

    @Test
    void worksWithACapacityOfOne() throws Exception {
        List<Integer> items = ProducerConsumer.run(1, 10, 4);
        Collections.sort(items);
        assertEquals(10, items.size());
        for (int i = 0; i < 10; i++) {
            assertEquals(i + 1, items.get(i));
        }
    }

    @Test
    void producesNothingWhenThereAreNoItems() throws Exception {
        List<Integer> items = ProducerConsumer.run(2, 0, 2);
        assertTrue(items.isEmpty());
    }

    @Test
    void theBufferNeverExceedsItsCapacity() throws Exception {
        ProducerConsumer pc = new ProducerConsumer(2);
        Thread producer = new Thread(() -> {
            try {
                pc.produce(6, 1);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        producer.start();
        List<Integer> taken = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            taken.add(pc.consume());
            assertTrue(pc.bufferContents().size() <= 2);
        }
        producer.join();
        Collections.sort(taken);
        assertEquals(List.of(1, 2, 3, 4, 5, 6), taken);
    }

    @Test
    void thePoisonPillEndsTheProduction() throws Exception {
        ProducerConsumer pc = new ProducerConsumer(2);
        pc.produce(1, 1);
        assertEquals(1, pc.consume());
        assertEquals(ProducerConsumer.POISON, pc.consume());
    }

    @Test
    void manyItemsAreSpreadOverTheConsumers() throws Exception {
        List<Integer> items = ProducerConsumer.run(8, 200, 4);
        assertEquals(200, items.size());
        assertEquals(200, new java.util.HashSet<>(items).size());
    }
}

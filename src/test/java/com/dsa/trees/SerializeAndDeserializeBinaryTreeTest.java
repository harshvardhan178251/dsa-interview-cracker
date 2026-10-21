package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class SerializeAndDeserializeBinaryTreeTest {

    @Test
    void serialisesTheSampleTree() {
        assertEquals("1,2,3,null,4", SerializeAndDeserializeBinaryTree.serialize(TreeNode.of(1, 2, 3, null, 4)));
    }

    @Test
    void serialisesACompleteTreeWithoutNulls() {
        assertEquals("1,2,3,4,5,6,7", SerializeAndDeserializeBinaryTree.serialize(TreeNode.of(1, 2, 3, 4, 5, 6, 7)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals("", SerializeAndDeserializeBinaryTree.serialize(null));
        assertNull(SerializeAndDeserializeBinaryTree.deserialize(""));
    }

    @Test
    void deserialisesTheSampleString() {
        TreeNode root = SerializeAndDeserializeBinaryTree.deserialize("1,2,3,null,4");
        assertEquals(1, root.val);
        assertEquals(2, root.left.val);
        assertEquals(3, root.right.val);
        assertNull(root.left.left);
        assertEquals(4, root.left.right.val);
    }

    @Test
    void roundTripsTheTree() {
        TreeNode root = TreeNode.of(3, 9, 20, null, null, 15, 7);
        TreeNode restored = SerializeAndDeserializeBinaryTree.deserialize(
                SerializeAndDeserializeBinaryTree.serialize(root));
        assertEquals("3,9,20,null,null,15,7", SerializeAndDeserializeBinaryTree.serialize(restored));
    }

    @Test
    void keepsTheShapeWhenALeftChildIsMissing() {
        // 1 -> (null, 2): the null marker must survive the round trip
        TreeNode restored = SerializeAndDeserializeBinaryTree.deserialize(
                SerializeAndDeserializeBinaryTree.serialize(TreeNode.of(1, null, 2)));
        assertNull(restored.left);
        assertEquals(2, restored.right.val);
    }
}

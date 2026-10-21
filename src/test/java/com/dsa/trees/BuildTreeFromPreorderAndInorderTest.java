package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class BuildTreeFromPreorderAndInorderTest {

    @Test
    void rebuildsTheSampleTree() {
        TreeNode root = BuildTreeFromPreorderAndInorder.buildTree(
                new int[]{3, 9, 20, 15, 7}, new int[]{9, 3, 15, 20, 7});
        assertEquals("3 9 20 15 7", BuildTreeFromPreorderAndInorder.levelOrderValues(root));
    }

    @Test
    void rebuildsASingleNode() {
        TreeNode root = BuildTreeFromPreorderAndInorder.buildTree(new int[]{1}, new int[]{1});
        assertEquals("1", BuildTreeFromPreorderAndInorder.levelOrderValues(root));
    }

    @Test
    void rebuildsALeftLeaningTree() {
        TreeNode root = BuildTreeFromPreorderAndInorder.buildTree(
                new int[]{1, 2, 3}, new int[]{3, 2, 1});
        assertEquals("1 2 3", BuildTreeFromPreorderAndInorder.levelOrderValues(root));
    }

    @Test
    void rebuildsARightLeaningTree() {
        TreeNode root = BuildTreeFromPreorderAndInorder.buildTree(
                new int[]{1, 2, 3}, new int[]{1, 2, 3});
        assertEquals("1 2 3", BuildTreeFromPreorderAndInorder.levelOrderValues(root));
    }

    @Test
    void handlesEmptyInput() {
        assertNull(BuildTreeFromPreorderAndInorder.buildTree(new int[]{}, new int[]{}));
    }

    @Test
    void rebuildsTheRightShape() {
        TreeNode root = BuildTreeFromPreorderAndInorder.buildTree(
                new int[]{3, 9, 20, 15, 7}, new int[]{9, 3, 15, 20, 7});
        assertEquals(9, root.left.val);
        assertEquals(20, root.right.val);
        assertEquals(15, root.right.left.val);
        assertEquals(7, root.right.right.val);
    }
}

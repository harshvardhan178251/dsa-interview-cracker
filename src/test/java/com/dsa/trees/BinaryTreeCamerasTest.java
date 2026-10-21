package com.dsa.trees;

import com.dsa.utils.TreeNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BinaryTreeCamerasTest {

    @Test
    void needsOneCameraForTheSampleTree() {
        assertEquals(1, BinaryTreeCameras.minCameraCover(TreeNode.of(0, 0, null, 0, 0)));
    }

    @Test
    void handlesAnEmptyTree() {
        assertEquals(0, BinaryTreeCameras.minCameraCover(null));
    }

    @Test
    void handlesASingleNode() {
        assertEquals(1, BinaryTreeCameras.minCameraCover(new TreeNode(0)));
    }

    @Test
    void needsOneCameraForARootWithTwoLeaves() {
        assertEquals(1, BinaryTreeCameras.minCameraCover(TreeNode.of(0, 0, 0)));
    }

    @Test
    void needsTwoCamerasForALongerChain() {
        // 0 -> (0, null) -> (0, 0)
        assertEquals(2, BinaryTreeCameras.minCameraCover(TreeNode.of(0, 0, null, 0, 0, 0, 0)));
    }

    @Test
    void needsTwoCamerasForACompleteSmallTree() {
        // one camera cannot watch the four leaves of a complete tree of seven nodes
        assertEquals(2, BinaryTreeCameras.minCameraCover(TreeNode.of(0, 0, 0, 0, 0, 0, 0)));
    }
}

package com.dsa.templates;

import com.dsa.utils.TreeNode;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * Copy-paste starting points for the binary-tree shapes, including the BST operations.
 *
 * <p>See the [trees notes](../../../docs/topics/13-trees.md).
 */
public final class TreeTemplate {

    private TreeTemplate() {
    }

    /** The template every tree problem fits: base case, recurse, combine. */
    public static int height(TreeNode node) {
        if (node == null) {
            return 0;                               // base case
        }
        int left = height(node.left);               // recurse
        int right = height(node.right);
        return 1 + Math.max(left, right);           // combine
    }

    /** Inorder — the sorted order for a BST. */
    public static List<Integer> inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.add(current.val);
            current = current.right;
        }
        return result;
    }

    /** Level order — BFS. Capture the level size before adding children. */
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            result.add(level);
        }
        return result;
    }

    /** Validate a BST by threading the allowed bounds down the tree. */
    public static boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }

    private static boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) {
            return true;
        }
        if (min != null && node.val <= min) {
            return false;
        }
        if (max != null && node.val >= max) {
            return false;
        }
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }

    /** Insert into a BST. */
    public static TreeNode insert(TreeNode root, int value) {
        if (root == null) {
            return new TreeNode(value);
        }
        if (value < root.val) {
            root.left = insert(root.left, value);
        } else if (value > root.val) {
            root.right = insert(root.right, value);
        }
        return root;
    }

    /** Delete from a BST — three cases. */
    public static TreeNode delete(TreeNode root, int value) {
        if (root == null) {
            return null;
        }
        if (value < root.val) {
            root.left = delete(root.left, value);
        } else if (value > root.val) {
            root.right = delete(root.right, value);
        } else {
            if (root.left == null) {
                return root.right;                   // zero or one child
            }
            if (root.right == null) {
                return root.left;
            }
            TreeNode successor = minNode(root.right);   // two children
            root.val = successor.val;
            root.right = delete(root.right, successor.val);
        }
        return root;
    }

    private static TreeNode minNode(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    /** Lowest common ancestor in a general binary tree. */
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {
            return root;                             // p and q are in different subtrees
        }
        return left != null ? left : right;
    }

    /** Lowest common ancestor in a BST — iterative. */
    public static TreeNode lowestCommonAncestorBST(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                return root;
            }
        }
        return null;
    }

    /** Build a tree from a level-order list where {@code null} marks a missing node. */
    public static TreeNode fromLevelOrder(Integer... values) {
        return TreeNode.of(values);
    }

    public static void main(String[] args) {
        TreeNode root = TreeNode.of(5, 3, 8, 1, 4, 7, 9);
        System.out.println("height              = " + height(root));
        System.out.println("inorder             = " + inorder(root));
        System.out.println("levelOrder          = " + levelOrder(root));
        System.out.println("isValidBST          = " + isValidBST(root));

        // The LCA queries run before the mutations change the shape of the tree.
        TreeNode one = root.left.left;               // 1
        TreeNode four = root.left.right;             // 4
        TreeNode nine = root.right.right;            // 9
        System.out.println("LCA(1, 4)           = " + lowestCommonAncestor(root, one, four).val);
        System.out.println("LCA BST(1, 9)       = " + lowestCommonAncestorBST(root, one, nine).val);

        root = insert(root, 6);
        System.out.println("after insert(6)     = " + inorder(root));
        root = delete(root, 3);
        System.out.println("after delete(3)     = " + inorder(root));
    }
}

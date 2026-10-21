---
title: Trees and BSTs — concept notes
order: 13
summary: Recursive thinking on a recursive structure — the four traversals, when to use each, BST invariants, and the shape that most tree problems have.
---

# Trees and BSTs — concept notes

## The mental model

A tree is a recursive structure: **each node has a value and subtrees that are themselves
trees.** That single observation is why almost every tree problem has a recursive
solution.

```
        5
      /   \
     3     8
    / \   / \
   2   4 7   9
```

**A BST adds one invariant:** for every node, every value in the left subtree is smaller
and every value in the right subtree is larger.

---

## The four traversals

| Traversal | Order | Use it for |
|---|---|---|
| **Preorder** (N-R-L) | Root, Left, Right | Copying a tree, serialising, pre-order expressions |
| **Inorder** (L-N-R) | Left, Root, Right | **Sorted order for a BST** |
| **Postorder** (L-R-N) | Left, Right, Root | Deleting a tree, computing subtree aggregates |
| **Level order** (BFS) | By depth | Level-by-level processing, shortest path in a tree |

**Inorder on a BST gives the sorted array.** That is the single most useful fact about
trees, and it is the basis of "validate BST", "kth smallest", and "recover a BST from
its preorder".

**Postorder is when you need the children's results before the parent's** — subtree
heights, subtree sums, deleting a tree.

**Preorder is when you need the parent before the children** — copying, building,
serialising.

---

## The universal tree-problem shape

Most tree problems fit this template:

```java
public static <T> T solve(TreeNode node) {
    if (node == null) return BASE;                    // base case
    T left  = solve(node.left);                       // recurse
    T right = solve(node.right);
    return combine(left, right, node);                // combine
}
```

**The three questions to fill in:**
1. What does one call return?
2. What is the base case?
3. How do I combine the two results with the current node?

**Fill those in on paper before writing any code.** It turns a scary problem into a
mechanical translation.

**The base case is almost always `null` returning a neutral value** — `0` for a sum,
`0` for a height, `Integer.MAX_VALUE` for a minimum, `null` for "not found".

---

## Height, depth and diameter

```java
public static int height(TreeNode node) {
    if (node == null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}
```

**Depth** is the same thing measured from the root — depth(node) = number of edges from
the root to node.

**Diameter (LC 543)** — the longest path between any two nodes:

```java
private static int diameter;

public static int diameterOfBinaryTree(TreeNode root) {
    diameter = 0;
    height(root);
    return diameter;
}

private static int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    int right = height(node.right);
    diameter = Math.max(diameter, left + right);    // the path through this node
    return 1 + Math.max(left, right);
}
```

**The insight:** every path in a tree passes through some node as its highest point. The
longest path through a node uses its deepest left path and deepest right path, so the
diameter is the max of `leftHeight + rightHeight` over all nodes.

**One pass, O(n).** Using a field for the diameter is a neat trick; a cleaner version
returns a pair.

**Minimum depth (LC 111)** — the shortest root-to-leaf path:

```java
public static int minDepth(TreeNode root) {
    if (root == null) return Integer.MAX_VALUE;
    if (root.left == null && root.right == null) return 1;    // a leaf
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
```

**The leaf check is essential.** Without it, a node with only one child would take the
null side's `MAX_VALUE` and the minimum would be wrong. (Compare with maximum depth,
where `Math.max` with 0 for null is correct.)

---

## Traversal implementations

**Inorder (iterative)** — uses a stack:

```java
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
```

**Preorder (iterative)** — one stack:

```java
public static List<Integer> preorder(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;
    Deque<TreeNode> stack = new ArrayDeque<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        result.add(node.val);
        if (node.right != null) stack.push(node.right);   // right first, so left is popped first
        if (node.left != null) stack.push(node.left);
    }
    return result;
}
```

**The push order matters** — a stack is LIFO, so pushing the right child first means the
left child is processed first, giving preorder.

**Postorder (iterative)** — the tricky one. Use one stack and a "visited" marker, or the
two-stack approach:

```java
// Two-stack approach
Deque<TreeNode> stack = new ArrayDeque<>();
Deque<TreeNode> order = new ArrayDeque<>();
stack.push(root);
while (!stack.isEmpty()) {
    TreeNode node = stack.pop();
    order.push(node);
    if (node.left != null) stack.push(node.left);
    if (node.right != null) stack.push(node.right);
}
while (!order.isEmpty()) result.add(order.pop().val);
```

**The second stack reverses the root-right-left order into left-right-root.**

**Level order (LC 102)** — BFS with a queue:

```java
public static List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Deque<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();           // the level size, captured BEFORE adding children
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}
```

**Capturing `queue.size()` before the loop is the key detail.** If you recompute it inside
the loop, the level never ends.

---

## BST invariants

**Validation (LC 98)** — the classic trap. Checking `node.left.val < node.val` is
insufficient, because it only compares direct children.

```java
public static boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}

private static boolean validate(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    if (min != null && node.val <= min) return false;
    if (max != null && node.val >= max) return false;
    return validate(node.left, min, node.val)
        && validate(node.right, node.val, max);
}
```

**The bounds are passed down**, so each node is checked against the full range it must
fall in, not just its parent.

**Alternative:** an inorder traversal must be strictly increasing.

```java
public static boolean isValidBST(TreeNode root) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    Integer previous = null;

    while (current != null || !stack.isEmpty()) {
        while (current != null) { stack.push(current); current = current.left; }
        current = stack.pop();
        if (previous != null && current.val <= previous) return false;
        previous = current.val;
        current = current.right;
    }
    return true;
}
```

**Mention both** — they are the two standard solutions, and the bounds version is the
one interviewers expect.

**Note:** LeetCode's problem usually allows duplicates, which creates the ambiguity
"left subtree strictly smaller, right subtree strictly larger" vs "≤ on both sides".
The code above uses strict on both. Say which convention you are using.

---

## BST insert, search and delete

**Insert:**

```java
public static TreeNode insert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.val) root.left = insert(root.left, value);
    else root.right = insert(root.right, value);
    return root;
}
```

**Search** is the same shape but returns the node or null.

**Delete** has three cases:

```java
public static TreeNode delete(TreeNode root, int value) {
    if (root == null) return null;
    if (value < root.val) {
        root.left = delete(root.left, value);
    } else if (value > root.val) {
        root.right = delete(root.right, value);
    } else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        // two children: replace with the inorder successor
        TreeNode successor = minNode(root.right);
        root.val = successor.val;
        root.right = delete(root.right, successor.val);
    }
    return root;
}
```

**The three cases:**
1. **No children or one child** — return the child, link it up.
2. **Two children** — replace the value with the **inorder successor** (the smallest node
   in the right subtree), then delete that successor from the right subtree.
3. **Not found** — return null.

**Why the successor:** the inorder successor is the next value in sorted order, so
swapping it in preserves the BST property.

**The mirror case (predecessor, the largest in the left subtree) is also correct.** Say
which you chose.

---

## Kth smallest in a BST (LC 230)

```java
public static int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode current = root;
    while (current != null || !stack.isEmpty()) {
        while (current != null) { stack.push(current); current = current.left; }
        current = stack.pop();
        if (--k == 0) return current.val;
        current = current.right;
    }
    return -1;
}
```

**Inorder gives sorted order, so the kth smallest is the kth element visited.**

**The follow-up:** "if the tree is modified often, or the k varies a lot, augment each
node with the size of its subtree — then the kth smallest is O(h)." That is an order-statistic
tree, and mentioning it is a strong signal.

---

## Lowest common ancestor

**In a general binary tree (LC 236):**

```java
public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;      // p and q are in different subtrees
    return left != null ? left : right;
}
```

**The reasoning:** if `p` and `q` are in different subtrees of `root`, then `root` is the
LCA. Otherwise the answer is in whichever subtree contains both.

**In a BST (LC 235):** much simpler — the LCA is where `p` and `q` split.

```java
public static TreeNode lcaBST(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}
```

**Say both.** The general version works on any tree; the BST version is O(h) with no
recursion.

---

## Path problems

**Path sum (LC 112)** — does any root-to-leaf path sum to `target`?

```java
public static boolean hasPathSum(TreeNode root, int target) {
    if (root == null) return false;
    if (root.left == null && root.right == null) return target == root.val;
    return hasPathSum(root.left, target - root.val)
        || hasPathSum(root.right, target - root.val);
}
```

**The trick:** subtract the current node's value and pass the remainder down. At a leaf,
the remainder must be exactly zero.

**The leaf check matters** — without it, you would accept an internal node whose
remaining target happened to be zero.

**Path Sum III (LC 437)** — paths that start at **any** node and go down. The prefix-sum
approach applies:

```java
public static int pathSum(TreeNode root, int target) {
    Map<Long, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0L, 1L);
    return dfs(root, 0L, target, prefixCounts);
}

private static int dfs(TreeNode node, long runningSum, int target, Map<Long, Integer> counts) {
    if (node == null) return 0;
    runningSum += node.val;
    int result = counts.getOrDefault(runningSum - target, 0);
    counts.merge(runningSum, 1, Integer::sum);
    result += dfs(node.left, runningSum, target, counts);
    result += dfs(node.right, runningSum, target, counts);
    counts.merge(runningSum, -1, Integer::sum);      // backtrack
    return result;
}
```

**The backtrack (`counts.merge(runningSum, -1, ...)`) is essential** — it makes the map
reflect the current path only, not the whole tree. Missing it counts paths that go
through the parent, which is wrong.

---

## Building a tree from a traversal

**From preorder + inorder (LC 105):**

The root is the first element of the preorder. Its position in the inorder traversal
splits the tree into left and right.

```java
private static int preIndex;

public static TreeNode build(int[] preorder, int[] inorder) {
    preIndex = 0;
    return build(preorder, inorder, 0, inorder.length - 1);
}

private static TreeNode build(int[] preorder, int[] inorder, int left, int right) {
    if (left > right) return null;
    int value = preorder[preIndex++];
    TreeNode node = new TreeNode(value);
    int mid = indexOf(inorder, value, left, right);
    node.left = build(preorder, inorder, left, mid - 1);
    node.right = build(preorder, inorder, mid + 1, right);
    return node;
}
```

**With a hash map from value to inorder index**, it is O(n). Without one, it is O(n²).

**Serialize and deserialize (LC 297)** — use a preorder traversal with `null` markers:

```
serialize:    "1,2,null,null,3,4,null,null,5,null,null"
deserialize:  parse the same way
```

**Any traversal with explicit nulls works.** Preorder is easiest because the root comes
first.

---

## Common traps

| Trap | Why it bites |
|---|---|
| Validating a BST by comparing only direct children | The constraint is with the whole subtree |
| Forgetting the leaf check in minDepth | The null side returns MAX_VALUE |
| Recomputing `queue.size()` inside the level-order loop | The level never ends |
| Pushing children in the wrong order in the iterative preorder | The traversal order is reversed |
| Forgetting to backtrack the prefix-count map in Path Sum III | Counts invalid paths |
| Using `>=` vs `>` for BST duplicates | Depends on the problem's convention |
| Not checking the leaf case in hasPathSum | Accepts invalid paths |
| Forgetting to link the returned subtree in delete | The rest of the tree is lost |
| Recursing without a null check | NPE |

---

## Complexity cheat sheet

| Operation | Time | Space |
|---|---|---|
| Height, size, count | O(n) | O(h) recursion |
| Traversal (any) | O(n) | O(h) recursion, O(n) for the result |
| Level order | O(n) | O(w) — the widest level |
| Validate BST (bounds) | O(n) | O(h) |
| Insert / search in a BST | O(h) | O(h) recursion |
| Delete in a BST | O(h) | O(h) |
| Kth smallest (inorder) | O(h + k) | O(h) |
| LCA in a general tree | O(n) | O(h) |
| LCA in a BST | O(h) | O(1) |
| Build from preorder + inorder | O(n) with a hash map | O(n) for the map |

**`O(h)` where `h` is the height** — which is O(log n) for a balanced tree and O(n) for a
degenerate one. **Say "O(log n) on a balanced BST, O(n) worst case"** — it shows you know
the difference.

---

## How to crack it in an interview

1. **Ask for the tree shape.** "Is it a BST?" "Is it balanced?" "Are the values unique?"
2. **Choose the traversal and say why.** "Inorder, because a BST's inorder is sorted."
3. **Fill in the recursion template out loud:** what one call returns, the base case, and
   how the results combine.
4. **State the invariant** for the recursive call — "the call returns the height of the
   subtree rooted at this node".
5. **Mention the iterative version** for traversals — it shows you know the recursion
   depth can be a problem.
6. **For BST problems, state the invariant explicitly:** "every value in the left subtree
   is smaller than the node's value".

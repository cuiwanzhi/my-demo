/*
 * @Description: 牛客日常刷题
 * @Autor: wb.zhujun03
 * @Date: 2022-03-30 16:21:55
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_03_30.ts
 */

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

// BM28 二叉树的最大深度
export function maxDepth(root: TreeNode): number {
	// write code here
	if (!root) {
		return 0;
	}
	return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// BM29 二叉树中和为某一值的路径(一)
export function hasPathSum(root: TreeNode, sum: number): boolean {
	// write code here
	if (!root) {
		return false;
	}
	if (sum - root.val == 0 && !root.left && !root.right) {
		return true;
	}
	if (
		hasPathSum(root.left, sum - root.val) ||
		hasPathSum(root.right, sum - root.val)
	) {
		return true;
	}
	return false;
}

// BM30 二叉搜索树与双向链表
export function Convert(pRootOfTree: TreeNode): TreeNode {
	// write code here
    if (!pRootOfTree) {
        return pRootOfTree;
    }
	let preNode = {
		left: new TreeNode(),
	};
	preNode.left = null;
	let firstP: TreeNode;
	firstEach(pRootOfTree);
	/**
	 * @description: 先序遍历函数
	 * @param {TreeNode} node 节点
	 */
	function firstEach(node: TreeNode) {
		let nodeRight = node.right;
		let leftNode = node.left;
		leftNode && firstEach(leftNode);
		// 因为push中会改变它的right
		pushNode(node);
		nodeRight && firstEach(nodeRight);
	}

	/**
	 * @description: 用于缓存先序遍历的结果
	 * @param {TreeNode} node 节点
	 */
	function pushNode(node: TreeNode) {
		node.left = preNode.left;
		if (preNode.left) {
			preNode.left.right = node;
		} else {
			firstP = node;
		}
		preNode.left = node;
	}
	preNode.left.right = null;
	return firstP;
}

// BM31 对称的二叉树
export function isSymmetrical(pRoot: TreeNode): boolean {
    // write code here
    let result: TreeNode[] = [];
    firstEach(pRoot);
    function firstEach(node: TreeNode) {
        if (!node) {
            result.push(null);
            return;
        }
        firstEach(node.left);
        result.push(node);
		firstEach(node.right);
    }
    let leftP = 0;
    let rightP = result.length - 1;
    if (rightP % 2 != 0) {
        return false;
    }
    while (leftP < rightP) {
        if (result[leftP] != result[rightP] && result[leftP].val != result[rightP].val) {
            return false;
        }
        leftP++;
        rightP--;
    }
    return true;
}

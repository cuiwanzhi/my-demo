/*
 * @Description: 牛客日常刷题
 * @Autor: wb.zhujun03
 * @Date: 2022-03-30 16:21:55
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_03_30.ts
 */

/**
 * 二叉树结构。
 * 如果new的时候传入的是null。是由bug的。
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
	function compare(leftNode: TreeNode, rightNode: TreeNode): boolean {
		// == 说明两个都是为null
		if (leftNode == rightNode) {
			return true;
		}
		if (leftNode && rightNode && leftNode.val == rightNode.val) {
			return (
				compare(leftNode.left, rightNode.right) &&
				compare(leftNode.right, rightNode.left)
			);
		} else {
			return false;
		}
	}
	return pRoot ? compare(pRoot.left, pRoot.right) : true;
}

// BM32 合并二叉树
export function mergeTrees(t1: TreeNode, t2: TreeNode): TreeNode {
	// write code here
	function merge(tree1: TreeNode, tree2: TreeNode): TreeNode {
		if (tree1 == tree2) {
			return null;
		}
		if (tree1 && !tree2) {
			return tree1;
		}
		if (!tree1 && tree2) {
			return tree2;
		}
		return {
			val: tree1.val + tree2.val,
			left: merge(tree1.left, tree2.left),
			right: merge(tree1.right, tree2.right),
		};
	}
	return merge(t1, t2);
}

// BM33 二叉树的镜像
export function Mirror(pRoot: TreeNode): TreeNode {
	// write code here
	if (!pRoot) {
		return pRoot;
	}
	[pRoot.left, pRoot.right] = [pRoot.right, pRoot.left];
	pRoot.left && Mirror(pRoot.left);
	pRoot.right && Mirror(pRoot.right);
	return pRoot;
}

// BM34 判断是不是二叉搜索树
export function isValidBST(root: TreeNode): boolean {
	// write code here

	interface resultInterface {
		max: number;
		min: number;
		isValidBST: boolean;
	}

	function isValid(node: TreeNode): resultInterface {
		if (!node.left && !node.right) {
			return {
				max: node.val,
				min: node.val,
				isValidBST: true,
			};
		}
		let result: resultInterface = {
			max: -Infinity,
			min: Infinity,
			isValidBST: false,
		};
		if (node.left) {
			if (node.left.val > node.val) {
				return result;
			}
			let leftResult = isValid(node.left);
			if (!leftResult.isValidBST || leftResult.max > node.val) {
				return result;
			}
			result.min = leftResult.min;
		} else {
			result.min = node.val;
		}

		if (node.right) {
			if (node.right.val < node.val) {
				return result;
			}
			let rightResult = isValid(node.right);
			if (!rightResult.isValidBST || rightResult.min < node.val) {
				return result;
			}

			result.max = rightResult.max;
		} else {
			result.max = node.val;
		}

		result.isValidBST = true;
		return result;
	}

	return isValid(root).isValidBST;
}

debugger;
let root: TreeNode = {
	val: 2,
	left: {
		val: 1,
		left: null,
		right: null,
	},
	right: {
		val: 3,
		left: null,
		right: null,
	},
};
isValidBST(root);

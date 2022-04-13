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
	if (!pRoot) {
		return true;
	}
	function compare(leftRoot: TreeNode, rightRoot: TreeNode) {
		if (!leftRoot && !rightRoot) {
			return true;
		} else if (leftRoot.val == leftRoot.val) {
		}
	}
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

/*
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
isValidBST(root); */

// BM35 判断是不是完全二叉树
export function isCompleteTree(root: TreeNode): boolean {
	// write code here
	let nextLevelNodes: TreeNode[] = [root];
	let hasNull: boolean = false;
	while (nextLevelNodes.length > 0) {
		let currLevelNodes = nextLevelNodes;
		nextLevelNodes = [];
		for (let index = 0; index < currLevelNodes.length; index++) {
			const node = currLevelNodes[index];
			if (!node.left && node.right) {
				return false;
			}
			if (node.left || node.right) {
				if (hasNull) {
					return false;
				}
			}
			hasNull = !node.left || !node.right;
			node.left && nextLevelNodes.push(node.left);
			node.right && nextLevelNodes.push(node.right);
		}
	}
	return true;
}

// BM36 判断是不是平衡二叉树
export function IsBalanced_Solution(pRoot: TreeNode): boolean {
    // write code here
	let IsBalancedTree = true;
	function maxDepth(root: TreeNode): number {
		if (!root ||  !IsBalancedTree) {
			return 0;
		}
		let leftDepth = maxDepth(root.left);
		let rightDepth = maxDepth(root.right);
		if (Math.abs(leftDepth - rightDepth) > 1) {
			IsBalancedTree = false;
		}
		return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
	}
	maxDepth(pRoot);
	return IsBalancedTree;
}

// BM37 二叉搜索树的最近公共祖先
export function lowestCommonAncestor(root: TreeNode, p: number, q: number): number {
    // write code here
	let minNum = Math.min(p, q);
	let maxNum = Math.max(p, q);
	if (minNum <= root.val && root.val <= maxNum) {
		return root.val;
	}
	if (root.val > maxNum) {
		return lowestCommonAncestor(root.left, p, q);
	} else {
		return lowestCommonAncestor(root.right, p, q);
	}
}

// BM38 在二叉树中找到两个节点的最近公共祖先
export function lowestCommonAncestor_2(root: TreeNode, o1: number, o2: number): number {
    // write code here
	let result: number;
	/**
	 * @description: 寻找能够找到几个节点在自己之下
	 * @param {TreeNode} root 当前节点
	 * @return {number} 自己之下有几个目标节点
	 */
	function find(root: TreeNode): number {
		if (!root) {
			return 0;
		}
		let findSum = 0;
		if (root.val  == o1 || root.val == o2) {
			findSum++;
		}
		findSum += find(root.left);
		if (findSum == 2) {
			if (result == void(0)) {
				result = root.val;
			}
			return findSum;
		}
		findSum += find(root.right);
		if (findSum == 2) {
			if (result == void(0)) {
				result = root.val;
			}
			return findSum;
		}
		return findSum;
	}
	find(root);
	return result;

}

// BM39 序列化二叉树
export function Serialize(root: TreeNode): string {
    // write code here
	if (!root) {
		return "{}";
	}
	let results: any[] = [];
	function dfsEach(node: TreeNode, index: number) {
		results[index] = node.val;
		node.left && dfsEach(node.left, 2 * index);
		node.right && dfsEach(node.right, 2 * index + 1);
	}
	dfsEach(root, 1);
	// 移除最前面的一个数。因为下标从1开始
	results.shift();
	for (let index = 0; index < results.length; index++) {
		if (results[index] == void(0)) {
			results[index] = '#';
		}
	}
	return '[' + results.toString() + ']';
}
// BM39 反序列化二叉树
export function Deserialize(str: string): TreeNode {
  // write code here
	str = str.substring(1, str.length - 1);
	let data = str.split(",");
	if (data.length <= 1 && !data [0]) {
		return null;
	}
	// 下标从1开始
	data.unshift("p");
	function dfsEach(index: number): TreeNode{
		let val = data[index];
		if (!Number.isInteger(+val)) {
			return null;
		}
		let node: TreeNode = {
			val: +val,
			left: dfsEach(2 * index),
			right: dfsEach(2 * index + 1),
		}
		return node;
	}
	return dfsEach(1);
}
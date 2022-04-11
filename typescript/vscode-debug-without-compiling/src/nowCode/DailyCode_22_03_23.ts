/*
 * @Description: 牛客日常刷题
 * @Autor: wb.zhujun03
 * @Date: 2022-03-23 23:44:07
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_03_23.ts
 */
// BM20 数组中的逆序对

export class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

export function InversePairs(data: number[]): number {
	// 这题需要用归并排序。一边排序一边计算逆序对
	/**逆序对数量 */
	let count = 0;
	function mergeSort(listData: number[]): number[] {
		if (listData.length <= 1) {
			return listData;
		}

		if (listData.length <= 2) {
			if (listData[0] > listData[1]) {
				count++;
				[listData[1], listData[0]] = [listData[0], listData[1]];
				return listData;
			}
			return listData;
		}

		let halfIdx = listData.length / 2;
		// 保证前半截是双数，不知道有没有必要
		halfIdx = halfIdx % 2 < 1 ? Math.floor(halfIdx) : Math.ceil(halfIdx);

		let L1 = mergeSort(listData.splice(0, halfIdx));
		let L2 = mergeSort(listData);

		let mergerList: number[] = [];
		let L1pop = L1.pop();
		let L2pop = L2.pop();
		while (L1pop != void 0 && L2pop != void 0) {
			if (L1pop > L2pop) {
				count += L2.length + 1;
				mergerList.unshift(L1pop);
				L1pop = L1.pop();
			} else {
				mergerList.unshift(L2pop);
				L2pop = L2.pop();
			}
		}
		if (L1pop != void 0) {
			L1.push(L1pop);
			mergerList = L1.concat(mergerList);
		} else {
			L2.push(L2pop);
			mergerList = L2.concat(mergerList);
		}
		// console.log(mergerList);
		return mergerList;
	}

	mergeSort(data);

	return count % 1000000007;
}

// BM21 旋转数组的最小数字
export function minNumberInRotateArray(rotateArray: number[]): number {
	// write code here
	let minNum = Infinity;
	rotateArray.forEach((num) => {
		minNum = Math.min(minNum, num);
	});
	return minNum;
}

// BM22 比较版本号
export function compare(version1: string, version2: string): number {
	// write code here
	let arrVersion1 = version1.split(".");
	let arrVersion2 = version2.split(".");
	let index = 0;
	let ver1;
	let ver2;
	while (arrVersion1[index] != void 0 || arrVersion2[index] != void 0) {
		ver1 = Number(arrVersion1[index]) | 0;
		ver2 = Number(arrVersion2[index]) | 0;
		if (ver1 > ver2) {
			return 1;
		}
		if (ver1 < ver2) {
			return -1;
		}
		index++;
	}
	return 0;
}

// BM23 二叉树的前序遍历
export function preorderTraversal(root: TreeNode): number[] {
	// write code here
    if (!root) {
        return [];
    }
    let results: number[] = [];
    preEach(root);
	function preEach(node: TreeNode) {
        results.push(node.val);
        node.left && preEach(node.left);
        node.right && preEach(node.right);
    }
    return results;
}

// BM26 求二叉树的层序遍历
export function levelOrder(root: TreeNode): number[][] {
    // write code here
    let results: number[][] = [];
    let nextLevelNodes: TreeNode[] = [root];
    function levelEach(node:TreeNode, level: number) {
        results[level] || results.push([]);
        results[level].push(node.val); 
        node.left && nextLevelNodes.push(node.left);
        node.right && nextLevelNodes.push(node.right);
    }
    let level = 0;
    while (nextLevelNodes.length > 0) {
        let currLevelNodes = nextLevelNodes;
        nextLevelNodes = [];
        for (let index = 0; index < currLevelNodes.length; index++) {
            const node = currLevelNodes[index];
            levelEach(node, level);
        }
        level++;
    }
    return results;
}

// BM27 按之字形顺序打印二叉树
export function Print(pRoot: TreeNode): number[][] {
    // write code here
    if (!pRoot) {
        return [];
    }
    let results: number[][] = [];
    let nextLevelNodes: TreeNode[] = [pRoot];
    function levelEach(node:TreeNode, level: number) {
        results[level] || results.push([]);
        if (level % 2) {
            results[level].unshift(node.val);
        }else{
            results[level].push(node.val);
        }
        node.left && nextLevelNodes.push(node.left);
        node.right && nextLevelNodes.push(node.right);
    }
    let level = 0;
    while (nextLevelNodes.length > 0) {
        let currLevelNodes = nextLevelNodes;
        nextLevelNodes = [];
        for (let index = 0; index < currLevelNodes.length; index++) {
            const node = currLevelNodes[index];
            levelEach(node, level);
        }
        level++;
    }
    return results;
}

/*
 * @Description: 牛客日常刷题
 * @Autor: wb.zhujun03
 * @Date: 2022-03-30 16:21:55
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_03_30.ts
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
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
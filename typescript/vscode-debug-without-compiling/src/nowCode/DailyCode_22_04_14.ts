/*
 * @Description: 堆/栈/队列。日常刷题。原来的文件已经因为不知道什么原因被污染了。所以重新建一个文件
 * @Author: wb.zhujun03
 * @Date: 2022-04-14 11:22:10
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_04_14.ts
 */

// BM42 用两个栈实现队列
export namespace stackQueue{

	let stackQueue1: number[] = [];
	let stackQueue2: number[] = [];
	export function push(node: number) {
		// write code here
		while (stackQueue2.length) {
			stackQueue1.push(stackQueue2.shift());
		}
		stackQueue1.push(node);
	}
	
	export function pop(): number {
		// write code here
		while (stackQueue1.length) {
			stackQueue2.unshift(stackQueue1.pop());
		}
		return stackQueue2.shift();
	}
}

// BM43 包含min函数的栈
export namespace minStack{
	let dataStack: number[] = [];
	let minStack: number[] = [];

	export function push(value: number) {
		// write code here
		dataStack.push(value);
		if (minStack.length) {
			minStack.push(Math.min(minStack[minStack.length - 1], value));
		} else {
			minStack.push(value);
		}
	}
	
	export function pop() {
		// write code here
		dataStack.pop();
		minStack.pop();
	}
	
	export function top(): number {
		// write code here
		return dataStack[dataStack.length - 1];
	}

	export function min(): number {
		// write code here
		return minStack[minStack.length - 1];
	}
}

// BM44 有效括号序列
export function isValid(s: string): boolean {
    // write code here
	let matchStack: string[] = [];
	for (let idx = 0; idx < s.length; idx++) {
		const item = s[idx];
		let lastMatch = matchStack[matchStack.length - 1];
		switch (item) {
			case '(':
			case '[':
			case '{':
				matchStack.push(item);
				break;
			case ')':
				if (lastMatch != '(') {
					return false;
				}
				matchStack.pop();
				break;
			case ']':
				if (lastMatch != '[') {
					return false;
				}
				matchStack.pop();
				break;
			case '}':
				if (lastMatch != '{') {
					return false;
				}
				matchStack.pop();
				break;
			default:
				break;
		}
	}
	
	return !matchStack.length;
}

// BM45 滑动窗口的最大值
export function maxInWindows(num: number[], size: number): number[] {
    // write code here
	/**当前窗口中可能是最大值的数的下标 */
	let windowsIndx: number[] = [];
	/**当前窗口中存放的可能是最大值的数 */
	let windowsData: number[] = [];
	let results: number[] = [];
	// 初始化
	windowsData.push(num[0]);
	windowsIndx.push(0);
	for (let idx = 1; idx < size; idx++) {
		while (windowsData[windowsData.length - 1] < num[idx]) {
			windowsData.pop();
			windowsIndx.pop();
		}
		windowsData.push(num[idx]);
		windowsIndx.push(idx);
	}
	results.push(windowsData[0]);
	for (let idx = size; idx < num.length; idx++) {
		while (windowsData[windowsData.length - 1] < num[idx]) {
			windowsData.pop();
			windowsIndx.pop();
		}
		windowsData.push(num[idx]);
		windowsIndx.push(idx);
		if (windowsIndx[0] <= idx - size) {
			windowsData.shift();
			windowsIndx.shift();
		}
		results.push(windowsData[0]);
	}
	return results;
}

/*
 * @Description: 日常刷题
 * @Autor: wb.zhujun03
 * @Date: 2022-03-21 14:47:01
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_03_21.ts
 */

import { ListNode } from "./NowCoder_2022_02_28";

// BM14 链表的奇偶重排
export function oddEvenList(head: ListNode): ListNode {
	// write code here

	if (!head) {
		return head;
	}
	let instarP = head;
	let oddP = head.next;
	let tmp;
	while (oddP && oddP.next) {
		tmp = oddP.next;
		oddP.next = oddP.next.next;
		tmp.next = instarP.next;
		instarP.next = tmp;

		instarP = instarP.next;
		oddP = oddP.next;
	}
	return head;
}

// BM15 删除有序链表中重复的元素-I
export function deleteDuplicates(head: ListNode): ListNode {
	// write code here
	if (!head) {
		return head;
	}
	let currP = head;
	while (currP.next) {
		if (currP.next.val == currP.val) {
			currP.next = currP.next.next;
		} else {
			currP = currP.next;
		}
	}
	return head;
}

// BM16 删除有序链表中重复的元素-II
export function deleteDuplicates_2(head: ListNode): ListNode {
	// write code here
	let pre: ListNode = {
		val: undefined,
		next: head,
	};
	let hasRepeat = false;
	let splitStartP: ListNode = pre;
	let scanP: ListNode = head;
	while (scanP && scanP.next) {
		if (scanP.val != scanP.next.val) {
			if (hasRepeat) {
				hasRepeat = false;
                splitStartP.next = scanP.next;
			}else{
                splitStartP = splitStartP.next;
            }

		} else {
            hasRepeat =true;
		}
        
        scanP = scanP.next;
	}
    if (hasRepeat) {
        splitStartP.next = scanP.next;
    }
	return pre.next;
}

// BM17 二分查找-I
export function search(nums: number[], target: number): number {
    // write code here
    if (!nums.length || target < nums[0] || target > nums[nums.length -1]) {
        return -1;
    }
    let startIdx = 0;
    let endIdx = nums.length -1;
    let halfIdx = Math.ceil((startIdx + endIdx) / 2);
    while (nums[halfIdx] != target) {
        if (endIdx - startIdx < 3) {
            halfIdx = nums[startIdx] == target ? startIdx : endIdx;
            break;
        }
        if (nums[halfIdx] > target) {
            endIdx = halfIdx;
        } else {
            startIdx = halfIdx;
        }
        halfIdx = Math.round((startIdx + endIdx) / 2);
    }
    if (nums[halfIdx] != target) {
        return -1
    } else {
        return halfIdx;
    }
}

// BM18 二维数组中的查找
export function Find(target: number, array: number[][]): boolean {
    // write code here
    for (const nums of array) {
        if (search(nums, target) != -1) {
            return true;
        }
    }
    return false;
}

// BM19 寻找峰值
export function findPeakElement(nums: number[]): number {
    // write code here
    for (let index = 0; index < nums.length -1; index++) {
        if (nums[index] > nums[index + 1]) {
            return index;
        }
    }
    return nums.length -1;
}

// BM20 数组中的逆序对
export function InversePairs(data: number[]): number {
    // write code here
    // 这题需要用归并排序。一边排序一边计算逆序对
    return
}

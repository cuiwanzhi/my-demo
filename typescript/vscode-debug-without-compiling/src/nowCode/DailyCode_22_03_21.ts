/*
 * @Description: 日常刷题
 * @Autor: wb.zhujun03
 * @Date: 2022-03-21 14:47:01
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\DailyCode_22_03_21.ts
 */

import { InversePairs } from "./DailyCode_22_03_23";
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

        let halfIdx = listData.length /2;
        // 保证前半截是双数，不知道有没有必要
        halfIdx = halfIdx % 2 < 1? Math.floor(halfIdx) : Math.ceil(halfIdx);
        
        let L1 = mergeSort(listData.splice(0, halfIdx));
        let L2 = mergeSort(listData);

        let mergerList: number[] = [];
        let L1pop = L1.pop();
        let L2pop = L2.pop();
        while (L1pop != void(0) && L2pop != void(0)) {
            if (L1pop > L2pop) {
                count += L2.length+1;
                mergerList.unshift(L1pop);
                L1pop = L1.pop();
            } else {
                mergerList.unshift(L2pop);
                L2pop = L2.pop();
            }
        }
        if (L1pop != void(0)) {
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
}debugger;
InversePairs([1,2,3,4,5,6,7,0]);
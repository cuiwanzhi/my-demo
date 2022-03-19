/*
 * @Description: 牛客-在线编程
 * @Autor: cuiwanzhi
 * @Date: 2022-02-28 22:19:00
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\NowCoder_2022_02_28.ts
 */

// debugger;

class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

export function Merge(pHead1: ListNode, pHead2: ListNode): ListNode {
	// write code here
	let p1 = pHead1;
	let p2 = pHead2;
	const pre = new ListNode(0, null);
	let currP = pre;
	while (p1 && p2) {
		if (p1.val < p2.val) {
			currP.next = p1;
			p1 = p1.next;
		} else {
			currP.next = p2;
			p2 = p2.next;
		}
		currP = currP.next;
	}
	currP.next = p1 ? p1 : p2;
	return pre.next;
}

// BM5 合并k个已排序的链表
export function mergeKLists(lists: ListNode[]): ListNode {
	// write code here
	let min: number;
	let index: number;
	let pre = new ListNode(0, null);
	let currP = pre;
	while (true) {
		min = Infinity;
		index = -1;
		for (let i = 0; i < lists.length; i++) {
			const node = lists[i];
			if (node && node.val < min) {
				min = node.val;
				index = i;
			}
		}
		if (min == Infinity) {
			break;
		}
		currP.next = lists[index];
		currP = currP.next;
		lists[index] = lists[index].next;
		if (!lists[index]) {
			lists.splice(index, 1);
		}
	}
	return pre.next;
}

// BM3 链表中的节点每k个一组翻转
export function reverseKGroup(head: ListNode, k: number): ListNode {
	// write code here
	let count = 0;
	let pre: ListNode = {
		val: 0,
		next: head,
	};
	let start = pre;
	let currP = start.next;
	let preCurrP = start;
	while (currP) {
		if (count == k) {
			count = 0;
			start = preCurrP;
		}
		if (currP == start.next) {
			count++;
			currP = currP.next;
			preCurrP = preCurrP.next;
			continue;
		}
		preCurrP.next = currP.next;
		currP.next = start.next;
		start.next = currP;
		currP = preCurrP.next;
		count++;
	}

	if (count != k) {
		preCurrP = start;
		currP = preCurrP.next;
		while (currP) {
			if (currP == start.next) {
				count++;
				currP = currP.next;
				preCurrP = preCurrP.next;
				continue;
			}
			preCurrP.next = currP.next;
			currP.next = start.next;
			start.next = currP;
			currP = preCurrP.next;
			count++;
		}
	}
	return pre.next;
}

// BM8 链表中倒数最后k个结点
export function FindKthToTail(pHead: ListNode, k: number): ListNode {
	// write code here
	let first = pHead;
	let end = pHead;
	let count = 0;
	while (count < k && !!end) {
		end = end.next;
		count++;
	}
	if (count < k) {
		return null;
	}
	while (!!end) {
		end = end.next;
		first = first.next;
	}
	return first;
}

// BM9 删除链表的倒数第n个节点
export function removeNthFromEnd(head: ListNode, n: number): ListNode {
	// write code here
	let preHead: ListNode = {
		val: 0,
		next: head,
	};
	let first = preHead;
	let end = head;
	let count = 0;
	while (count < n && !!end) {
		end = end.next;
		count++;
	}
	if (count < n) {
		return null;
	}
	while (!!end) {
		end = end.next;
		first = first.next;
	}
	first.next = first.next.next;
	return preHead.next;
}

// BM10 两个链表的第一个公共结点
export function FindFirstCommonNode(pHead1: ListNode, pHead2: ListNode): ListNode {
	// write code here
	let length1 = 0;
	let length2 = 0;
    let p1 = pHead1;
    let p2 = pHead2;
    while (p1 || p2) {
        if (p1) {
            p1 = p1.next;
            length1++;
        }
        if (p2) {
            p2 = p2.next;
            length2++;
        }
    }
    let shortList = pHead1;
    let longList = pHead2;
    if (length1 > length2) {
        longList = pHead1;
        shortList = pHead2;
    }
    let index = 0;
    let longNum = Math.abs(length1 - length2)
    while (index < longNum) {
        longList = longList.next;
        index++;
    }
    while (longList != shortList) {
        longList = longList.next;
        shortList = shortList.next;
    }
	return longList;
}

// BM12 单链表的排序
export function sortInList(head: ListNode): ListNode {
    // write code here
    let preHead: ListNode = {
        val: 0,
        next: head,
    }
    let currP = preHead;
    let minNode: ListNode;
    let scanP: ListNode;
    let preMinNode: ListNode;
    while(currP.next){
        minNode = currP.next;
        scanP = currP;
        preMinNode = currP;
        while (scanP.next) {
            if (scanP.next.val < minNode.val) {
                preMinNode = scanP;
                minNode = scanP.next;
            }
            scanP = scanP.next;
        }
        if (minNode != currP.next) {
            preMinNode.next = preMinNode.next.next;
            minNode.next = currP.next;
            currP.next = minNode;
        }
        currP = currP.next;
    }
    return preHead.next;
}

// BM1 反转链表
export function ReverseList(head: ListNode): ListNode {
	if (!head) {
		return head;
	}
    // write code here
	let pre: ListNode = {
		val: 0,
		next: head
	}
	let tmp: ListNode = null;
	while(head.next){
		tmp = head.next;
		head.next = head.next.next;
		tmp.next = pre.next;
		pre.next = tmp;
	}
	return pre.next;
}


// BM13 判断一个链表是否为回文结构
// 1、使用快慢指针，将字符串翻转，以时间换空间。
export function isPail(head: ListNode): boolean {
    // write code here
	let pre: ListNode = {
		val: 0,
		next: head
	}
	/* 慢指针 */
	let L: ListNode = head;
	/* 快指针 */
	let S: ListNode = head;
	while (S && S.next) {
		L = L.next;
		pre = pre.next;
		S = S.next.next;
	}
	if (S == L) {
		return true;
	}
	/**
	 * S != void(0) 表示为奇数个元素 -> 后半段的L2head为L.next
	 * S == void(0) 表示为偶数个元素 ->	后半段的L2head为L
	 */
	let L2head = S? L.next : L;
	let L1head = head;
	// 将链表截断
	pre.next = null;
	
	// 翻转L1
	let preL1head: ListNode = {
		val: 0,
		next: L1head
	}
	let tmp: ListNode;
	while (L1head.next) {
		tmp = L1head.next;
		L1head.next = L1head.next.next;
		tmp.next = preL1head.next;
		preL1head.next = tmp;
	}
	L1head = preL1head.next;

	while (L1head) {
		if (L1head.val != L2head.val) {
			return false;
		}
		L1head = L1head.next;
		L2head = L2head.next;
	}
	return true;
}
// BM13 判断一个链表是否为回文结构
// 2、使用数组存储，并且不改变原有的链表，以空间换时间，
export function isPail2(head: ListNode): boolean {
    // write code here
	let arrNode: ListNode[] = [];
	let currP = head;
	while (currP) {
		arrNode.push(currP);
		currP = currP.next;
	}
	let idxL = 0;
	let idxR = arrNode.length - 1;
	while(idxL < idxR){
		if (arrNode[idxL].val != arrNode[idxR].val) {
			return false;
		}
		idxL++;
		idxR--;
	}
	return true;
}


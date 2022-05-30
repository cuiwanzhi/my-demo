import { ListNode } from "../nowCode/NowCoder_2022_02_28";

let arrMax: number[] = [];
function rob(nums: number[]): number {
	// total(nums, 0);
	// console.log(total(nums, 0));
    arrMax = [];
	return total(nums, 0);
}

function total(nums: number[], index: number): number {
	if (arrMax[index] != void 0) {
		return arrMax[index];
	}
	let currNum = nums[index];
	if (index >= nums.length) {
		return 0;
	}
	let max = Math.max(
		currNum + total(nums, index + 2),
		total(nums, index + 1)
	);
	arrMax[index] = max;
	return max;
}

function twoSum(nums: number[], target: number): number[] {
	let mapNums: { [n: number]: number } = {};
	for (let index = 0; index < nums.length; index++) {
		let item = nums[index];
		if (mapNums[target - item] != void 0) {
			return [index, mapNums[target - item]];
        }
        mapNums[item] = index;
	}
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let preHead: ListNode = {
        val: 0,
        next: null
    }
    
    let sum: number[] = [];
    let tmpV = 0;
    let index = 0;
    while (l1 || l2) {
        tmpV = ((l1 && l1.val) || 0) + ((l2 && l2.val) || 0) + (sum[index] || 0)
        sum[index] = tmpV % 10;
        sum[index + 1] = (tmpV / 10) | 0;
        index++;
        l1 = l1? l1.next : null;
        l2 = l2? l2.next : null;
    }

    // 去除最后一个0
    if (sum[sum.length - 1] == 0) {
        sum.pop();
    }

    let idx = sum.length -1;
    while (idx >= 0) {
        preHead.next = {
            val: +(sum[idx]),
            next: preHead.next
        }
        idx--;
    }
    return preHead.next ? preHead.next : preHead;
};



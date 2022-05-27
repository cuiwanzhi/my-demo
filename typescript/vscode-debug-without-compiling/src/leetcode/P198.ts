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
    let num1 = BigInt(0);
    let num2 =  BigInt(0);
    let tmpV = 1;
    while (l1) {
        num1 = num1 + BigInt(tmpV * l1.val);
        l1 = l1.next;
        tmpV *= 10;
    }
    tmpV = 1;
    while (l2) {
        num2 = num2 + BigInt(tmpV * l2.val);
        l2 = l2.next;
        tmpV *= 10;
    }
    let sum = (num1 + num2).toString();
    let preHead: ListNode = {
        val: 0,
        next: null
    }
    let idx = 0;
    while (idx < sum.length) {
        preHead.next = {
            val: +(sum[idx]),
            next: preHead.next
        }
        idx++;
    }
    return preHead.next ? preHead.next : preHead;
};
debugger;
addTwoNumbers(null, null)


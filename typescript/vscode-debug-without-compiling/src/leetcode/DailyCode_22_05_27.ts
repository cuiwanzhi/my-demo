/**
 * @description: 3. 无重复字符的最长子串
 * @return {*}
 */
// 由于子串不固定，无法使用kmp算法
// 1、尝试不使用模拟的方法。而是直接去取每个相同的字母的位置  × 因为可能会出现嵌套的问题(例如：abba)
// 2、在记录每个字母出现的位置时候，同时挪动视窗起点。这样可以避免出现嵌套问题。
function lengthOfLongestSubstring(s: string): number {
	let mapIndex: { [key: string]: number } = {};
	let start = 0;
	let maxLen = 0;
	for (let index = 0; index < s.length; index++) {
		const c = s[index];
		if (mapIndex[c] != void 0) {
			start = Math.max(start, mapIndex[c] + 1);
		}
		mapIndex[c] = index;
		maxLen = Math.max(maxLen, index - start + 1);
	}
	return maxLen;
}

/**
 * @description: 4.合并数组后找中位数
 * @return {*}
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	let nums: number[] = [];
	while (nums1.length && nums2.length) {
		if (nums1[0] < nums2[0]) {
			nums.push(nums1[0]);
			nums1.shift();
		} else {
			nums.push(nums2[0]);
			nums2.shift();
		}
	}

	if (nums1.length) {
		nums = nums.concat(nums1);
	} else {
		nums = nums.concat(nums2);
	}
	let median: number;
	let length = nums.length - 1;
	if (!length) {
		return nums[0];
	}
	let middle = (length / 2) | 0;
	if ((length & 1) === 0) {
		median = nums[middle];
	} else {
		median = (nums[middle] + nums[middle + 1]) / 2;
	}
	return +median.toFixed(5);
}

/**
 * @description: 5. 最长回文子串
 * @return {*}
 */
// 1、最蠢但是写得最快的方法: 排列组合 1000 + 999 + 998 =1000^2
function longestPalindrome(s: string): string {
	let maxLen = s.length;
	for (let index = 0; index < s.length; index++) {
		if (index + maxLen > s.length) {
			index = -1;
			maxLen--;
			continue;
		}
		if (isPail2(s, index, index + maxLen - 1)) {
			return s.slice(index, index + maxLen);
		}
	}

	function isPail2(arr: string, startIdx: number, endIdx: number): boolean {
		let idxL = startIdx;
		let idxR = endIdx;
		while (idxL < idxR) {
			if (arr[idxL] != arr[idxR]) {
				return false;
			}
			idxL++;
			idxR--;
		}
		return true;
	}
}

/**
 * @description: 6. Z 字形变换
 * @param {string} s
 * @param {number} numRows
 * @return {*}
 */
function convert(s: string, numRows: number): string {
	if (numRows == 1) {
		return s;
	}

	let arrS: string[] = [];
	for (let idx = 0; idx < numRows; idx++) {
		arrS[idx] = "";
	}
	let cycleNum = numRows + numRows - 2;
	let slantedIdx = numRows - 2;
	for (let idx = 0; idx < s.length / cycleNum; idx++) {
		for (let jdx = 0; jdx < numRows; jdx++) {
			if (!s[cycleNum * idx + jdx]) {
				break;
			}
			arrS[jdx] += s[cycleNum * idx + jdx];
		}
		slantedIdx = numRows - 2;
		for (let jdx = numRows; jdx < cycleNum; jdx++) {
			if (!s[cycleNum * idx + jdx]) {
				break;
			}
			arrS[slantedIdx] += s[cycleNum * idx + jdx];
			slantedIdx--;
		}
	}
	let result = "";
	arrS.forEach((S) => {
		result += S;
	});

	return result;
}

/**
 * @description: 7. 整数反转
 * @param {number} x
 * @return {*}
 */
function reverse(x: number): number {
	let copyS = x.toString().split("");
	let indexL = 0;
	let indexR = copyS.length - 1;
	if (x < 0) {
		indexL = 1;
	}

	while (indexL < indexR) {
		[copyS[indexL], copyS[indexR]] = [copyS[indexR], copyS[indexL]];
		indexL++;
		indexR--;
	}
	let result = "";
	copyS.forEach((c) => {
		result += c;
	});
	if (+result > 2147483648 || +result < -2147483648) {
		return 0;
	}
	return +result;
}

/**
 * @description: 8. 字符串转换整数 (atoi)
 * @param {string} s
 * @return {*}
 */
function myAtoi(s: string): number {
	let result = parseInt(s);
	if (!result) {
		return 0;
	}
	if (result > 2147483647) {
		return 2147483647;
	}
	if (result < -2147483648) {
		return -2147483648;
	}
	return result;
}

/**
 * @description: 9. 回文数
 * @param {number} x
 * @return {*}
 */
function isPalindrome(x: number): boolean {
	let str = x.toString();
	let indexL = 0;
	let indexR = str.length - 1;
	while (indexL < indexR) {
		if (str[indexL] != str[indexR]) {
			return false;
		}
		indexL++;
		indexR--;
	}
	return true;
}

/**
 * kmp
 * @param haystack
 * @param needle
 * @returns
 */
function strStr(haystack: string, needle: string): number {
	let next: number[] = [0];
	for (let idx = 1; idx < needle.length; idx++) {
		// const ch = needle[idx];
		let backIdx = next[idx - 1] || 0;
		while (needle[backIdx] != needle[idx] && backIdx) {
			backIdx = next[backIdx - 1];
		}
		if (needle[backIdx] == needle[idx]) {
			next[idx] = backIdx + 1;
		} else {
			next[idx] = 0;
		}
	}

	let needleIdx = 0;
	for (let idx = 0; idx < haystack.length; idx++) {
		const ch = haystack[idx];
		if (ch != needle[needleIdx] && needleIdx != 0) {
			needleIdx = next[needleIdx - 1];
			idx--;
			continue;
		}
		if (ch == needle[needleIdx]) {
			needleIdx++;
		}
		if (needleIdx >= needle.length) {
			return idx - needle.length + 1;
		}
	}
	return -1;
}

function maxArea(arr: number[]): number {
	// write code here
	let indexL = 0;
	let indexR = arr.length - 1;
	let minHeight = Math.min(arr[indexL], arr[indexR]);
	let water = (indexR - indexL) * minHeight;
	while (indexL < indexR) {
		if (arr[indexL] < arr[indexR]) {
			indexL++;
			if (arr[indexL] > minHeight) {
				minHeight = Math.min(arr[indexL], arr[indexR]);
			}
		} else {
			indexR--;
			if (arr[indexR] > minHeight) {
				minHeight = Math.min(arr[indexL], arr[indexR]);
			}
		}
		water = Math.max(water, (indexR - indexL) * minHeight);
	}
	return water;
}

/**
 * 12. 整数转罗马数字
 * @param num
 * @returns
 */
function intToRoman(num: number): string {
	const valueS: { [n: number]: string } = {
		1: "I",
		5: "V",
		10: "X",
		50: "L",
		100: "C",
		500: "D",
		1000: "M",
	};
	let result = "";

	let keyS = Object.keys(valueS);
	for (let idx = keyS.length - 1; idx >= 0; idx--) {
		const val = +keyS[idx];
		if (num == 4) {
			result += valueS[1] + valueS[5];
			num -= 4;
		} else if (num == 9) {
			result += valueS[1] + valueS[10];
			num -= 9;
		} else if (((num / 10) | 0) == 4) {
			result += valueS[10] + valueS[50];
			num -= 40;
		} else if (((num / 10) | 0) == 9) {
			result += valueS[10] + valueS[100];
			num -= 90;
		} else if (((num / 100) | 0) == 4) {
			result += valueS[100] + valueS[500];
			num -= 400;
		} else if (((num / 100) | 0) == 9) {
			result += valueS[100] + valueS[1000];
			num -= 900;
		} else if (num >= val) {
			result += valueS[val];
			idx = keyS.length;
			num -= val;
		}
	}
	return result;
}

/**
 * @description: 12. 整数转罗马数字
 * @param {string} s
 * @return {*}
 */
function romanToInt(s: string): number {
	const valueS: { [n: string]: number } = {
		I: 1,
		V: 5,
		X: 10,
		L: 50,
		C: 100,
		D: 500,
		M: 1000,
	};
	let result = 0;
	for (let index = 0; index < s.length; index++) {
		const ch = s[index];
		const val = valueS[ch];
		const nextVla = valueS[s[index + 1]];
		if (val < nextVla) {
			result += nextVla - val;
			index++;
		} else {
			result += val;
		}
	}
	return result;
}

/**
 * @description: 14. 最长公共前缀
 * @param {string} strs
 * @return {*}
 */
function longestCommonPrefix(strs: string[]): string {
	let result = "";
	let indexP = 0;
	let frisCh = "";
	while (true) {
		let frisCh = strs[0][indexP];
		if (!frisCh) {
			return result;
		}
		for (let idx = 0; idx < strs.length; idx++) {
			const str = strs[idx];
			if (str[indexP] == void 0) {
				return result;
			}
			if (str[indexP] != frisCh) {
				return result;
			}
		}
		result += frisCh;
		indexP++;
	}
}

/**
 * @description: 15. 三数之和
 * @param {number} nums
 * @return {*}
 */
//1、选定一个数，使用排列组合的方式转化成两数之和   × 剪枝有限，不会减少时间复杂度。并且去重及其麻烦。
function threeSum(nums: number[]): number[][] {
	let result: number[][] = [];
	// 排序之后可以大大节省时间，因为大于0的部分相加不可能等于0；
	nums.sort((a, b) => a - b);
	if (nums[0] > 0 || nums[nums.length - 1] < 0) {
		return [];
	}

	let indexL: number;
	let indexR: number;
	let tmpDict: { [n: number]: number[] } = {};
	for (let idx = 0; idx < nums.length - 2 && nums[idx] <= 0; idx++) {
		const lowZeroNum = nums[idx];
		if (result.length && lowZeroNum == result[result.length - 1][0]) {
			continue;
		}
		tmpDict = {};
		indexL = idx + 1;
		indexR = nums.length - 1;
		while (indexL < indexR && indexL > idx && indexR < nums.length) {
			if (lowZeroNum + nums[indexL] + nums[indexR] == 0) {
				if (
					!result.length ||
					result[result.length - 1][1] != nums[indexL] ||
					result[result.length - 1][2] != nums[indexL]
				) {
					result.push([lowZeroNum, nums[indexL], nums[indexR]]);
				}
				indexL++;
				continue;
			}
			if (lowZeroNum + nums[indexL] + nums[indexR] > 0) {
				indexR--;
			} else {
				indexL++;
			}
		}
	}
	return result;
}

/**
 * @description: 16. 最接近的三数之和
 * @param {number} nums
 * @param {number} target
 * @return {*}
 */
function threeSumClosest(nums: number[], target: number): number {
	let minClosest = Infinity;
	let result: number;
	// 排序之后可以大大节省时间，因为大于0的部分相加不可能等于0；
	nums.sort((a, b) => a - b);

	let preNum: number;
	let indexL: number;
	let indexR: number;
	let tmpDict: { [n: number]: number[] } = {};
	let gap: number;
	for (let idx = 0; idx < nums.length - 2; idx++) {
		const lowNum = nums[idx];
		if (preNum == lowNum) {
			continue;
		}
		tmpDict = {};
		indexL = idx + 1;
		indexR = nums.length - 1;
		while (indexL < indexR && indexL > idx && indexR < nums.length) {
			gap = lowNum + nums[indexL] + nums[indexR] - target;
			if (Math.abs(gap) < minClosest) {
				result = lowNum + nums[indexL] + nums[indexR];
				minClosest = Math.abs(gap);
			}
			if (minClosest == 0) {
				return result;
			}
			if (gap > 0) {
				indexR--;
			} else {
				indexL++;
			}
		}
	}
	return result;
}

/**
 * @description: 17. 电话号码的字母组合
 * @param {string} digits
 * @return {*}
 */
function letterCombinations(digits: string): string[] {
    if (!digits) {
        return [];
    }
    let keyS: {[s: string]: string[]} = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"],
        
    };
    
    let results: string[] = [];
    let tmpStr = "";
    dfs(0);
    function dfs(deep: number) {
        let strS = keyS[digits[deep]] ;
        for (let index = 0; index < strS.length; index++) {
            const ch = strS[index];
            tmpStr += ch;
            if (deep == digits.length -1) {
                results.push(tmpStr);
            } else {
                dfs(deep + 1);
            }
            tmpStr = tmpStr.substring(0, tmpStr.length - 1);
        }
    }
    return results;
}

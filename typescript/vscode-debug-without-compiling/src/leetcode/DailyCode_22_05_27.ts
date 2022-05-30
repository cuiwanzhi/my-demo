// 3. 无重复字符的最长子串
// 由于子串不固定，无法使用kmp算法
// 1、尝试不使用模拟的方法。而是直接去取每个相同的字母的位置  × 因为可能会出现嵌套的问题(例如：abba)
// 2、在记录每个字母出现的位置时候，同时挪动视窗起点。这样可以避免出现嵌套问题。
function lengthOfLongestSubstring(s: string): number {
    let mapIndex: { [key: string]: number } = {};
    let start = 0;
    let maxLen = 0;
    for (let index = 0; index < s.length; index++) {
        const c = s[index];
        if (mapIndex[c] != void(0)) {
            start = Math.max(start, mapIndex[c] + 1);
        }
        mapIndex[c] = index;
        maxLen = Math.max(maxLen, index - start + 1);
    }
    return maxLen;
};
// 4.合并数组后找中位数
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    let nums: number[] = []
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
        nums = nums.concat(nums1)
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
};

// 5. 最长回文子串
// 1、最蠢但是写得最快的方法: 排列组合 1000 + 999 + 998 =1000^2
function longestPalindrome(s: string): string {
    let maxLen = s.length;
    for (let index = 0; index < s.length; index++) {
        if (index + maxLen > s.length) {
            index = -1;
            maxLen--;
            continue;
        }
        if (isPail2(s, index, index + maxLen -1)) {
            return s.slice(index, index + maxLen);
        }
        
    }
    
    function isPail2(arr: string, startIdx: number, endIdx: number): boolean {
        let idxL = startIdx;
        let idxR = endIdx;
        while(idxL < idxR){
            if (arr[idxL] != arr[idxR]) {
                return false;
            }
            idxL++;
            idxR--;
        }
        return true;
    }
};

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
    for (let idx = 0; idx < (s.length / cycleNum); idx++) {
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
    arrS.forEach(S => {
        result += S;
    });
    
    return result;
}; 

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
    copyS.forEach(c => {
        result += c;
    });
    if (+result >  2147483648 || +result < -2147483648) {
        return 0;
    }
    return +result;
};

function myAtoi(s: string): number {
    let result = parseInt(s);
    if (!result) {
        return 0;
    }
    if (result > 2147483647) {
        return 2147483647;
    }
    if (result < -2147483648) {
        return -2147483648
    }
    return result
};


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
};

// KMP
function strStr(haystack: string, needle: string): number {
    let next: number[] = [0];
    for (let idx = 1; idx < needle.length; idx++) {
        // const ch = needle[idx];
        let backIdx = next[idx - 1] || 0;
        while (needle[backIdx] != needle[idx] && backIdx) {
            backIdx = next[backIdx -1];
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
            return idx - needle.length  + 1;
        }
    }
    return -1;
};

debugger;

strStr("mississippi", "issip")
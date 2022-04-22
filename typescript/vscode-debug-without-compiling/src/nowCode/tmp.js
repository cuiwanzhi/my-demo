function findKth(input, n, k) {
    // write code here
	k = n - k;
	
	function findSort(start, end) {
		let topVal = input[start];
		/**空位置 */
		let tmpIdx = start;
		let preIdx = start;
		let endIdx = end;
		while (preIdx < endIdx) {
			while (preIdx < endIdx) {
				if (input[endIdx] < topVal) {
					input[tmpIdx] = input[endIdx];
					tmpIdx = endIdx;
					break;
				}
				endIdx--;
			}
			while (preIdx < endIdx) {
				if (input[preIdx] >= topVal) {
					input[tmpIdx] = input[preIdx];
					tmpIdx = preIdx;
					break;
				}
				preIdx++;
			}
		}
		input[tmpIdx] = topVal;
		if (k < tmpIdx) {
			findSort(start, tmpIdx);
		}else if (k > tmpIdx) {
			findSort(tmpIdx + 1, end);
		}
	}
	findSort(0, input.length - 1);
	return input[k];
}
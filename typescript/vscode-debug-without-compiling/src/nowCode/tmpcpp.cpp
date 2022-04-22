/*
 * @Description: 测试寻找第k大的数 。改成cpp
 * @Author: wb.zhujun03
 * @Date: 2022-04-22 17:48:41
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\tmpcpp.cpp
 */
#include <vector>
using namespace std;

class Solution {
   public:
    vector<int> input;
    int k;

    int findKth(vector<int> a, int n, int K) {
        // write code here
        k = n - K;
        input = a;

        findSort(0, input.size() - 1);
        return input[k];
    }

    /**
     * @description: 使用快排思想来来对数据进行分类，比答案效率还要高
     * @param {number} start 开始下标
     * @param {number} end 结束下标
     */
    void findSort(int start, int end) {
        int topVal = input[start];
        /**空位置 */
        int tmpIdx = start;
        int preIdx = start;
        int endIdx = end;
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
        } else if (k > tmpIdx) {
            findSort(tmpIdx + 1, end);
        }
    }
};
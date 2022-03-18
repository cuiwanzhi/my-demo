/*
 * @Description: 测试牛客输入环境
 * @Autor: wb.zhujun03
 * @Date: 2022-03-18 17:25:32
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\CinTest.ts
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let arr: string[] = [];
rl.on('line', function(line: string){
    arr.push(line);
});

rl.on('close', function () {
    main(arr);
});


function main(params: string[]) {
    params.forEach(cinStr => {
        if (cinStr == "0") {
            return;
        }
        let arrData = cinStr.split(" ");
        let sum = 0;
        arrData.forEach(item => {
            sum+= Number(item);
        });
        sum -= Number(arrData[0]);
        console.log(sum);
    });
}
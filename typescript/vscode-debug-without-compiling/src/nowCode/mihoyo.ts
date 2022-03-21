/*
 * @Description: 米哈游笔试
 * @Autor: wb.zhujun03
 * @Date: 2022-03-20 21:18:57
 * @FilePath: \vscode-debug-without-compiling\src\nowCode\mihoyo.ts
 */


let arr: string[] = [];
/* import readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function(line: string){
    arr.push(line);
});

rl.on('close', function () {
    main(arr);
}); */

debugger;
arr = [
    "2"
    ,"6"
    ,"6 1 3 5 2"
    ,"1 3 5 2 6"
    ,"4"
    ,"3 4 1 2"
    ,"1 2 3 4"
];
main(arr);

function main(params: string[]) {
    let n = Number(params[0]);
    params.shift();
    let L1: string[];
    let L2: string[];
    for (let i = 0; i < n; i++) {
        params.shift();
        L1 = params[0].split(" ");
        L2 = params[1].split(" ");
        console.log(func(L1, L2));
        params.shift();
        params.shift();
    }
}

function func(L1: string[], L2: string[]) {
    let n = L1.length;
    let isStart = 0;
    let p1 =0;
    let p2 =0;
    while (p1 < n) {
        if (L1[p1] == L2[p2]) {
            p1++;
            p2++;
        }else{
            if (p2) {
                p2 = 0
            } else {
                isStart++;
                p1 = isStart;
            }
        }
    }
    return isStart;
}
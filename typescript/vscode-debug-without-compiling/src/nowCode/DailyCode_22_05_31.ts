export function maxWater(arr: number[]): number {
    // write code here
    let indexL = 0;
    let indexR = arr.length -1;
    let minHeight = Math.min(arr[indexL], arr[indexR]);
    let water = 0;
    while (indexL < indexR) {
        if (arr[indexL] < arr[indexR]) {
            indexL++;
            if (arr[indexL] > minHeight) {
                minHeight = Math.min(arr[indexL], arr[indexR]);
            } else {
                water += minHeight - arr[indexL];
            }
        } else {
            indexR--;
            if (arr[indexR] > minHeight) {
                minHeight = Math.min(arr[indexL], arr[indexR]);
            } else {
                water += minHeight - arr[indexR];
            }
        }
    }
    return water;
}

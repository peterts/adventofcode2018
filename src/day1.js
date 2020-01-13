import { readLines } from "./utils.js";


function findFirstRepeating(array){
    const seen = new Set();
    let i = 0;
    let sum = 0;
    do {
        seen.add(sum);
        sum += array[i];
        i = (i + 1) % array.length;
    } while(!seen.has(sum));
    return sum;
}


const array = readLines('../input/day1.txt').map(Number);
console.log(array.reduce((a, b) => a+b, 0));
console.log(findFirstRepeating(array));

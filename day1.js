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
};

const fs = require('fs');
const array = fs.readFileSync('input/day1.txt').toString().split("\n").map(s => s.trim()).map(Number);
console.log(array.reduce((a, b) => a+b, 0));
console.log(findFirstRepeating(array));

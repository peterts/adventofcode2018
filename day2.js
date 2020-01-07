function Counter(array) {
    array.forEach(val => this[val] = (this[val] || 0) + 1);
}

function zip(arr1, arr2){
    // See https://stackoverflow.com/questions/22015684/how-do-i-zip-two-arrays-in-javascript
    return arr1.map((x, i) => [x, arr2[i]]);
}


function computeChecksum(listOfCharArrays){
    let countTwoLetters = 0;
    let countThreeLetters = 0;
    for(let arr of listOfCharArrays){
        let values = Object.values(new Counter(arr));
        if(values.includes(2)) countTwoLetters += 1;
        if(values.includes(3)) countThreeLetters += 1;
    }
    return countTwoLetters * countThreeLetters;
}


function findCommonLettersOfCorrectBoxIDs(listOfCharArrays){
    for(let [i, arr1] of listOfCharArrays.entries()){
        for(let [j, arr2] of listOfCharArrays.entries()){
            if (i === j) continue;
            let common = commonLettersIfDiffByOne(arr1, arr2);
            if(common !== null) return common;
        }
    }
    return null;
}


function commonLettersIfDiffByOne(str, otherStr){
    let common = "";
    let diff = 0;
    for(let [c1, c2] of zip(str, otherStr)){
        if(c1 === c2) common += c1;
        else diff += 1;
        if(diff > 1) return null;
    }
    return common;
}


const fs = require('fs');
const array = fs.readFileSync('input/day2.txt').toString().split("\n").map(s => s.trim().split(""));
console.log(computeChecksum(array));
console.log(findCommonLettersOfCorrectBoxIDs(array));

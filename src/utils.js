import {readFileSync} from "fs";


export function read(filePath){
    return readFileSync(filePath).toString().trim();
}


export function readLines(filePath){
    return read(filePath).split("\n").map(s => s.trim());
}


export function zip(arr1, arr2){
    // See https://stackoverflow.com/questions/22015684/how-do-i-zip-two-arrays-in-javascript
    return arr1.map((x, i) => [x, arr2[i]]);
}


export function Counter(array) {
    array.forEach(val => this[val] = (this[val] || 0) + 1);
}


export function Points(){
    this.items = {};
    this.hasItem = (x, y) => (this.items[x] || {}).hasOwnProperty(y);
    this.setItem = (x, y, value) => {
        this.items[x] = (this.items[x] || {});
        this.items[x][y] = value;
    };
    this.numItems = () => Object.values(this.items).reduce((total, items) => total + Object.keys(items).length, 0);
}


export function sum(arr){
    return arr.reduce((_total, x) => _total + x, 0);
}

String.prototype.isUpper = function(){
    return this.toUpperCase() === this.toString();
};


String.prototype.isLower = function(){
    return this.toLowerCase() === this.toString();
};


String.prototype.equalsIgnoreCase = function(other){
    if(other === undefined) return false;
    return this.toLowerCase() === other.toLowerCase();
};


Array.prototype.removeDuplicates = function(){
    return this.filter((a, b) => this.indexOf(a) === b);
};

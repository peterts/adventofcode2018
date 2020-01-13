import {read} from "./utils.js";


const willReact = (a, b) => a.toLowerCase() === b.toLowerCase() && a.isLower() === b.isUpper();


function executeReactions(polymerStr, removeUnit){
    let polymerArr = polymerStr.split("").filter(unit => !unit.equalsIgnoreCase(removeUnit));
    let i = 0;
    while(i < (polymerArr.length-1)){
        if(willReact(polymerArr[i], polymerArr[i+1])){
            polymerArr.splice(i, 2);
            if(i > 0){
                i = i - 1;
            }
        }
        else{
            i += 1;
        }
    }
    return polymerArr.join("");
}


function findLengthOfShortestPolymerByRemovingUnit(polymer){
    const uniqueUnits = polymer.toLowerCase().split("").removeDuplicates();
    return uniqueUnits.reduce((shortest, unit) => {
        const polymerLength = executeReactions(polymer, unit).length;
        if(polymerLength < shortest){
            return polymerLength;
        }
        return shortest;
    }, 1e9);
}


function runOnInput(inputFileName){
    let inputValue = read(inputFileName);
    console.log("part1", executeReactions(inputValue).length);
    console.log("part2", findLengthOfShortestPolymerByRemovingUnit(inputValue));
}


runOnInput("../input/day5-1.txt");
runOnInput("../input/day5-2.txt");

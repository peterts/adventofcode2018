import {readLines, sum} from "./utils.js";


const recordPattern = /\[(\d{4}-\d{2}-\d{2} \d{2}:(\d{2}))] (.+)/;
const guardNumPattern = /#(\d+)/;


function parseRecord(recordStr){
    const recordPatternMatch = recordPattern.exec(recordStr);
    return {
        dt: recordPatternMatch[1],
        minute: parseInt(recordPatternMatch[2]),
        message: recordPatternMatch[3]
    };
}


function getSleepTimesPerGuard(parsedRecords){
    const sleepTimes = {};

    function addSleepTimes(startMin, endMin){
        for(let min = startMin; min < endMin; min++){
            sleepTimes[guardNumber] = sleepTimes[guardNumber] || {};
            sleepTimes[guardNumber][min] = (sleepTimes[guardNumber][min] || 0) + 1;
        }
    }

    let guardNumber = -1;
    let i = 0;

    while(i < parsedRecords.length){
        let record = parsedRecords[i];
        if(record.message.startsWith("Guard #")){
            guardNumber = guardNumPattern.exec(record.message)[1];
            i += 1;
        }
        else{
            addSleepTimes(record.minute, parsedRecords[i+1].minute);
            i += 2;
        }
    }

    return sleepTimes;
}


function keyOfHighestChildValueSum(obj){
    return Object.keys(obj).sort().reduce((max, key) => sumOfValues(obj[key]) > sumOfValues(obj[max]) ? key : max);
}


function keyOfHighestMaxChildValue(obj){
    return Object.keys(obj).sort().reduce((max, key) => maxOfValues(obj[key]) > maxOfValues(obj[max]) ? key : max);
}


function keyOfHighestValue(obj){
    return Object.keys(obj).sort().reduce((max, key) => obj[key] > obj[max] ? key : max);
}


function sumOfValues(obj){
    return sum(Object.values(obj));
}


function maxOfValues(obj){
    return Math.max(...Object.values(obj));
}


function runOnInput(inputFileName){
    let records = readLines(inputFileName);
    const recordsParsed = records.map(parseRecord).sort((a, b) => (a.dt > b.dt) ? 1 : -1);
    const sleepTimes = getSleepTimesPerGuard(recordsParsed);
    let guardMostAsleep = keyOfHighestChildValueSum(sleepTimes);
    let mostAsleepMinute = keyOfHighestValue(sleepTimes[guardMostAsleep]);
    console.log("part1", parseInt(guardMostAsleep) * parseInt(mostAsleepMinute));

    let guardMostAsleepAtSameMinute = keyOfHighestMaxChildValue(sleepTimes);
    mostAsleepMinute = keyOfHighestValue(sleepTimes[guardMostAsleepAtSameMinute]);
    console.log("part2", parseInt(guardMostAsleepAtSameMinute) * parseInt(mostAsleepMinute));
}


runOnInput("../input/day4-1.txt");
runOnInput("../input/day4-2.txt");

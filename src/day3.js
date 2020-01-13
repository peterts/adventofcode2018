import {readLines, Points} from "./utils.js";


const claimPattern = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;


function countOverlappingClaimsAndFindNonOverlapping(claims){
    const fabricFirstClaim = new Points();
    const duplicateFabric = new Points();
    const claimsWithNoOverlap = new Set();

    for(let claim of claims){
        claimsWithNoOverlap.add(claim.num);
        for(let x = claim.startX; x < claim.startX + claim.width; x++){
            for(let y = claim.startY; y < claim.startY + claim.height; y++){
                if(!fabricFirstClaim.hasItem(x, y)) fabricFirstClaim.setItem(x, y, claim.num);
                else{
                    if (!duplicateFabric.hasItem(x, y)) duplicateFabric.setItem(x, y, null);
                    claimsWithNoOverlap.delete(fabricFirstClaim.items[x][y]);
                    claimsWithNoOverlap.delete(claim.num);

                }
            }
        }
    }

    console.log({numOverlapping: duplicateFabric.numItems(), claimsWithNoOverlap});
}


function parseClaimStr(claimStr){
    const claimPatternMatch = claimPattern.exec(claimStr);
    return {
        num: parseInt(claimPatternMatch[1]),
        startX: parseInt(claimPatternMatch[2]),
        startY: parseInt(claimPatternMatch[3]),
        width: parseInt(claimPatternMatch[4]),
        height: parseInt(claimPatternMatch[5])
    }
}


function runOnInput(inputFileName){
    const claimStrs = readLines(inputFileName);
    return countOverlappingClaimsAndFindNonOverlapping(claimStrs.map(parseClaimStr));
}


runOnInput("../input/day3-1.txt");
runOnInput("../input/day3-2.txt");

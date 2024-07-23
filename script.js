let map = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
]
let mapSize = 16;
let mapLength = 4;
let mapHeigth = 4;
let index = 0;
let startingPoint = 0;
let stack = new Array(16);
let visited = new Array(16);
let currentPossibleMoves;
function calculatePossibleMoves(index) {
    if (map[index + 1] == 0 && (index + 1) % mapLength != 0) possibleMoves[0]++; //right
    if (map[index - 1] == 0 && index % mapLength != 0) possibleMoves[1]++; //left
    if (map[index + mapLength] == 0 && index + mapLength < mapSize) possibleMoves[2]++; //down
    if (map[index - mapLength] == 0 && index - mapLength >= 0) possibleMoves[3]++; //top
    return possibleMoves;
}
let rng;
for(i = 0; i < 16; i++){
    currentPossibleMoves = calculatePossibleMoves(index);
    if(currentPossibleMoves != 0){
        rng = Math.floor(Math.random() * currentPossibleMoves);
    }else{
        
    }
}

function init() {
    stack.push(startingPoint);
    visited.push(startingPoint);
}
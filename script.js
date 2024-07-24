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
    var possibleMoves = [0, 0, 0, 0];
    if (map[index + 1] == 0 && (index + 1) % mapLength != 0) {
        possibleMoves[0]++;
        //right
        //works
    }
    if (map[index - 1] == 0 && index % mapLength != 0) {
        possibleMoves[1]++;
        //left
        //works
    }
    if (map[index + mapLength] == 0 && index + mapLength < mapSize) {
        possibleMoves[2]++;
        //down
        //works
    }
    if (map[index - mapLength] == 0 && index >= mapLength) {
        possibleMoves[3]++;
        //top
        //works
    }
    return possibleMoves;
}
let rng;
for (i = 0; i < mapSize; i++) {
    currentPossibleMoves = calculatePossibleMoves(index);
    if (currentPossibleMoves != 0) {
        rng = Math.floor(Math.random() * (currentPossibleMoves[0] + currentPossibleMoves[1] + currentPossibleMoves[2] + currentPossibleMoves[3])) + 1;
        console.log(`${rng} is rng`);
        console.log(`${currentPossibleMoves[0] + currentPossibleMoves[1] + currentPossibleMoves[2] + currentPossibleMoves[3]} is all moves`);
        console.log(`${currentPossibleMoves} is all moves`);
        if (currentPossibleMoves[0] != 0) {
            if (rng - 1 == 0) {
                visited.push(index);
                stack.push(index);
                map[index] = 1;
                index++;
                console.log("right");
                rng = 0;
            }else{
                rng--;
            }
        }
        if (currentPossibleMoves[1] != 0) {
            if (rng - 1 == 0) {
                visited.push(index);
                stack.push(index);
                map[index] = 1;
                index--;
                console.log("left");
                rng = 0;
            }else{
                rng--;
            }
        }
        if (currentPossibleMoves[2] != 0) {
            if (rng - 1 == 0) {
                visited.push(index);
                stack.push(index);
                map[index] = 1;
                index += mapLength;
                console.log("down");
                rng = 0;
            }else{
                rng--;
            }
        }
        if (currentPossibleMoves[3] != 0) {
            if (rng - 1 == 0) {
                visited.push(index);
                stack.push(index);
                map[index] = 1;
                index -= mapLength;
                console.log("up");
                rng = 0;
            }else{
                rng--;
            }
        }
        console.log(index);
        console.log(map);
    } else {
        console.log("stuck");
        console.log(stack);
        console.log("---------------");
        console.log(visited);
        break;
    }
}
function init() {

}
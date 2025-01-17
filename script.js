const maze = document.getElementById("maze");
const ctx = maze.getContext("2d");
let mapLength = 4;
let mapHeight = 4;
let mapSize = mapLength * mapHeight;
let map = new Array(mapSize);
let wallWidth = 10;
let cellSize = 100;
let index = 0;
let indexBefore = 0;
let startingPoint = 0;
let stack = [];
let currentPossibleMoves;
let currentPossibleMovesAmount;
let currentCellX = 0;
let currentCellY = 0;
let x = 0;
let y = 0;
let rng;
let solution = []
// maze.style.width = "0";
// maze.style.height = "0";
document.body.style.height = "100vh";
document.body.style.width = "100vw";

//init();

async function init() {
    mapLength = parseInt(document.getElementById("Xsize").value);
    mapHeight = parseInt(document.getElementById("Ysize").value);
    if (isNaN(mapLength)) {
        mapLength = 4;
    }
    if (isNaN(mapHeight)) {
        mapHeight = 4;
    }
    mapSize = mapLength * mapHeight;
    map = new Array(mapSize);
    wallWidth = 10;
    cellSize = 100;
    index = 0;
    indexBefore = 0;
    startingPoint = 0;
    stack = [];
    currentCellX = 0;
    currentCellY = 0;
    x = 0;
    y = 0;
    maze.style.aspectRatio = `${mapLength / mapHeight}`;
    maze.style.width = "fit-content";
    maze.style.height = `${window.innerHeight * 0.95}px`;
    maze.style.padding = "10px 15px"
    document.getElementById("adjustments").padding = "35px 0 15px";
    document.getElementById("adjustments").style.height = "fit-content";
    document.body.style.height = "fit-content";
    solution = [];
    for (i = 0; i < mapSize; i++) {
        map[i] = 0;
    }
    map[0] = 1;
    maze.width = mapLength * cellSize + (mapLength + 1) * wallWidth;
    maze.height = mapHeight * cellSize + (mapHeight + 1) * wallWidth;
    ctx.clearRect(0, 0, maze.width, maze.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, maze.width, maze.height);
    ctx.translate(wallWidth, wallWidth);
    for (i = 0; i < mapHeight; i++) {
        for (j = 0; j < mapLength; j++) {
            currentCellX = j * (cellSize + wallWidth);
            currentCellY = i * (cellSize + wallWidth);
            ctx.fillStyle = "white";
            ctx.fillRect(currentCellX, currentCellY, cellSize, cellSize);
        }
    }
    await generateMaze();
    for (i = 1; i < solution.length; i++) {
        drawSolution(solution[i - 1], solution[i]);
    }
    ctx.translate(0, 0);
    ctx.fillStyle = "white";
    ctx.fillRect(-wallWidth, 0, wallWidth, cellSize);
    ctx.fillRect(maze.width - wallWidth * 2, maze.height - wallWidth * 2 - cellSize, wallWidth, cellSize);

}
function calculatePossibleMoves(index) {
    let possibleMoves = [0, 0, 0, 0];
    if (map[index + 1] == 0 && (index + 1) % mapLength != 0) {
        possibleMoves[0]++;
    }
    if (map[index - 1] == 0 && index % mapLength != 0) {
        possibleMoves[1]++;
    }
    if (map[index + mapLength] == 0 && index + mapLength < mapSize) {
        possibleMoves[2]++;
    }
    if (map[index - mapLength] == 0 && index >= mapLength) {
        possibleMoves[3]++;
    }
    return possibleMoves;
}

async function generateMaze() {
    for (i = 0; i < mapSize; i++) {
        currentPossibleMoves = calculatePossibleMoves(index);
        currentPossibleMovesAmount = currentPossibleMoves[0] + currentPossibleMoves[1] + currentPossibleMoves[2] + currentPossibleMoves[3];
        indexBefore = index;
        if (currentPossibleMovesAmount > 0) {
            rng = Math.floor(Math.random() * (currentPossibleMovesAmount)) + 1;
            if (currentPossibleMoves[0] != 0) {
                if (rng - 1 == 0) {
                    stack.push(index);
                    index++;
                    rng = 0;
                } else {
                    rng--;
                }
            }
            if (currentPossibleMoves[1] != 0) {
                if (rng - 1 == 0) {
                    stack.push(index);
                    index--;
                    rng = 0;
                } else {
                    rng--;
                }
            }
            if (currentPossibleMoves[2] != 0) {
                if (rng - 1 == 0) {
                    stack.push(index);
                    index += mapLength;
                    rng = 0;
                } else {
                    rng--;
                }
            }
            if (currentPossibleMoves[3] != 0) {
                if (rng - 1 == 0) {
                    stack.push(index);
                    index -= mapLength;
                    rng = 0;
                } else {
                    rng--;
                }
            }
            map[index] = 1;
        } else {
            if(index == map.length - 1){
                stack.push(index); 
                stack.forEach((s) => {
                    solution.push(s);
                })
            }
            for (l = 0; l < mapSize; l++) {
                index = stack.pop();
                currentPossibleMoves = calculatePossibleMoves(index);
                currentPossibleMovesAmount = currentPossibleMoves[0] + currentPossibleMoves[1] + currentPossibleMoves[2] + currentPossibleMoves[3];
                if (currentPossibleMovesAmount) {
                    l = mapSize;
                }
            }
            if (currentPossibleMoves[0] != 0) {
                stack.push(index);
                indexBefore = index;
                index++;
            }
            if (currentPossibleMoves[1] != 0) {
                stack.push(index);
                indexBefore = index;
                index--;
            }
            if (currentPossibleMoves[2] != 0) {
                stack.push(index);
                indexBefore = index;
                index += mapLength;
            }
            if (currentPossibleMoves[3] != 0) {
                stack.push(index);
                indexBefore = index;
                index -= mapLength;
            }
            map[index] = 1;
        }
        if (stack[stack.length - 1] == map.length - 1) {
            stack.forEach((s) => {
                solution.push(s);
            })
        }

        findWalls(index, indexBefore);
        await wait(10);
    }
}




function findWalls(a, b) {
    let x, y;
    x = Math.floor(a % mapLength);
    y = Math.floor(a / mapLength);
    ctx.fillStyle = "white";
    if (a - b == 1) {
        ctx.fillRect(x * cellSize + (x - 1) * wallWidth, y * cellSize + y * wallWidth, wallWidth, cellSize);
    }
    if (a - b == -1) {
        ctx.fillRect((x + 1) * cellSize + x * wallWidth, y * cellSize + y * wallWidth, wallWidth, cellSize);
    }
    if (a - b == mapLength) {
        ctx.fillRect(x * cellSize + x * wallWidth, y * cellSize + (y - 1) * wallWidth, cellSize, wallWidth);
    }
    if (a - b == -mapLength) {
        ctx.fillRect(x * cellSize + x * wallWidth, (y + 1) * cellSize + y * wallWidth, cellSize, wallWidth);
    }
}

function download() {
    let link = document.createElement('a');
    link.download = 'maze.png';
    link.href = maze.toDataURL()
    link.click();
}

function drawSolution(a, b) {
    x = Math.floor(a % mapLength);
    y = Math.floor(a / mapLength);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.moveTo((x + 0.5) * (cellSize + wallWidth) - 2.5, (y + 0.5) * (cellSize + wallWidth) - 5);
    x = Math.floor(b % mapLength);
    y = Math.floor(b / mapLength);
    ctx.lineTo((x + 0.5) * (cellSize + wallWidth) - 2.5, (y + 0.5) * (cellSize + wallWidth) - 5);
    ctx.stroke();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

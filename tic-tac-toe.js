
var board;
var playerO = "O";
var playerX = "X";

// Variable keeps track of the current player's turn. Starts with PlayerO
var currentPlayer = playerO;

// Variable determines if the game is over. Initially set to false
var gameOver = false;

// Function called when the window has finished loading
// Calls the setGame() function, setting up the game
window.onload = function() {
    setGame();
}

// Initializes the game board and creates the HTML elements for the Tic-Tac-Toe grid. 
function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    
    // Loops through the board array and creates a <div> for each cell. 
    // Cells: click calls the setTile() function.
    for (r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horiz-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertic-line");
            }
            tile.addEventListener("click", setTile)
            document.getElementById("board").append(tile);
        }
    }
}

// Called when a cell is clicked.
// Initially Checks if the game is over

function setTile() {
    
    if (gameOver) {
        return;
    }
    
    // Extracts the row and column coordinates from the cell's ID 

    let coords = this.id.split("-") // "1-1" --> ["1", "1"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Checks if the selected cell is already filled.    
    if (board[r][c] != " ") {
        return;
    }

    // Create an <img> element based on the current player
    let img = document.createElement("img");
    if (currentPlayer == playerO) {
        img.src = "./imagens/games/ttt-cow.png";
    } else {
        img.src = "./imagens/games/ttt-deer.png";
    }

    // Update the cell's content with the image
    this.innerHTML = "";
    this.appendChild(img);

    // Switch to the next player
    if (currentPlayer == playerO) {
        currentPlayer = playerX;
    } else {
        currentPlayer = playerO;
    }

    // Checks if there is a winner
    checkWinner();
}

// Function is called after each move to check if there is a winner. 
// Adds a "winner" class to the winning cells if a winner is found and sets the gameOver variable to true.
function checkWinner() {
    
    // Horizontal Check: checks for 3 cells in a row
    for(let r = 0; r < 3; r++){
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != " ") {
            for (let i = 0; i < 3; i++ ) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner")
            }
            gameOver = true;
            return;
        }
    }

    //Vertical Check: checks for 3 cells in a column
    for(let c = 0; c < 3; c++){
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != " ") {
            for (let i = 0; i < 3; i++ ) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner")
            }
            gameOver = true;
            return;
        }
    }

    //Diagonal Check: checks for 3 cells diagonally from left to right 
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != " ") {
        for (let i = 0; i < 3; i++ ) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner")
        }
        gameOver = true;
        return;
    }

    //Diagonal Check: checks for 3 cells diagonally from right to left
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != " ") {
        let tile = document.getElementById("0-2");
        tile.classList.add("winner")
        tile = document.getElementById("1-1");
        tile.classList.add("winner")
        tile = document.getElementById("2-0");
        tile.classList.add("winner")

        gameOver = true;
        return;
    }
}
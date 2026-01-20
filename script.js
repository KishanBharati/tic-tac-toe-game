// Select all cells
const cells = document.querySelectorAll(".cell");

// Select status text
const statusText = document.getElementById("status");

// Select reset button
const resetBtn = document.getElementById("reset");

// Current player
let currentPlayer = "X";

// Game active flag
let gameActive = true;

// Store game state
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Handle cell click
function handleCellClick() {
    const index = this.getAttribute("data-index");

    // Prevent overwrite or play after game end
    if (gameState[index] !== "" || !gameActive) return;

    // Update game state
    gameState[index] = currentPlayer;
    this.textContent = currentPlayer;

    // Check result
    checkResult();
}

// Check win or tie
function checkResult() {
    let roundWon = false;

    // Loop through win conditions
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            roundWon = true;
            break;
        }
    }

    // If win
    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // If tie
    if (!gameState.includes("")) {
        statusText.textContent = "It's a Tie!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game
function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "Player X's Turn";

    // Clear UI
    cells.forEach(cell => cell.textContent = "");
}

// Add click events
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);

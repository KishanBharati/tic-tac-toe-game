// Select all cells
const cells = document.querySelectorAll(".cell");

// Select status text
const statusText = document.getElementById("status");

// Select reset button
const resetBtn = document.getElementById("reset");

// Store current player (X or O)
let currentPlayer = "X";

// Flag to control game state
let gameActive = true;

// Array to store board values
let gameState = ["", "", "", "", "", "", "", "", ""];

// All possible winning combinations
const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],   // Rows
    [0,3,6], [1,4,7], [2,5,8],   // Columns
    [0,4,8], [2,4,6]             // Diagonals
];

// Function runs when a cell is clicked
function handleCellClick() {

    // Get index from clicked cell
    const index = this.dataset.index;

    // Stop if cell already filled or game over
    if (gameState[index] !== "" || !gameActive) return;

    // Store player move in array
    gameState[index] = currentPlayer;

    // Display player symbol on UI
    this.textContent = currentPlayer;

    // Check for win or tie
    checkResult();
}

// Function to check game result
function checkResult() {

    // Loop through all winning patterns
    for (let condition of winningConditions) {

        // Destructure positions
        const [a, b, c] = condition;

        // Check if same symbol exists in pattern
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            // Highlight winning cells
            highlightWinner(condition);

            // Show win message
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

            // Stop the game
            gameActive = false;
            return;
        }
    }

    // Check tie (no empty cell)
    if (!gameState.includes("")) {
        statusText.textContent = "🤝 It's a Tie!";
        gameActive = false;
        return;
    }

    // Switch player turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Highlight winning cells
function highlightWinner(combo) {
    combo.forEach(index => {
        cells[index].classList.add("winner");
    });
}

// Reset game to initial state
function resetGame() {

    currentPlayer = "X";
    gameActive = true;
    gameState.fill("");

    statusText.textContent = "Player X's Turn";

    // Clear board UI
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });
}

// Add click event to each cell
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Add click event to reset button
resetBtn.addEventListener("click", resetGame);

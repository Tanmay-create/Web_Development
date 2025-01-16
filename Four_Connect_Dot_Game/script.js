document.addEventListener("DOMContentLoaded", () => {
  const rows = 6;  // Number of rows in Connect Four
  const cols = 7;  // Number of columns in Connect Four
  const board = Array.from({ length: rows }, () => Array(cols).fill(null)); // Initialize the board as a 2D array with nulls
  let currentPlayer = 'player1'; // Tracks current player, 'player1' starts first
  let gameActive = true; // Game state variable to track if the game is active

  // Accessing DOM elements for game board, status display, and reset button
  const gameBoard = document.getElementById("game-board");
  const statusDisplay = document.getElementById("game-status");
  const resetButton = document.getElementById("reset-button");

  // Initialize the game board UI and attach event listeners
  function initializeBoard() {
    gameBoard.innerHTML = ""; // Clear any previous board cells
    board.forEach((row, rowIndex) => { // Loop through rows
      row.forEach((_, colIndex) => { // Loop through columns
        const cell = document.createElement("div"); // Create a cell element
        cell.classList.add("cell"); // Assign 'cell' class for styling
        cell.dataset.row = rowIndex; // Set row data attribute
        cell.dataset.col = colIndex; // Set column data attribute
        cell.addEventListener("click", handleCellClick); // Add click event listener
        gameBoard.appendChild(cell); // Append cell to game board
      });
    });
    updateStatus(); // Update initial status message
  }

  // Handle cell click event to drop a piece in the selected column
  function handleCellClick(event) {
    if (!gameActive) return; // Ignore clicks if game is over

    const col = parseInt(event.target.dataset.col); // Get column of clicked cell
    const row = getAvailableRow(col); // Find lowest available row in the column

    if (row !== null) {
      board[row][col] = currentPlayer; // Set cell in the board array to current player
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer); // Update cell color based on player

      if (checkWin(row, col)) { // Check if current move wins the game
        statusDisplay.textContent = `${currentPlayer === 'player1' ? 'Red' : 'Blue'} Wins!`; // Display win message
        gameActive = false; // End game
      } else if (isBoardFull()) { // Check for draw
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false; // End game
      } else {
        switchPlayer(); // Switch to the next player
        updateStatus(); // Update status message
      }
    }
  }

  // Find the lowest available row in the selected column
  function getAvailableRow(col) {
    for (let row = rows - 1; row >= 0; row--) { // Start from the bottom row
      if (!board[row][col]) return row; // Return row if it's empty
    }
    return null; // Return null if column is full
  }

  // Check if a move results in a win
  function checkWin(row, col) {
    return (
      checkDirection(row, col, 1, 0) || // Horizontal check
      checkDirection(row, col, 0, 1) || // Vertical check
      checkDirection(row, col, 1, 1) || // Diagonal down-right
      checkDirection(row, col, 1, -1)   // Diagonal up-right
    );
  }

  // Check four in a row in a specific direction
  function checkDirection(row, col, rowDelta, colDelta) {
    let count = 1;
    count += countInDirection(row, col, rowDelta, colDelta); // Count forward direction
    count += countInDirection(row, col, -rowDelta, -colDelta); // Count backward direction
    return count >= 4; // True if four or more in a row
  }

  // Count consecutive pieces in a specific direction
  function countInDirection(row, col, rowDelta, colDelta) {
    let count = 0;
    let currentRow = row + rowDelta;
    let currentCol = col + colDelta;
    while (
      currentRow >= 0 &&
      currentRow < rows &&
      currentCol >= 0 &&
      currentCol < cols &&
      board[currentRow][currentCol] === currentPlayer
    ) {
      count++;
      currentRow += rowDelta;
      currentCol += colDelta;
    }
    return count;
  }

  // Check if the board is full
  function isBoardFull() {
    return board.every(row => row.every(cell => cell !== null)); // True if all cells are filled
  }

  // Switch to the other player
  function switchPlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
  }

  // Update the game status message
  function updateStatus() {
    statusDisplay.textContent = `${currentPlayer === 'player1' ? 'Red' : 'Blue'}'s Turn`;
  }

  // Reset game to initial state
  function resetGame() {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        board[row][col] = null;
      }
    }
    currentPlayer = 'player1';
    gameActive = true;
    initializeBoard();
  }

  // Attach reset button event listener
  resetButton.addEventListener("click", resetGame);

  // Initialize board on page load
  initializeBoard();
});

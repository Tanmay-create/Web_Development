// Selecting the display and buttons for interactivity
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variable to keep track of the current input
let currentInput = '';
let history = []; // Array to store calculation history

// Adding event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        // If the button is a number or operator, append to the current input
        if (value) {
            currentInput += value;
            display.value = currentInput; // Update display with the current input
        }

        // If the clear button is pressed
        if (button.classList.contains('clear')) {
            currentInput = ''; // Reset input
            display.value = ''; // Clear display
        }

        // If the delete button is pressed
        if (button.classList.contains('delete')) {
            currentInput = currentInput.slice(0, -1); // Remove last character
            display.value = currentInput; // Update display
        }

        // If the equal button is pressed
        if (button.classList.contains('equal')) {
            try {
                // Evaluate the expression safely
                const result = eval(currentInput);
                // Store the calculation in history
                if (currentInput) {
                    addHistory(`${currentInput} = ${result}`);
                }
                currentInput = result.toString(); // Update current input to result
                display.value = currentInput; // Display result
            } catch (error) {
                display.value = 'Error'; // Display error on invalid calculation
                currentInput = ''; // Reset input
            }
        }

        // If the history button is pressed
        if (button.classList.contains('history-btn')) {
            display.value = history.length ? history.join(', ') : 'No History'; // Show history or no history message
        }
    });
});

/**
 * Function to add a calculation to the history
 * @param {string} calculation - The calculation string to add
 */
function addHistory(calculation) {
    history.push(calculation); // Add calculation to history array

    // Limit history to 10 items for simplicity
    if (history.length > 10) {
        history.shift(); // Remove the oldest entry if history exceeds 10 items
    }
}

// Global variables
let currentGridSize = 16;
let isDrawing = false;

// DOM elements
const sketchArea = document.getElementById('sketch-area');
const gridSizeSlider = document.getElementById('grid-size');
const gridValueDisplay = document.getElementById('grid-value');
const createGridButton = document.getElementById('create-grid');
const clearButton = document.getElementById('clear');

// Create grid function
function createGrid(size) {
    // Clear existing grid
    sketchArea.innerHTML = '';
    
    // Set CSS grid properties
    sketchArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    // Create grid squares
    const totalSquares = size * size;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        
        // Add hover effect for drawing
        square.addEventListener('mousedown', startDrawing);
        square.addEventListener('mouseenter', draw);
        square.addEventListener('mouseup', stopDrawing);
        
        sketchArea.appendChild(square);
    }
    
    currentGridSize = size;
}

// Drawing functions
function startDrawing(e) {
    isDrawing = true;
    e.target.style.backgroundColor = '#333';
}

function draw(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = '#333';
    }
}

function stopDrawing() {
    isDrawing = false;
}

// Prevent dragging
document.addEventListener('dragstart', (e) => e.preventDefault());

// Clear function
function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = '#fff';
    });
}

// Update grid size display
function updateGridDisplay() {
    const size = gridSizeSlider.value;
    gridValueDisplay.textContent = `${size}x${size}`;
}

// Event listeners
gridSizeSlider.addEventListener('input', updateGridDisplay);

createGridButton.addEventListener('click', () => {
    const size = parseInt(gridSizeSlider.value);
    createGrid(size);
});

clearButton.addEventListener('click', clearGrid);

// Global mouse events for drawing
document.addEventListener('mouseup', stopDrawing);

// Initialize with default grid
document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
    updateGridDisplay();
});

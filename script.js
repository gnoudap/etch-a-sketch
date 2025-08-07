let currentGridSize = 16;
let isDrawing = false;

const sketchArea = document.getElementById('sketch-area');
const gridSizeSlider = document.getElementById('grid-size');
const gridValueDisplay = document.getElementById('grid-value');
const createGridButton = document.getElementById('create-grid');
const clearButton = document.getElementById('clear');

function createGrid(size) {
    sketchArea.innerHTML = '';
    
    sketchArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketchArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    const totalSquares = size * size;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        
        square.addEventListener('mousedown', startDrawing);
        square.addEventListener('mouseenter', draw);
        square.addEventListener('mouseup', stopDrawing);
        
        sketchArea.appendChild(square);
    }
    
    currentGridSize = size;
}

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

document.addEventListener('dragstart', (e) => e.preventDefault());

function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = '#fff';
    });
}

function updateGridDisplay() {
    const size = gridSizeSlider.value;
    gridValueDisplay.textContent = `${size}x${size}`;
}

gridSizeSlider.addEventListener('input', updateGridDisplay);

createGridButton.addEventListener('click', () => {
    const size = parseInt(gridSizeSlider.value);
    createGrid(size);
});

clearButton.addEventListener('click', clearGrid);

document.addEventListener('mouseup', stopDrawing);

document.addEventListener('DOMContentLoaded', () => {
    createGrid(16);
    updateGridDisplay();
});

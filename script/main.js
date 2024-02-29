// Declare variables at the top
let theButtons = document.querySelectorAll("#buttonHolder img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    dropZones = document.querySelectorAll('.drop-zone'),
    draggedPiece;

// Function to change background image and puzzle pieces
function changeBGImage() {
    // Bug fix #2: 
    resetPuzzlePieces();

    // Set the background image based on the selected puzzle
    puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;

    
    let puzzlePiecesSrc = [
        "topLeft", "topRight", "bottomLeft", "bottomRight"
    ];
    puzzlePieces.forEach((piece, index) => {
        piece.src = `images/${puzzlePiecesSrc[index]}${this.id}.jpg`;
    });
}

// Function to handle drag start event
function handleStartDrag() {
    console.log('started dragging this piece:', this);

    
    draggedPiece = this;
}

// Function to handle drag over event
function handleDragOver(e) {
    e.preventDefault(); 
    console.log('dragged over me');
}

// Function to handle drop event
function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');

    // Bug fix #1: 
    if (this.children.length === 0) {
        this.appendChild(draggedPiece);
        draggedPiece.classList.add('dropped');
    } else {
        console.log("Can't drop here - already a piece");
    }
}

// Function to reset puzzle pieces
function resetPuzzlePieces() {

    dropZones.forEach(zone => {
        if (zone.firstChild) {
            const puzzlePieces = Array.from(zone.children);
            puzzlePieces.forEach(piece => {
                document.querySelector('.puzzle-pieces').appendChild(piece);
            });
        } else {
        
        }
    });
}

// Event handling
theButtons.forEach(button => button.addEventListener("click", changeBGImage));
puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
dropZones.forEach(zone => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);
});


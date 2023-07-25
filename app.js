const gameBoard = document.querySelector('#gameboard');
const info = document.querySelector('#info');
const replay = document.querySelector('#replay')
const startCells = [
    "","","","","","","","","",
 ];
let go = "circle";
info.textContent = "circle go first"

function createBoard(){
    startCells.forEach((_cell,index) => {
       const cellElement = document.createElement('div');
       cellElement.classList.add('square');
       cellElement.id = index;
       cellElement.addEventListener('click', addGo)
       gameBoard.append(cellElement);
    })
 }

 createBoard();

 function addGo(event){
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go)
    event.target.append(goDisplay)
    go = go === "circle"? "cross":"circle";
    info.textContent = "it is now " + go + "'s go";
    event.target.removeEventListener("click",addGo);
    checkScore();
}

function checkScore(){
    const allSquares =document.querySelectorAll(".square");
   
    const winningCombo = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]

    winningCombo.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))

        if (circleWins){
            info.textContent = "Circle Wins!!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        } 
    })

    winningCombo.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))

        if (crossWins){
            info.textContent = "Cross Wins!!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

}

function resetGame() {
    // Reinicia las celdas del tablero
    startCells.forEach((_cell, index) => {
        const cellElement = document.getElementById(index.toString());
        cellElement.innerHTML = '';
        cellElement.addEventListener('click', addGo);
    });

    // Reinicia la variable de turno y el texto de información
    go = 'circle';
    info.textContent = 'circle go first';
}
replay.addEventListener('click', resetGame);

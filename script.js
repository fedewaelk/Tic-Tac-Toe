const gameModule = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const renderBoard = () => {
        const board = document.getElementById("gameBoard");
        board.innerHTML = "";

        gameBoard.forEach((mark, index) => {
            const box = document.createElement("div");
            box.classList.add("box");
            if (mark) box.classList.add("taken");
            box.textContent = mark;
            box.addEventListener("click", () => console.log(`Clic on box ${index}`));
            board.appendChild(box);
        });
    };

    const updateBox = (index, mark) => {
        if (gameBoard[index] === "") {
            gameBoard[index] = mark;
            renderBoard();
        }
    };

    const getBoard = () => gameBoard;

    return { renderBoard, updateBox, getBoard };
})();

document.addEventListener("DOMContentLoaded", () => {
    gameModule.renderBoard();
  });
  

  const GameController = () => {
    let currentPlayer = "x";
    let players = {x: "player 1", O: "player 2"};
    let gameOn = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const checkWinner = () => {
        const board = gameModule.getBoard();
        const winLines = [
            []
        ]
    }
  }
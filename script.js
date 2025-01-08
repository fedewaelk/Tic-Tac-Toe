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
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (line of winLines) {
            const [a, b ,c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes("") ? null : "Tie"
    };

    const makeMove = (index) => {
        if (!gameOn) return;
        if (gameModule.getBoard()[index]) return;
        
        gameModule.updateBox(index, currentPlayer);
        const winner = checkWinner();
        if (winner) {
            endGame(winner);
        } else {
            switchPlayer();
        }
    };

    const startGame = () => {
        const player1Name = document.getElementById("player1").value || "Player 1";
        const player2Name = document.getElementById("player2").value || "Player 2";
    
        players = { X: player1Name, O: player2Name };
        currentPlayer = 'X';
        gameOn = true;
        gameModule.resetBoard();
        document.getElementById('result').value = `${players[currentPlayer]}'s Turn`;
      };
  }
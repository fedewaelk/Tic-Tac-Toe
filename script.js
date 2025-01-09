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
            box.addEventListener("click", () => gameController.makeMove(index));
            board.appendChild(box);
        });
    };

    const updateBox = (index, mark) => {
        if (gameBoard[index] === "") {
            gameBoard[index] = mark;
            const box = document.querySelectorAll(".box")[index];
            box.textContent = mark;
            box.classList.add(mark);
            
        }
    };    

    const resetBoard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
    };

    const getBoard = () => gameBoard;

    return { renderBoard, updateBox, resetBoard, getBoard };
})();

const GameController = () => {
    let currentPlayer = "X";
    let players = { X: "Player 1", O: "Player 2" };
    let gameOn = false;
    let wins = { X: 0, O: 0 };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("gameStatus").value = `${players[currentPlayer]}'s Turn`;
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

        for (const line of winLines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes("") ? null : "tie";
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
        currentPlayer = "X";
        gameOn = true;
        gameModule.resetBoard();

        document.getElementById("player1Label").textContent = `${player1Name}:`;
        document.getElementById("player2Label").textContent = `${player2Name}:`;

        document.getElementById("playerInputs").classList.add("hidden");
        document.getElementById("gameBoard").classList.remove("hidden");
        document.getElementById("results").classList.remove("hidden");

        document.getElementById("gameStatus").value = `${players[currentPlayer]}'s Turn`;
    };

    const endGame = (winner) => {
        gameOn = false;
        const gameStatus = document.getElementById("gameStatus");
        if (winner === "tie") {
            gameStatus.value = "¡It's a Tie!";
        } else {
            wins[winner]++;
            document.getElementById(`${winner === "X" ? "player1Wins" : "player2Wins"}`).value = wins[winner];
            gameStatus.value = `¡${players[winner]} wins!`;
        }
    };

    return { makeMove, startGame };
};

const gameController = GameController();

document.getElementById("startBtn").addEventListener("click", gameController.startGame);


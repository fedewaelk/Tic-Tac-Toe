const GameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const renderBoard = () => {
        const board = document.getElementById("gameBoard");
        gameBoard.forEach((mark, index) => {
            const box = document.createElement("div");
            box.classList.add("box");
        })
    }
})();
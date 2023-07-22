const Gameboard = (() => {
  let board = ['', '', '',
               '', '', '',
               '', '', ''];
  const getBoard = () => board;
  return {getBoard};
})();

const Player = (name, mark) => {
  return {name, mark};
};

const GameController = (() => {
  const board = Gameboard.getBoard();
  
  const player1 = Player("Player X", "x");
  const player2 = Player("Player O", "o");
  
  let GameActive = true;
  const getGameActive = () => GameActive;

  const restartGameActive = () => {
    GameActive ? GameActive = true : GameActive = true;
  }
  
  let currentPlayer = player1;
  const getCurrentPlayer = () => currentPlayer;
  
  const switchPlayer = () => {
    if (currentPlayer === player1) {
       currentPlayer = player2;
    } else {
       currentPlayer = player1;
    }
  }

  const checkGameOver = () => {
    switchPlayer()
    if (
      board[0] !== '' && board[0] === board[3] && board[3] === board[6]
       || board[1] !== '' &&  board[1] === board[4] && board[4] === board[7]
       || board[2] !== '' &&  board[2] === board[5] && board[5] === board[8]
       || board[0] !== '' && board[0] === board[1] && board[1] === board[2]
       || board[3] !== '' &&  board[3] === board[4] && board[4] === board[5]
       || board[6] !== '' && board[6] === board[7] && board[7] === board[8]
       || board[0] !== '' && board[0] === board[4] && board[4] === board[8]
       || board[2] !== '' && board[2] === board[4] && board[4] === board[6]) {
      GameActive = false;
      return "win";
     }if(!board.includes('')) {
      return "tie";
     }
  };
  
  return {getGameActive, restartGameActive, getCurrentPlayer,  switchPlayer, checkGameOver};
})();

const DisplayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const msg = document.querySelector('.msg');
  const restartButton = document.querySelector('.restart');
  
  const getCells = () => cells;
  const board = Gameboard.getBoard();
  const GameActive = () => GameController.getGameActive();
  const restartGameActive = () => GameController.restartGameActive();
  const currentPlayer = () => GameController.getCurrentPlayer();
  const switchPlayer = () => GameController.switchPlayer();
  const checkGameOver = () => GameController.checkGameOver();

  const gameStateMessage = () => {
    if (checkGameOver() === "win") {
      msg.textContent = `${currentPlayer().name}' has won!`;
    }else if (checkGameOver() === "tie") {
      msg.textContent = `It's tie!`;
    }else {
      msg.textContent = `${currentPlayer().name}'s turn`;
    }
  }

  function handleCellClick() {
    const index = Array.from(cells).indexOf(this);
      if (cells[index].textContent === ""
        && GameActive()) {
        cells[index].textContent = currentPlayer().mark;
        board[index] = currentPlayer().mark;
        checkGameOver();
        gameStateMessage();
      }
  };
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));

  const restartGame = () => {
    msg.textContent = `Player X's turn`;
    for (let i = 0; i <= 8; i++) {
      board[i] = '';
      cells[i].textContent = '';
    }
    restartGameActive();
    if(currentPlayer().mark === "o"){
      switchPlayer()
    }
  }
  restartButton.addEventListener('click', restartGame)
})();
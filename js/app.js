let board;
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const Xscore = document.getElementById("Xscore");
const Tiescore = document.getElementById("Tiescore");
const Oscore = document.getElementById("Oscore");
let startturn = "X";
let turn;
let win;
let mode = "Two Players";
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let Xwins = 0;
let Owins = 0;
let Ties = 0;

window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("start-turn").onclick = toggleTurn;
document.getElementById("player-toggle").onclick = toggleMode;

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = startturn;
  win = null;
  render();
}

function toggleTurn(){
  startturn = startturn === "X" ? "O" : "X";
  document.getElementById("start-turn").textContent = startturn + " starts";
  init();
  if(startturn == "O"){
    takeTurn(0);
  }
}

function toggleMode(){
  mode = mode === "Two Players" ? " One Player" : "Two Players";
  document.getElementById("player-toggle").textContent = mode;
  init();
  if(startturn == "O"){
    takeTurn(0);
  }
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;

  Xscore.textContent = Xwins;
  Tiescore.textContent = Ties;
  Oscore.textContent = Owins;
}

function takeTurn(e) {
  let index = 1;
  if (!win) {
    if(mode == "Two Players" || turn == "X"){
      index = squares.findIndex(function(square) {
        return square === e.target;
      });
    }
    else{
      index = computerTurn();
    }

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      if(win == "X"){
        Xwins++;
      }
      else if(win == "O"){
        Owins++;
      }
      else if(win == "T"){
        Ties++;
      }

      render();
      if(mode == "One Player" && turn == "O"){
        takeTurn(0);
      }
    }

  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

function computerTurn(){
  /*
  let index = 0;
  for(let i = 0; i < winningConditions.length; i++){
    let count = 0;
    let count2 = 0;
    for(let j = 0; j < winningConditions[i].length; j++){
      if(board[j] == "O"){
        count++;
      }
      else if(board[j] == "X"){
        count2++;
      }
      if(count == 2){
        for(let k = 0; k < winningConditions[i].length; k++){
          if(board[k] == ""){
            return k;
          }
        }
      }
      if(othercount == 2){
        for(let k = 0; k < winningConditions[i].length; k++){
          if(board[k] == ""){
            return k;
          }
        }
      }
    }
  }
  if(board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ]){
    index = 0;
  }
  */
  for(let k = 0; k < 9; k++){
    if(board[k]==""){
      return k;
    }
  }
}

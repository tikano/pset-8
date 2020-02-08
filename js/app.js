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
  mode = mode === "Two Players" ? "One Player" : "Two Players";
  //document.getElementById("player-toggle").textContent = mode;
  if(mode == "Two Players"){
	document.getElementById("player-toggle").textContent = "One Player";
  }
  else{
	document.getElementById("player-toggle").textContent = "Two Players";
  }
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
  
  let index = 0;
  for(let i = 0; i < winningConditions.length; i++){
    let count = 0;
    for(let j = 0; j < winningConditions[i].length; j++){
      if(board[winningConditions[i][j]] == "O"){
        count++;
      }
      if(count == 2){
        for(let k = 0; k < winningConditions[i].length; k++){
          if(board[winningConditions[i][k]] == ""){
            return winningConditions[i][k];
          }
        }
      }
    }
  }
  for(let i = 0; i < winningConditions.length; i++){
    let count2 = 0;
	for(let j = 0; j < winningConditions[i].length; j++){
      if(board[winningConditions[i][j]] == "X"){
        count2++;
      }
      if(count2 == 2){
        for(let k = 0; k < winningConditions[i].length; k++){
          if(board[winningConditions[i][k]] == ""){
            return winningConditions[i][k];
          }
        }
      }
    }
  }
  
  let xcount = 0;
  let ocount = 0;
  let position = 0;
  for(let k=0; k<9; k++){
	  if(board[k] == "X"){
		  xcount++;
		  position = k;
	  }
  }
  if(xcount == 1 && position % 2 == 1){
	  return 4;
  }
  if(xcount == 1 && position == 4){
	  return 8;
  }
  if(xcount == 2 && board[0] == "O" && board[4] == "O" && position == 8){
	  if(board[3] == "X"){
		  return 2;
	  }
	  else{
		  return 6;
	  }
  }
  if(board == [
    "", "", "",
    "", "", "",
    "", "", ""
  ]){
    return 0;
  }
  for(let i = 0; i<9;i++){
	  if(i%2==0 && board[i] == "" && i != 4){
		  return i;
	  }
  }
}

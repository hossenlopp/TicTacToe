/**
 * @authors Chris Hossenlopp <hossenlopp@mitre.org>
 * @date 3/23/2015
 */

var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

var turn = 'MA';
var gameStatus = 'playing';
var MAWins = 0;
var VAWins = 0;


$(document).ready(function () {
  $(".cell").click(function (evt) {
    var cellID = $(this).attr('id');
    var row = cellID[5];
    var col = cellID[7];
    handleCellClick(row, col);
  });

  $('#new-game').click(handleNewGameClick);
});


function checkForWin(nowinCB) {
  // check rows
  for (var row = 0; row < 3; row++) {
    if (board[row][0] !== '') {
      if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        handleWin(board[row][0], 'row', row);
        return;
      }
    }
  }

  // check cols
  for (var col = 0; col < 3; col++) {
    if (board[0][col] !== '') {
      if (board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
        handleWin(board[0][col], 'col', col);
        return;
      }
    }
  }

  // check diagonal top left to bottom right
  if (board[0][0] !== '') {
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      handleWin(board[0][0]);
      return;
    }
  }

  // check diagonal bottom left to top right
  if (board[2][0] !== '') {
    if (board[2][0] === board[1][1] && board[2][0] === board[0][2]) {
      handleWin(board[2][0]);
      return;
    }
  }
  nowinCB();
}

function handleWin(player) {
  if (player === 'MA') {
    $('.status').text('Massachusetts Wins!!!');
    MAWins++;
    $('#player-1').text(MAWins.toString());
  } else if (player === 'VA') {
    $('.status').text('Virgina Wins!!!');
    VAWins++;
    $('#player-2').text(VAWins.toString());
  }
  gameStatus = 'ended';
}


function handleNewGameClick() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  $(".cell").empty();
  turn = 'MA';
  $('.status').text("Massachusetts' Turn!");
  gameStatus = 'playing';
}

function handleCellClick(row, col) {
  if (gameStatus === 'playing') {
    if(board[row][col] === '') {
      board[row][col] = turn;
      $('#cell-' + row + '-' + col).append($('<img src="' + turn + '.svg.png"/>'));

      checkForWin(function () {
        if (turn === 'MA') {
          turn = 'VA';
          $('.status').text("Virginia's Turn!");
        } else {
          turn = 'MA';
          $('.status').text("Massachusetts' Turn!");
        }
      });
    } else {

    }
  }
}
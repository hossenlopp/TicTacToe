/**
 * @authors Chris Hossenlopp <hossenlopp@mitre.org>
 * @date 3/23/2015
 */

var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

var turn = (Math.random() > 0.5) ? 'P1' : 'P2';
var turnCount = 0;
var gameStatus = 'playing';
var P1Wins = 0;
var P1Losses = 0;
var P2Wins = 0;
var P2Losses = 0;
var ties = 0;

var images = {
  'P1': 'MA.svg.png',
  'P2': 'VA.svg.png'
};

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;

  $('#player-1-image, #player-2-image').click(function () {
    var playerNumber = $(this).attr('id')[7];

    navigator.camera.getPicture(function(imageData) {
      $('#player-'+playerNumber+'-image').attr('src', imageData);
      images['P'+playerNumber] = imageData;
      updateImages();
    }, function (err) {

    }, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
  });
}

function updateImages() {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      $('#cell-'+row+'-'+col + ' img').attr('src', images[board[row][col]]);
    }
  }
}


$(document).ready(function () {
  loadLocalStorage(function() {
    if (turn === 'P1') {
      $('.status').text("Player 1's Turn!");
    } else {
      $('.status').text("Player 2's Turn!");
    }

    $(".cell").click(function (evt) {
      var cellID = $(this).attr('id');
      var row = cellID[5];
      var col = cellID[7];
      handleCellClick(row, col);
    });

    $('#new-game').click(handleNewGameClick);

  });
});

function loadLocalStorage(cb) {
  P1Wins = window.localStorage.getItem('player1.wins') || 0;
  P2Wins = window.localStorage.getItem('player2.wins') || 0;
  images['P1'] = window.localStorage.getItem('player1.image') || 'MA.svg.png';
  $('#player-1-image').attr('src', images['P1']);
  images['P2'] = window.localStorage.getItem('player2.image') || 'VA.svg.png';
  $('#player-2-image').attr('src', images['P2']);
  ties = window.localStorage.getItem('ties') || 0;
  $('#player-1').text(P1Wins.toString());
  $('#player-2').text(P2Wins.toString());
  if(cb) cb();
}

function storeLocalStorage() {
  window.localStorage.setItem('player1.wins', P1Wins);
  window.localStorage.setItem('player2.wins', P2Wins);
  window.localStorage.setItem('player1.image', images['P1']);
  window.localStorage.setItem('player2.image', images['P2']);
  window.localStorage.setItem('ties', ties);
  console.log('local storage stored');
}


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

  if (player === 'P1') {
    $('.status').text('Player 1 Wins!!!');
    P1Wins++;
    $('#player-1').text(P1Wins.toString());
  } else if (player === 'P2') {
    $('.status').text('Player 2 Wins!!!');
    P2Wins++;
    $('#player-2').text(P2Wins.toString());
  }
  gameStatus = 'ended';
  if (navigator.notification) {
    navigator.notification.vibrate(500);
  }
  storeLocalStorage();
}

function handleTie() {
  $('.status').text('Game Tied!!');
  gameStatus = 'ended';
  if (navigator.notification) {
    navigator.notification.vibrate(1000);
  }
  ties++;
  storeLocalStorage();
}


function handleNewGameClick() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  $(".cell").empty();
  turn = (Math.random() > 0.5) ? 'P1' : 'P2';
  turnCount = 0;
  if (turn === 'P1') {
    $('.status').text("Player 1's Turn!");
  } else {
    $('.status').text("Player 2's Turn!")
  }
  gameStatus = 'playing';

}

function handleCellClick(row, col) {
  if (gameStatus === 'playing') {
    if(board[row][col] === '') {
      board[row][col] = turn;
      $('#cell-' + row + '-' + col).append($('<img src="' + images[turn] + '"/>'));

      checkForWin(function () {
        if (turn === 'P1') {
          turn = 'P2';
          $('.status').text("Player 2's Turn!");
        } else {
          turn = 'P1';
          $('.status').text("Player 1's Turn!");
        }
        turnCount++;
        if (turnCount === 9) {
          handleTie();
        }
      });


    } else {

    }
  }
}
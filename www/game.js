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


$(document).ready(function () {
  $(".cell").click(function (evt) {
    var cellID = $(this).attr('id');
    var row = cellID[5];
    var col = cellID[7];
    handleCellClick(row, col);
  });
});


function handleCellClick(row, col) {
  if (gameStatus === 'playing') {
    if(board[row][col] === '') {
      board[row][col] = turn;
      $('#cell-' + row + '-' + col).append($('<img src="' + turn + '.svg"/>'));

      if(turn === 'MA') {
        turn = 'VA';
        $('.status').text("Virginia's Turn!");
      } else {
        turn = 'MA';
        $('.status').text("Massachusetts' Turn!");
      }
    } else {

    }
  }
}
/**
 * @authors Chris Hossenlopp <hossenlopp@mitre.org>
 * @date 3/24/2015
 */

$(document).ready(function () {
  loadLocalStorage();

  $('#clear-data').click(clearLocalStorage);
  $('#back-btn').click(function () {
    window.location.assign('index.html');
  });
});

function loadLocalStorage() {
  var P1Wins = window.localStorage.getItem('player1.wins') || 0;
  var P2Wins = window.localStorage.getItem('player2.wins') || 0;
  var P1Image = window.localStorage.getItem('player1.image') || 'MA.svg.png';
  $('#player-1-image').attr('src', P1Image);
  var P2Image = window.localStorage.getItem('player2.image') || 'VA.svg.png';
  $('#player-2-image').attr('src', P2Image);
  var ties = window.localStorage.getItem('ties') || 0;
  $('#player-1-wins').text(P1Wins.toString());
  $('#player-2-wins').text(P2Wins.toString());
}

function clearLocalStorage() {
  window.localStorage.setItem('player1.wins', 0);
  window.localStorage.setItem('player2.wins', 0);
  window.localStorage.setItem('player1.image', 'MA.svg.png');
  window.localStorage.setItem('player2.image', 'VA.svg.png');
  window.localStorage.setItem('ties', 0);
  window.location.assign('history.html');
}
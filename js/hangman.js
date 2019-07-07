var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];
console.log(words[0]);
  
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
  'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U',
  'V', 'W', 'X', 'Y', 'Z'
]

//LISTENERS
window.onload = startGame();
$(".replayBtn").on("click", function() {
  location.reload();
});
$(".letterBtn").click(function() {
  var boxVal = $("#letterBox").val();
  console.log("You pressed the button and it had the value: " + boxVal);
});
$(".letter").click(function() {
  checkLetter($(this).attr("id"));
  disableButton($(this));
});
$(".helpBtn").click(function() {
  disableButton($(this));
  showHint();
});
  
//FUNCTION
function startGame(){ 
  pickWord();
  initBoard();
  updateBoard();
}

function initBoard() {
  for (var letter in selectedWord) {
    board.push("_")
  }
}
initBoard();
for (var letter of board){
  document.getElementById("word").innerHTML += letter + " ";
}

function pickWord() {
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].toUpperCase();
  selectedHint = word[randomInt].hint;
}

function updateBoard() {
  $("#word").empty();
  
for (var i =0; i < board.length; i++){
    $("#word").append(board[i] + " ");
  }
  $("#word").append("<br />");
  $("#word").append("<span class = 'hint'>Hint: " + selectedHint + "</span>")       
}
//Creates the letters inside the letter div
function createLetters() {
  for ( var letter of alphabet){
    $("#letters").append("<button class = 'letter' id='" + letter + "'>" + letter + "</button>");
  }
}
//Checks to see if the selected letter exists in the selectedWord

function checkLetter(letter) {
  var position = [];

  //Put all the position the letter exists in an array
  for (var i = 0; i < selectedWord.length; i++) {
    console.log(selectedWord)
    if (letter == selectedWord[i]) {
      positions.push(i);
    }
  }

  if (positions.length > 0) {
    updateWord(positions, letter);
  } else {
    remainingGuesses -= 1;
  }

}

function updateWord(position, letter) {
  for (var pos of positions) {
    board[pos] = letter;
  }
  updateBoard();
}

function updateMan() {
  $("hangImg").attr("src", "imt/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) {
  $("#letters").hide();

  if (win) {
    $('#won').show();
  } else {
    $('#lost').show();
  }
}

function disableButton(btn) {
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger")
}
function enableButton(btn) {
  btn.prop("enabled", true);
  btn.attr("class", "btn btn-success");
}
//Variables
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{word: "snake", hint:"It's a reptile"},
             {word: "monkey", hint:"It's a mammal"},
             {word: "beetle", hint:"It's an insect"}];

// Creating an array of available letters
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


//Listener, when window loads it calls the startGame function.
window.onload = startGame();

$(".letter").click(function(){
  checkLetter($(this).attr("id"));
  disableButton($(this));
});

$(".replayBtn").on("click",function(){
  location.reload();
});

$(".hintBtn").click(function() {
  disableButton($(this));
  displayHint();
});


//Functions
function startGame(){
  pickWord();
  initBoard();
  createLetters();
  updateBoard();
}

function pickWord(){
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].word.toUpperCase();
  selectedHint = words[randomInt].hint;
}

//Create the letters inside letters div
function createLetters(){
    for (var letter of alphabet){
         $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

function checkLetter(letter){
  var positions = [];
  
  for ( var i = 0; i < selectedWord.length; i++){
    if (letter == selectedWord[i]){
      positions.push(i);
    }
  }
  
  if(positions.length > 0){
    updateWord(positions, letter);
    
    if(!board.includes('_')){
      endGame(true);
    }
    
  }else{
    remainingGuesses -= 1;
    updateMan();
  }
  
  if(remainingGuesses <= 0){
    endGame(false);
  }
}
function updateWord(positions, letter){
  for (var pos of positions){
    board[pos] = letter;
  }

  updateBoard();
}

function updateBoard(){
  $("#word").empty();
  
  for (var letter of board) {
      document.getElementById("word").innerHTML += letter + " ";
  }
}

function initBoard() {
  for (var letter in selectedWord) {
    board.push("_");
  }
}

function updateMan(){
  $("#hangImg").attr("src", "img/stick_" + (6-remainingGuesses)+ ".png");
}


function endGame(win){
  $("#letters").hide();
  
  if(win){
   $("#won").show();
  }else{
    $("#lost").show();
  }
}

function displayHint(){
  remainingGuesses -= 1;
  updateMan();
  $("#word").append("<br />");
  $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}

function disableButton(btn){
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger");
}

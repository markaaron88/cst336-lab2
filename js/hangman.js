var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{word:"snake", hint: "It's a reptile"},
             {word:"monkey", hint: "It's a mamal"},
             {word:"beetle", hint: "It's a insect"},
             ];
    
//LISTENERS
window.onload = startGame();

//FUNCTION
function startGame(){
  pickWord();
  initBoard();
  updateBoard();
}
function initBoard(){
  for (var letter in selectedWord){
      board.push("_")
  }
}

function pickWord(){
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].toUpperCase();
  selectedHint = word[randomInt].hint;
}

function updateBoard(){
  $("#word").empty();
  for (var i =0; i < board.length; i++){
    $("word").append(board[i] + " ");
  }
 $("#word").append("<br />");
  $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}
//Creates the letters inside the letter div
function createLetters(){
  for(var letter of alphabet){
    $("#letters").append("<button class ='letter' id ='" + letter + "'>" + letter + "</button>");
  }
}
$("#letterBtn").click(function(){
  var boxVal = $("letterBox").val();
  console.log("You pressed the button and it had the value: " + boxVal);
})

$(".letter").click(function(){
  checkLetter($(this).attr("id")); 
  disableButton($(this));
});
//Checks to see if the selected letter exists in the selectedWord
 
function checkLetter(letters){
  console.log(letter);
  var position = [];
  
  //Put all the position the letter exists in an array
  for (var i = 0; i < selectedWord.length; i++){
    if(letters == selectedWord[i]){
      positions.push(i);
    }
  }
  
  if (positions.length > 0){
    updateWord(positions, letter);
  if(!board.includes('_')){
    endGame(true);
  }
}else{
  remainingGuesses -= 1;
  updateMan();
}  
 if (remainingGuesses <= 0){
   endGame(false);
 }
    
}    
function updateWord(position,letters){
  for(var pos of positions){
   board[pos] = letter;
  }
  updateBoard();
}
function updateBoard(){
  $("#word").empty();
  
  for (var letter of board){
    document.getElementById("word").innerHTML += letter + " ";
  }
}
function updateMan(){
  $("hangImg").attr("src", "imt/stick_" + (6 - remainingGuesses) + ".png");
}
function endGame(win){
  $("#letters").hide();
  
  if(win){
    $('#won').show();  
  }else{
    $('#lost').show(); 
  }
}
$(".replayBtn").on("click",function(){
    location.reload();                   
});
function disableButton(btn){
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger")
}

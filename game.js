let randomNumber;
let buttonColors = ["red", "blue", "green", "yellow"];
let randomChosenColor;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document.body).on("keypress", function () {
    
    if (level === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
    }

});

$(".btn").on("click", function () {
    if (level === 0) {
        $("#level-title").text("Level " + level);
        nextSequence();
    } 
    else {
        let userChosenColor = $(this).attr("id");
        // console.log(userChosenColor);
        userClickedPattern.push(userChosenColor);
        // console.log(userClickedPattern);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        
        checkAnswer(userClickedPattern.length - 1);
        
    }
});

function nextSequence () { 
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    randomChosenColor = buttonColors[randomNumber];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);
    
    // animate new color loop
    for (let i = 0; i < level; i++) {
        
        let box = $("#" + gamePattern[i]);
        setTimeout( function () {
            box.fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
            setTimeout(function () {
             
            },500);
        }, i * 1000);
    }
        
    userClickedPattern = [];
}

function checkAnswer(currentLevel) {
   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").toggleClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").toggleClass("game-over");
      }, 500);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


function playSound(colorFx) {

    let soundFx = new Audio('./sounds/' + colorFx + '.mp3');
    soundFx.play();

}

function animatePress(currentColor) {

    $("#" + currentColor).toggleClass("pressed");
    setTimeout (function () {
        $("#" + currentColor).toggleClass("pressed");
    }, 100);

}

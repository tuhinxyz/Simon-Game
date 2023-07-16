
/*
function Animaton(value,str)
{
    var activeButton = document.querySelectorAll(".btn")[value];
        activeButton.classList.add("pressed");
        var sound = "./sounds/" + str + ".mp3";
        var audio = new Audio(sound);
        audio.play();
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 50);
}*/
/*
var numberofButtons = document.querySelectorAll(".btn").length;
for (var i = 0; i < numberofButtons; i++) {
    var str;
    if (i === 0) {
        str = "green";
    }
    if (i === 1) {
        str = "red";
    }
    else if (i === 2) {
        str = "yellow";
    }
    else if (i === 3) {
        str = "blue";
    }
    addingAnimation(i, str);
}
function addingAnimation(value, str) {
    document.querySelectorAll(".btn")[value].addEventListener("click", function () {
        var activeButton = document.querySelectorAll(".btn")[value];
        activeButton.classList.add("pressed");
        var sound = "./sounds/" + str + ".mp3";
        var audio = new Audio(sound);
        audio.play();
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 50);
    });
}*/
var level = 0;
if (level === 0) {
    $(document).keypress(function () {
        nextSequence();
    });
}/*
OR
$(document).on("keypress", function () {
    $("h1").text("level");
});*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    //console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
    var i = 0;
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    //started=
}
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("h1").text("level " + level);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");
    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}
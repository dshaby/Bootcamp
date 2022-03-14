const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];
let userClickedPattern = [];

$("body").one("keypress", function () {
    buttonClick();
    nextSequence();
});

function nextSequence() {
    randomNumber = Math.floor((Math.random() * 4));

    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("gamePattern: " + gamePattern);

    $("#" + randomChosenColor).ready(function () {
        setTimeout(function () {
            animate("#" + randomChosenColor);
            playSound("#" + randomChosenColor);
        }, 700);
    });
}

function animate(name) {
    $(name).ready(function () {
        $(name).fadeOut(100).fadeIn(100);
    });
};

function playSound(name) {
    $(name).ready(function () {
        const audio = new Audio("sounds/" + $(name).attr("id") + ".mp3");
        audio.play();
    })
}

function buttonClick() {
    $(".btn").click(function () {
        const userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log("userClickedPattern: " + userClickedPattern);

        playSound("#" + userChosenColor);
        animate("#" + userChosenColor);

        checkAnswer();
    });
};

function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {

        if (userClickedPattern[i] != gamePattern[i]) {
            stopGame();
        }
        if (userClickedPattern.length === gamePattern.length &&
            userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
            nextSequence();
            userClickedPattern = [];
        }
    }
}

function stopGame() {
    console.log("Stopping Game");
    $("body").addClass("game-over").attr('id', 'wrong');
    playSound("#wrong");
    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").one("keypress", function () {
        sessionStorage.setItem("reloading", "true");
        location.reload(true);
    })
}

window.onload = function () {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        restartGame();
    }
}

function restartGame() {
    buttonClick();
    nextSequence();
}
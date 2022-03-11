const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];
const userClickedPattern = [];

$("body").one("keypress", function () {
    nextSequence();
});

function nextSequence() {
    randomNumber = Math.floor((Math.random() * 4));

    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("gamePattern: " + gamePattern);

    $("#" + randomChosenColor).ready(function () {
        animate("#" + randomChosenColor);
        playSound("#" + randomChosenColor);
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

        playSound("#" + userChosenColor);
        animate("#" + userChosenColor);

        console.log("userClickedPattern: " + userClickedPattern);
        // checkAnswer(); (not yet created)
    });
};
buttonClick();
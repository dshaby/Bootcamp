const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];
let userClickedPattern = [];

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
        checkAnswer();
    });
};
buttonClick();

function checkAnswer() {

    for (let i = 0; i < userClickedPattern.length; i++) {

        if (userClickedPattern[i] === gamePattern[i]) {
            console.log("Both arrays are equal up until [i]");

            if (gamePattern.length === userClickedPattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 800);

                userClickedPattern = [];
            } else {
                // FOR SOME REASON, I'M GETTING THAT gamePattern[1] === userClickedPattern[1] even if they're not
                // although, gamePattern[0] appropriately checks if it's === to userClickedPattern[0]
                // FIGURE THIS OUT
            }

        } else {
            console.log("Not equal arrays");
            stopGame();
        }

        // var is_same = gamePattern.every(function (color, index) {
        //     return color === userClickedPattern[index]
        // });
        // console.log(is_same);
        // if (is_same === true) {
        // console.log("Both arrays are equal");
        // setTimeout(function () {
        //     nextSequence();
        // }, 800);

        // userClickedPattern = [];

        // } else {
        // console.log("Not equal arrays");
        // stopGame();
        // }
    }
}

function stopGame() {
    $("body").addClass("game-over").attr('id', 'wrong')
    playSound("#wrong");
}

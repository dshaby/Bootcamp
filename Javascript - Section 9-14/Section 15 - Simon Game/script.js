userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];

$(".btn").click(function () {
    // $(this).hide(); --> potentially for reference later
    var userChosenColour = this.id;
    // ALSO, userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    // $(this).css("background-color", "purple");

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    playSound(randomChosenColour);

}


function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    var clickSound = new Audio("sounds/" + name + ".mp3");
    clickSound.play();
}

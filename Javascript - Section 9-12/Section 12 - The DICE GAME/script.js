var randomNumber1 = 1 + Math.floor(6 * (Math.random()));
console.log(randomNumber1);

var randomDiceImage1Source = "images/dice" + randomNumber1 + ".png"; // images/dice#.png

var firstImage = document.querySelectorAll("img")[0];
firstImage.setAttribute("src", randomDiceImage1Source);

var randomNumber2 = 1 + Math.floor(6 * (Math.random()));
console.log(randomNumber2);

var randomDiceImage2Source = "images/dice" + randomNumber2 + ".png";

var secondImage = document.querySelectorAll("img")[1];
secondImage.setAttribute("src", randomDiceImage2Source);

var h1Winner = document.querySelector("h1");

if (randomNumber1 > randomNumber2) {
    h1Winner.textContent = "🚩 Player 1 Wins!"
} else if (randomNumber1 < randomNumber2) {
    h1Winner.textContent = "Player 2 Wins! 🚩"
} else {
    h1Winner.textContent = "Draw!"
}


// ALSO Possible for random image: (& repeating for image 2)
// Only reason it's not necessary is because images are labled 1-6 already
// if (randomNumber1 === 1) {
//     firstImage.setAttribute("src", "images/dice1.png");
// } else if (randomNumber1 === 2) {
//     firstImage.setAttribute("src", "images/dice2.png");
// } else if (randomNumber1 === 3) {
//     firstImage.setAttribute("src", "images/dice3.png");
// } else if (randomNumber1 === 4) {
//     firstImage.setAttribute("src", "images/dice4.png");
// } else if (randomNumber1 === 5) {
//     firstImage.setAttribute("src", "images/dice5.png");
// } else {
//     firstImage.setAttribute("src", "images/dice6.png");
// }
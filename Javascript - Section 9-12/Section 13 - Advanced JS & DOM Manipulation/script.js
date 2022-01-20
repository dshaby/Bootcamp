
// document.querySelector("button").addEventListener("click", function () {
//     alert("I got clicked!");
// });

// FOR EACH METHOD
// document.querySelectorAll(".drum").forEach(function(drumclick) {
//     drumclick.addEventListener("click", function () {
//         alert("I got clicked!");
//     });
// });

// FOR LOOP METHOD
numberOfDrumButtons = document.querySelectorAll(".drum").length;

var audio = new Audio('sounds/tom-1.mp3');
// audio.play();


for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        this.style.color = "white";
    });
};



// function add(num1, num2) {
//     return num1 + num2;
// }

// function multiply(num1, num2) {
//     return num1 * num2;
// }

// function divide(num1, num2) {
//     return num1 / num2;
// }

// function subtract(num1, num2) {
//     return num1 - num2;
// }

// function calculator(num1, num2, operator) {
//     return operator(num1, num2);
// }
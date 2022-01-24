
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

// Detecting Button CLICK
numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        // this.style.color = "white";

        makeSound(this.innerHTML); //calls makeSound function below passing innerHTML of clicked button as its argument

        buttonAnimation(this.innerHTML); //also want the button to animate when it's clicked
        //we will be passing in the letter of innerHTML into the 'currentKey' paramater of this function when its created below
    });
};

// Detecting Keyboard Press
document.addEventListener("keydown", function (event) {
    //Passing an event that triggers the callback function (the function in the line above & below) whenever a key is pressed
    makeSound(event.key); //calls function below whenever any key is pressed

    buttonAnimation(event.key); //passing same paramater, the 'key' pressed
});

function makeSound(key) { //but will only make a sound if key is in one of the cases

    var soundSource = "";

    switch (key) {
        case "w":
            soundSource = "sounds/tom-1.mp3";
            break;

        case "a":
            soundSource = "sounds/tom-2.mp3";
            break;

        case "s":
            soundSource = "sounds/tom-3.mp3";
            break;

        case "d":
            soundSource = "sounds/tom-4.mp3";
            break;

        case "j":
            soundSource = "sounds/snare.mp3";
            break;

        case "k":
            soundSource = "sounds/crash.mp3";
            break;

        case "l":
            soundSource = "sounds/kick-bass.mp3";
            break;

        default: console.log(key + " is not a valid key to make a sound"); //in case a different key is pressed, show key that was pressed
            break;
    }

    if (soundSource.length > 1) {
        new Audio(soundSource).play();
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey); //adding "." bcz querySelector is selecting for the class .w, or class .k, etc.
    activeButton.classList.add("pressed");

    setTimeout(removeAnimation, 100);

    function removeAnimation() {
        activeButton.classList.remove("pressed");
    }

}

function anotherAddEventListener(typeOfEventweNeed, callback) {

    // Detect Event Code... - waits to detect an event.
    // when pressing the key (remember keydown below)
    // creates an event object

    //when event happens, it creates this object below
    var eventThatHappenedObject = {
        eventType: "keydown",
        key: "p",
        durationOfKeypress: 2
    }

    //passing that object back so we can see what event triggered the eventListener

    if (eventThatHappenedObject.eventType === typeOfEventweNeed) {
        callback(eventThatHappenedObject); // if its event we're looking for
        //will trigger callback function
        //which of course is the function used as the second input below
    }

}

anotherAddEventListener("keydown", function (event) { //callback function here
    console.log(event); //logs eventThatHappenedObject with eventType, key, duration of keypress..
    //this function is only carried out bcz
    //typeofEventweNeed = "keydown" = eventType
});

document.addEventListener("keydown", function (event) {
    console.log(event);
})


// var houseKeeper1 = {
//     age: 24,
//     gender: "female",
//     sexy: "yes",
//     yearsOfExperience: 12,
//     name: "Jane",
//     cleaningRepertoire: ["bathroom", "lobby", "bedroom"]
// }
// CONSTRUCTOR FUNCTION ("FACTORY")
function BellBoy(name, age, hasWorkPermit, languages) {
    this.name = name;
    this.age = age;
    this.hasWorkPermit = hasWorkPermit;
    this.languages = languages;
    this.moveSuitcase = function () {
        alert("May I take your suitcase?");
        pickUpSuitcase();
        move();
    }
}
// CREATING OBJECT FROM FACTORY ("Constructor Function")
var BellBoy1 = new BellBoy(
    "Timmy",
    19,
    true,
    ["French", "English"]
);

function HouseKeeper(yearsOfExperience, name, cleaningRepertoire) {
    this.yearsOfExperience = yearsOfExperience;
    this.name = name;
    this.cleaningRepertoire = cleaningRepertoire;
    this.clean = function () {
        alert("Cleaning in progress!");

    }
}

var houseKeeper2 = new HouseKeeper(12, "Jane", ["bathroom", "lobby", "bedroom"])

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
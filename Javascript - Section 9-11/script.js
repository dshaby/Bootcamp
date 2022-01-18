// SECTION 137
function fibonacciGenerator(n) {
    //Do NOT change any of the code above 👆

    //Write your code here:

    var output = [];

    if (n === 1) {
        output = [0];
    } else if (n === 2) {
        output = [0, 1];
    } else {
        output = [0, 1];
        for (var i = 2; i < n; i++) {
            output.push(output[output.length - 1] + output[output.length - 2]);
        }
    }
    return output;

    //Return an array of fibonacci numbers starting from 0.

    //Do NOT change any of the code below 👇
}

fibonacciGenerator();

// SECTION 134
function beer() {

    var numberBeers = 99;

    while (numberBeers > 2) {

        console.log(numberBeers + " bottles of beer on the wall, " +
            numberBeers + " bottles of beer. Take one down and pass it around, "
            + (numberBeers - 1) + " bottles of beer on the wall.");

        numberBeers--;
    }

    console.log("2 bottles of beer on the wall, 2 bottles of beer. Take one down and pass it around, 1 bottle of beer on the wall.");

    console.log("1 bottle of beer on the wall, 1 bottle of beer. Take one down and pass it around, no more bottles of beer on the wall.");

    console.log("No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, 99 bottles of beer on the wall.")
}

beer();

// SECTION 133
function whosPaying(names) {

    /******Don't change the code above*******/

    //Write your code here.

    names = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];
    var random = Math.floor(Math.random() * names.length);

    return names[random] + " is going to buy lunch today!"




    /******Don't change the code below*******/
}

// SECTION 132
var output = [];

function fizzBuzz() {
    for (var count = 1; count < 101; count++) {

        if (count % 15 === 0) {
            output.push("FizzBuzz");
        } else if (count % 5 === 0) {
            output.push("Buzz");
        } else if (count % 3 === 0) {
            output.push("Fizz");
        } else output.push(count);
    }
    console.log(output);
}

fizzBuzz();

// var output = [];

// function fizzBuzz() {

//     if ((output.length + 1) % 15 === 0) {
//         output.push("FizzBuzz");
//     } else if ((output.length + 1) % 3 === 0) {
//         output.push("Fizz");
//     } else if ((output.length + 1) % 5 === 0) {
//         output.push("Buzz");
//     } else {
//         output.push(output.length + 1);
//     }
//     console.log(output);
// }

// fizzBuzz();


// SECTION 131
var yourName = prompt("what is your name?");
var guestList = ["Angela", "Jack", "Pam", "James", "Lara", "Jason"];

if (guestList.includes(yourName)) {
    alert("Welcome " + yourName + "!");
} else {
    alert("Sorry, maybe next time!");
}



var myName = "Shaby";
console.log(myName);
alert(myName);

function test() {
    var a = "3";
    var b = "8";

    /***********Do not change the code above 👆*******/
    //Write your code on lines 7 - 9:
    var c = a; //c = 3/
    a = b; //a = 8/
    b = c; //b = 3/
    /***********Do not change the code below 👇*******/

    console.log("a is " + a);
    console.log("b is " + b);
}

var message = "Hello";
var name = "Shaby";

alert(message + " there, " + name);

// prompt can enter a long string
// we will tell them how many characters they've written
// & how many characters they have remaining

var tweet = prompt("Write your tweet here. Max 140 characters!");
//alert that cuts tweet down to 140 characers
alert("Your full tweet is: ''" + tweet.slice(0, 140) + "''");

var charactersLeft = 140 - tweet.length;

alert("You have written " + tweet.length + " characters, you have " + charactersLeft + " characters left.");

// You have written 182 characters, you have -42 characters left

function getMilk() {
    console.log("leaveHouse");
    console.log("moveRight");
    console.log("moveRight");
    console.log("moveUp");
    console.log("moveUp");
    console.log("moveUp");
    console.log("moveUp");
    console.log("moveRight");
    console.log("moveRight");
    console.log("moveLeft");
    console.log("moveLeft");
    console.log("moveDown");
    console.log("moveDown");
    console.log("moveDown");
    console.log("moveDown");
    console.log("moveLeft");
    console.log("moveLeft");
    console.log("enterHouse");
}

function isLeap(year) {
    // /**************Don't change the code above****************/    
    if (year % 4 === 0) {

        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return "Leap year.";
            } else {
                return "Not leap year.";
            }
        } else {
            return "Leap year.";
        }

    } else {
        return "Not leap year.";
    }


    // /**************Don't change the code below****************/    
}

isLeap(2100);
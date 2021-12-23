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


var thirdItem = document.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild;
console.log(thirdItem);

thirdItem.innerHTML = "Good Bye!";

alert("Is this working?");

document.querySelector("input").click();

document.getElementsByTagName("li")[2].innerHTML = "Second Good Bye!";

document.getElementsByTagName("li")[0, 1, 2].style.color = "purple";

document.getElementsByClassName("btn");

document.getElementById("title").innerHTML = "Good bye now :) ";
// No need for [] because ID is unique

document.querySelector("")
// String that you put is a selector/element that you put in your CSS file
// elements, classes or ids
// you can also combine for more specificity
document.querySelector("h1");
// OR
document.querySelector("#title");
// OR
document.querySelector(".list");
// OR
document.querySelector("li a");
// this above is for parent --> Child (heirarchical selectors have space)
// Space here

document.querySelector("li.list");
// this above is for SAME element, just element --> Class
// No space here

document.querySelectorAll(".list")[2].style.color = "blue";

document.querySelector("li a").style.color = "blue";

// How to use JS & styles.css @ the same time
// by adding, removing, or toggling classes that are preset in the stylesheet
document.querySelector("button").classList.add("invisible");
document.querySelector(".btn").classList.remove("invisible");
document.querySelector(".btn").classList.toggle("invisible");
// switches invisible on & off


document.querySelector("h1").classList.add("huge");
// TEXTCONTENT
document.querySelectorAll("li")[1].textContent = "My textContent";

document.querySelectorAll("li")[1].innerHTML = "<em>Good Bye!</em>";

// captures all of the innerHTML, not only textContent

document.querySelector("a").attributes;
// shows all the attributes (plural)

document.querySelector("a").getAttribute("href");
// single (singular) attribute
// shows https://www.google.com

document.querySelectorAll("a")[0].setAttribute("href", "https://www.bing.com");
// first attribute is what do you want to change
// second attribute is what you want to change it to


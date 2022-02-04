// jshint esversion:6
// const fs = require("fs");

// fs.copyFileSync("file.txt", "file2.txt");


const superheroes = require('superheroes');
// https://www.npmjs.com/package/superheroes

var mySuperHeroName = superheroes.random();

console.log("SuperHero: " + mySuperHeroName);

const supervillains = require('supervillains');


var mySuperVillain = supervillains.random();
console.log("Villain: " + mySuperVillain);


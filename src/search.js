const data = require("../data/data.js");
let ballers = data.ballers;
let birdList = data.birdList;


function search(str) {
  if (ballers.length < 6) {
  return ballers;
} else {
  return ballers.slice(0, 5);
}
}

module.exports = search;

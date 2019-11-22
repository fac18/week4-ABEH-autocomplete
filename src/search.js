const data = require("../data/data.js");
let ballers = data.ballers;
let birdList = data.birdList;
let ballBirds = ballers.concat(birdList);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(ballBirds);

function search(str) {
  let searchTerm = new RegExp(str, "i");
  // let matches = forEach.ballBirds.match();
  let matches = ballBirds.filter(
    ballBird => searchTerm.test(ballBird) && str !== ballBird
  );

  if (matches.length < 6) {
    return matches.sort();
  } else {
    return matches.slice(0, 5).sort();
  }
}

module.exports = search;

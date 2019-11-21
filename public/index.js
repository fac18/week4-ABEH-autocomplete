const input = document.getElementById("userInput");
const searchButton = document.getElementById("searchButton");

let newArr = [];
let navCounter = -1;

const changeValue = () => {
  navCounter = -1;
  let searchTerm = input.value;
  let xhr = new XMLHttpRequest();
  let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      newArr = JSON.parse(xhr.responseText);
      console.log({ newArr });
      addSuggestions();
    }
  };
  xhr.open("GET", searchUrl, true);
  xhr.send();
};

input.addEventListener("input", changeValue);

//create li elements for each suggestion
const addSuggestions = () => {
  const UlElement = document.querySelector(".dropdownList");
  console.log({ UlElement });
  UlElement.textContent = "";
  newArr.forEach((suggestion, i) => {
    const liElement = document.createElement("li");
    liElement.classList.add("suggestion-item");
    const matchingText = document.createElement("span");
    matchingText.classList.add("matching-text");
    matchingText.textContent = suggestion.slice(0, input.value.length);
    const remainingText = document.createElement("span");
    remainingText.classList.add("remaining-text");
    remainingText.textContent = suggestion.slice(input.value.length);
    liElement.appendChild(matchingText);
    liElement.appendChild(remainingText);
    //adds highlight class to the element at the index decided by navCounter
    //this index changes when arrow keys are used for navigating and the UL is rerendered each time
    if (i === navCounter) {
      liElement.classList.add("highlighted");
    }
    UlElement.appendChild(liElement);
    liElement.addEventListener("click", chooseSuggestion);
  });
};

// event handler for choosing a suggestion and updating value when clicked
const chooseSuggestion = event => {
  const value = event.currentTarget.textContent;
  input.value = value;
  input.focus();
  changeValue();
};

//callback to handle navigation keypresses(arrow keys).
//updates navCounter and calls addSuggestions function to rerender suggestions list.
const navigateList = e => {
  if (e.keyCode == 40 && navCounter < newArry.length - 1) {
    //increments navCounter
    navCounter += 1;
    //preventing default behavior of up arrow which is to move the cursor around in the textbox(which still has focus)
    e.preventDefault();
    addSuggestions();
  }
  if (e.keyCode == 38 && navCounter > -1) {
    //decrements navCounter
    navCounter -= 1;
    //again preventing default behavior of moving the cursor in the textbox
    e.preventDefault();
    addSuggestions();
  }
  if (e.keyCode == 13 && navCounter !== -1) {
    //hacking the chooseSuggestion function, instead of using it as an event listener callback,
    //we are just passing it an object with a property 'target', which has a value of the highlighted element.
    //e.target within chooseSuggestion is the currently highlighted element
    //so the function updates the input with the currently highlighted suggestion's value
    chooseSuggestion({ currentTarget: document.querySelector(".highlighted") });
    //resets navCounter to 1
    navCounter = -1;
  }
};
//eventlistener for navigating search queries with keyboard
input.addEventListener("keydown", navigateList);

searchButton.addEventListener("click", () => {
  window.location.href = "https://en.wikipedia.org/wiki/" + input.value;
});

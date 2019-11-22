const input = document.getElementById("userInput");
const searchButton = document.getElementById("searchButton");

let suggestionsArray = [];
let navCounter = -1;

const changeValue = () => {
  navCounter = -1;
  let searchTerm = input.value;
  let xhr = new XMLHttpRequest();
  let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      suggestionsArray = JSON.parse(xhr.responseText);
      console.log({ newArr: suggestionsArray });
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
  suggestionsArray.forEach((suggestion, i) => {
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

//40 is down

searchButton.addEventListener("click", () => {
  window.location.href = "https://en.wikipedia.org/wiki/" + input.value;
});

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});

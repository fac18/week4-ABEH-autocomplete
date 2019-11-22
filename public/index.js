const input = document.getElementById("userInput");
const searchButton = document.getElementById("searchButton");

let suggestionsArray = [];
let listPosition = -1;

const changeValue = () => {
  listPosition = -1;
  let searchTerm = input.value;
  let xhr = new XMLHttpRequest();
  let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      suggestionsArray = JSON.parse(xhr.responseText);
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
  UlElement.textContent = "";
  suggestionsArray.forEach((suggestion, i) => {
    const liElement = document.createElement("li");
    liElement.textContent = suggestion;
    if (i === listPosition) {
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

searchButton.addEventListener("click", () => {
  if (input.value) {
    window.location.href = "https://en.wikipedia.org/wiki/" + input.value;
  }
});

//code for keyboard navigation: return key to choose highlighted value from list, or search if already selected, up and down keys to navigate list
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    returnKeyPress();
  } else if (event.keyCode === 40) {
    downArrowPress();
  } else if (event.keyCode === 38) {
    upArrowPress();
  }
});

function returnKeyPress() {
  if (document.querySelector(".highlighted")) {
    input.value = document.querySelector(".highlighted").textContent;
    input.focus();
    changeValue();
  } else {
    searchButton.click();
  }
}

function downArrowPress() {
  if (listPosition < suggestionsArray.length - 1) {
    listPosition++;
    addSuggestions();
  } else {
    addSuggestions();
  }
}

function upArrowPress() {
  if (listPosition > 0) {
    listPosition--;
    addSuggestions();
  } else {
    addSuggestions();
  }
}

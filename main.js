// Selecting Elements
let userInput = document.querySelector('#user-input');
let divs = document.querySelectorAll('#word');
let result = document.querySelector('#result');
let correctDiv = document.querySelector('#correct-words');
let IncorrectDiv = document.querySelector('#incorrect-words');

//On page load
document.addEventListener('DOMContentLoaded', function (event) {
  //Generate 100 default random words
  generateWords(randomWordsArray, 100);
  //Generate a subset from RandomWordsArray and display it
  setTimeout(function () {
    rWordsSuset(randomWordsArray, wordsToDisplay);
    changeContent(wordsToDisplay, divs);
  }, 2000);
});

//Define Variables
let randomWordsArray = [];
let wordsToDisplay = [];
let typedValue = [];
let correctWords = [];
let incorrectWords = [];
let wordIndex = 0;
let timeofStart;

//Record the time when user starts typing
userInput.addEventListener('click', function () {
  timeofStart = Date.now();
});

//Listen for changes to the input field
//If user doesnt click space or enter
let currentWord = '';
userInput.addEventListener('keyup', function (event) {
  //Tracks the user input untill user doesnt press space or enter
  if (event.key !== '' || event.key !== 'Enter') {
    currentWord = userInput.value;
    // Current Value is set to user input
  }
});

//If user clicks tab or enter
userInput.addEventListener('keydown', function (event) {
  if (event.key === ' ' || event.key === 'Enter') {
    //Tracks the user input untill user presses space or enter
    if (currentWord.trim() !== '') {
        // Checks if current words is not a space
      let completedWord = currentWord.trim();
        // Word is completed and stored into completed word

      //If typed word is correct
      if (divs[wordIndex].textContent === completedWord) {
        divs[wordIndex].style.backgroundColor = 'green';
        //Change color of displayed word to green
        typedValue.push(divs[wordIndex].textContent);
        //Store word in a typed value array
        correctWords.push(divs[wordIndex].textContent);
        //Store correct word in the correctWord array
        wordIndex += 1;
        //Move to next word

      } 
      //If typed value is incorrect
      else if (divs[wordIndex].textContent !== completedWord) {
        divs[wordIndex].style.backgroundColor = 'red';
        //Change color of displayed word to red
        typedValue.push(currentWord);
        //Store word in a typed value array
        incorrectWords.push(divs[wordIndex].textContent);
        //Store incorrect word in the incorrectWord array
        wordIndex += 1;
        //Move to next word
      }
    }
    // If current word is a space bar, clear the user input field
    userInput.value = '';
    event.preventDefault();

    //When you type all the displayed words
    if (typedValue.length === wordsToDisplay.length) {
      //Display number of correct words 
      correctDiv.textContent = 'Correct = ' + correctWords.length;
      //Display number of Incorrect words 
      IncorrectDiv.textContent = 'Incorrect =  ' + incorrectWords.length;
      //Give Divs a color
      correctDiv.style.backgroundColor = '#92B4A7';
      IncorrectDiv.style.backgroundColor = '#92B4A7';

      //Result Calculation
        //Check if correct value are more than 1
      if (correctWords.length > 0) {
        // Returns NaN when correct words are 0
        let timeTaken = (Date.now() - timeofStart) / 1000;
        result.textContent =
          'WORDS PER MINUTE =  ' +
          Math.floor((correctWords.length / timeTaken) * 60);
        console.log('YOU TOOK', (Date.now() - timeofStart) / 1000, 'seconds');
      } 
      // Check if there are no correct values
      else {
        result.textContent = 'WORDS PER MINUTE - ' + 0;
      }
    }
  }
});


// If user clicks tab
userInput.addEventListener('keydown', function (event) {
  if (event.code === 'Tab') {
    //Reset Typed Values
    typedValue = [];
    //Reset words to display
    wordsToDisplay = [];
    event.preventDefault();

    //Set default color of divs to none
    for (let div of divs) {
      div.style.backgroundColor = '';
      divs.textContent = '';
    }
    //Start new timer
    timeofStart = Date.now();
    //Clear user input
    userInput.value = '';
    //Set index of words to 0
    wordIndex = 0;

    //Generate new words everytime 
    generateWords(randomWordsArray, 50);
    //Make a subset everytime
    rWordsSuset(randomWordsArray, wordsToDisplay);
    //Change the content everytime
    changeContent(wordsToDisplay, divs);
    //reset reset result
    result.textContent = '';
    //reset correct words
    correctWords = [];
    //reset incorrect words
    incorrectWords = [];
    //Reset result values and color
    correctDiv.textContent = '';
    IncorrectDiv.textContent = '';
    correctDiv.style.backgroundColor = '';
    IncorrectDiv.style.backgroundColor = '';
  }
});


//Function that generates random words
function generateWords(rArray, nWords) {
  //Fetch the api
  fetch(
    `https://random-word-api.herokuapp.com/word?number=${nWords}&length=${4}`
  )
    .then((response) => response.json())
    .then((data) => {
      rArray.push(...data);
      //Push data to the random array
    });
}

//Function that creates a subset from random words 
function rWordsSuset(randomWordsArray, wordsToDisplay) {
  //Loop over the random array
  for (let i = 0; i < 10; i++) {
    let rIndex = Math.floor(Math.random() * randomWordsArray.length);
    //Push random words into wordsToDisplay
    wordsToDisplay.push(randomWordsArray[rIndex]);
  }
}

//Function that chages the display words
function changeContent(wordsToDisplay, divs) {
  //Loop over wordstodisplay
  for (let i = 0; i < divs.length; i++) {
    //Change the text value of divs
    divs[i].textContent = wordsToDisplay[i];
  }
}

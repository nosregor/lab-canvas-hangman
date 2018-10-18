class Hangman {
  constructor() {
    this.words = ["Javascript", "Ironhack", "Argentina"];
    this.secretWord = "";
    // split letters between clicked and guessed
    this.clickedLetters = [];
    this.guessedLetters = [];
    // array of letters of the secret word
    this.letterArray = []
    this.errorCount = 0;
    this.thecanvas = {};
  }
  getWord() {
    let index = Math.floor(Math.random() * this.words.length)
    this.secretWord = this.words[index].toLowerCase();
    this.letterArray = this.secretWord.split('');
  };
  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) return true;
    return false;
  };
  checkClickedLetters(key) {
    // if (this.letters.indexOf(key) == -1)
    //   return true;
    // return false;
    if (this.clickedLetters.includes(key)) {
      alert("You already guessed this letter!!!\n Please try again.")
    } else {
      // add letter to array of clicked words
      this.clickedLetters.push(key);

      // if letter is in word 
      if (this.secretWord.includes(key)) {
        this.addCorrectLetter(key)
      } else {
        this.addWrongLetter(key)
      }
    }
    //check if clicked letter is correct
  };
  addCorrectLetter(letter) {
    // Add letter to guessedLetter array & check if winner
    this.letterArray.forEach((l, index) => {
      if (l == letter) {
        this.guessedLetters.push(letter);
        this.thecanvas.drawText(l, index);
        this.checkWinner()
      }
    })
  };
  addWrongLetter(theLetter) {
    this.errorCount++;
    this.checkGameOver();
    this.thecanvas.drawIt(this.errorCount - 1)
    this.thecanvas.drawWrongLetters(theLetter, (this.errorCount))
  };
  checkGameOver() {
    if (this.errorCount == 6) {
      setTimeout(function () {
        var myDrawing = $('canvas');
        myDrawing.hide()
        var gameOver = $('.game-over');
        gameOver.show()
        setTimeout(function () {
          alert('Game Over')
          gameOver.hide()
          var startLogo = $('.start');
          startLogo.show()
        }, 2000);
      }, 2000);
    }
  }
  checkWinner() {
    if (this.guessedLetters.length == this.letterArray.length) {
      setTimeout(function () {
        var wonGame = $('.you-won');
        wonGame.show()
        var myDrawing = $('canvas');
        myDrawing.hide()
        setTimeout(function () {
          wonGame.hide()
          var startLogo = $('.start');
          startLogo.show()
          alert('Congratulations! YOU WON!!!!!')
        }, 1000);
      }, 1000);
    }
  }
} // end of Hangman

let hangman;

document.getElementById('start-game-button').onclick = function () {
  hangman = new Hangman();
  hangman.getWord()

  console.log(hangman.secretWord)

  canvas = new Canvas(hangman.secretWord)
  hangman.thecanvas = canvas;

  var startLogo = $('.start');
  startLogo.hide()
  var myDrawing = $('canvas');
  myDrawing.show()
};

document.onkeydown = function (event) {
  var codeOfKey = event.keyCode; // returns a number, i.e.: 69
  var keyPressed = event.key; // returns letter, i.e.: "a", "b"
  if (hangman.checkIfLetter(codeOfKey)) return hangman.checkClickedLetters(keyPressed)
};
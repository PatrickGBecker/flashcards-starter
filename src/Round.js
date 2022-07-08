const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
      this.deck = deck;
      this.turnCount = 0;
      this.correctGuess = [];
      this.incorrectGuess = [];
      this.isCorrect = true;
  }

  returnCurrentCard() {
    if (this.deck.cards[0] === undefined) {
      return false
    } else {
      return this.deck.cards[0]
    }
  }

  takeTurn(guess) {
    this.turnCount += 1;

    const turn = new Turn(guess, this.returnCurrentCard())
    this.deck.cards.shift();

    if (turn.evaluateGuess() === false) {
      this.incorrectGuess.push(this.deck.cards.id)
      this.isCorrect = false;

      return turn.giveFeedback();
    } else {
        this.correctGuess.push(this.deck.cards.id)

        return turn.giveFeedback()
    }
  }

  calculatePercentCorrect() {
    if (this.correctGuess.length === 0)
      return 0;
    if (this.turnCount / this.correctGuess.length === 1)
      return 100;
      return (this.correctGuess.length / this.turnCount).toFixed(2) * 100;
  }

  endRound() {
    console.log(`**Round Over! You answered ${this.calculatePercentCorrect()}% of the questions correctly!`)
    return `**Round Over!** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`
  };

}


module.exports = Round;

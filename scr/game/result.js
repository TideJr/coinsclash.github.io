class Result {
    static determineWinner(choice, coinFlip) {
      return choice === coinFlip ? 'win' : 'lose';
    }
  
    static calculateWinnings(amount, result) {
      return result === 'win' ? amount * 2 : 0;
    }
  }
  
  module.exports = { Result };
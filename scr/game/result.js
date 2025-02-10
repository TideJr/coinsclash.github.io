class Result {
  static determineWinner(user1Choice, user2Choice) {
    if (user1Choice === user2Choice) {
      return "draw"; // Ничья
    } else {
      const result = Math.random() < 0.5 ? user1Choice : user2Choice;
      return result === user1Choice ? "user1" : "user2"; // Победитель
    }
  }

  static calculateWinnings(betAmount, result) {
    if (result === "draw") {
      return betAmount * 0.995; // Возврат с комиссией 0.5%
    } else {
      return betAmount * 1.8; // Выигрыш за вычетом комиссии 10%
    }
  }
}

module.exports = { Result };
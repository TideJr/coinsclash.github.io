// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Game variables
let userBalance = 1000; // Example balance in Telegram Stars or TON
let betAmount = 100; // Default bet amount
let commissionRate = 0.1; // 10% commission

// DOM elements
const eagleButton = document.getElementById('eagle');
const reshkaButton = document.getElementById('reshka');
const resultDiv = document.getElementById('result');

// Event listeners for betting
eagleButton.addEventListener('click', () => placeBet('Eagle'));
reshkaButton.addEventListener('click', () => placeBet('Reshka'));

// Function to place a bet
function placeBet(userChoice) {
  if (userBalance < betAmount) {
    resultDiv.textContent = "Insufficient balance!";
    return;
  }

  // Deduct bet amount from balance
  userBalance -= betAmount;
  updateBalance();

  // Simulate coin flip
  const coinFlip = Math.random() < 0.5 ? 'Eagle' : 'Reshka';
  const isWinner = coinFlip === userChoice;

  // Calculate winnings
  if (isWinner) {
    const winnings = betAmount * 2 * (1 - commissionRate); // Deduct commission
    userBalance += winnings;
    resultDiv.textContent = `You win! ${winnings} added to your balance.`;
  } else {
    resultDiv.textContent = `You lose! The result was ${coinFlip}.`;
  }

  updateBalance();
}

// Function to update balance display
function updateBalance() {
  tg.MainButton.setText(`Balance: ${userBalance}`);
  tg.MainButton.show();
}

// Initialize Telegram WebApp
tg.ready();
tg.MainButton.setText(`Balance: ${userBalance}`);
tg.MainButton.show();
const tg = window.Telegram.WebApp;
const balanceElement = document.getElementById('balance');
const resultDiv = document.getElementById('result');

let userBalance = 0;

// Загрузка баланса при запуске
async function loadBalance() {
  const response = await fetch('/api/balance');
  const data = await response.json();
  userBalance = data.balance;
  balanceElement.textContent = userBalance;
}

// Размещение ставки
async function placeBet(userChoice) {
  if (userBalance < 1) {
    resultDiv.textContent = "Недостаточно средств!";
    return;
  }

  const response = await fetch('/api/bet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ choice: userChoice, amount: 1 }), // Ставка 1 TON
  });
  const result = await response.json();

  if (result.success) {
    userBalance = result.newBalance;
    balanceElement.textContent = userBalance;
    resultDiv.textContent = result.message;
  } else {
    resultDiv.textContent = "Ошибка: " + result.message;
  }
}

// Инициализация
tg.ready();
loadBalance();

document.getElementById('eagle').addEventListener('click', () => placeBet('Eagle'));
document.getElementById('reshka').addEventListener('click', () => placeBet('Reshka'));
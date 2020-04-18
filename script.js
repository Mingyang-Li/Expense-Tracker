const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a text and an amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
  }
}

//generate random id 
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

//add transaction to dom list
function addTransactionDOM(transaction) {
  //get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  //add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick = 'removeTransaction(${transaction.id})'>X</button>
  `;
  list.append(item);
}

//update balance, income and expenses
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expenses = (
    amounts
      .filter(item => item < 0)
      .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_minus.innerText = `${expenses}`;
  console.log(total);
  console.log(income);
  console.log(expenses);
}

//remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

//update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
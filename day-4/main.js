const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const inputData1 = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
]

const getCardNumber = (str) => {
  const [, number] = str.split('Card ');
  return +number.trim();
}

const getNumbers = (str) => {
  return str.trim().split(' ').filter(n => !!n).map(n => +n)
}

let sum = 0;

inputData.forEach(cardStr => {
  const [, valuesPart] = cardStr.split(':');
  const [winningNumbers, cardNumbers] = valuesPart.split('|').map(p => getNumbers(p));

  const cardPoints = winningNumbers.length + cardNumbers.length - new Set([...winningNumbers, ...cardNumbers]).size;

  if (cardPoints > 0) {
    sum += Math.pow(2, cardPoints - 1);
  }
})

// console.log(sum)

const copies = {};

inputData.forEach(cardStr => {
  const [cardPart, valuesPart] = cardStr.split(':');
  const cardNumber = getCardNumber(cardPart);
  const [winningNumbers, cardNumbers] = valuesPart.split('|').map(p => getNumbers(p));

  const cardPoints = winningNumbers.length + cardNumbers.length - new Set([...winningNumbers, ...cardNumbers]).size;

  const copiesOfCurrentCard = (copies[cardNumber] || 0) + 1;
  copies[cardNumber] = copiesOfCurrentCard;

  for (let i = cardNumber + 1; i <= cardNumber + cardPoints; i++) {
    copies[i] = (copies[i] || 0) + copiesOfCurrentCard;
  }
});

let sum1 = 0;

Object.values(copies).map((amount) => {
  sum1 += amount;
})

console.log(sum1)
const fs = require('fs');

const inputData = fs.readFileSync('input.txt', 'utf8').split('\n');

const hands = inputData.reduce((res, inputString) => {
  const [cards, bid] = inputString.split(' ');
  return [...res, {cards, bid: +bid}]
}, []);

// console.log(hands)

const getHandType = (hand) => {
  const cardsMap = {};
  hand.split('').forEach(card => {
    cardsMap[card] = (cardsMap[card] || 0) + 1;
  });

  if (Object.keys(cardsMap).length === 1) {
    // console.log(hand, ' > ', 6)
    return 6;
  }

  if (Object.keys(cardsMap).length === 2 && Object.values(cardsMap).indexOf(4) !== -1) {
    // console.log(hand, ' > ', 5)
    return 5;
  }
  if (Object.keys(cardsMap).length === 2) {
    // console.log(hand, ' > ', 4)
    return 4;
  }

  if (Object.keys(cardsMap).length === 3 && Object.values(cardsMap).indexOf(3) !== -1) {
    // console.log(hand, ' > ', 3)
    return 3;
  }
  if (Object.keys(cardsMap).length === 3 && Object.values(cardsMap).indexOf(3) === -1) {
    // console.log(hand, ' > ', 2)
    return 2;
  }

  if (Object.keys(cardsMap).length === 4) {
    // console.log(hand, ' > ', 1)
    return 1;
  }
  // console.log(hand, ' > ', 0)
  return 0;
}

const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const sortHands = (a, b) => {
  const aValue = getHandType(a.cards);
  const bValue = getHandType(b.cards);
  if (aValue === bValue) {
    for (let i = 0; i < a.cards.length; i++) {
      const aInd = cards.indexOf(a.cards[i]);
      const bInd = cards.indexOf(b.cards[i]);
      if (aInd === bInd) {
        continue;
      }
      return aInd > bInd ? 1 : -1;
    }
  }
  return getHandType(a.cards) > getHandType(b.cards) ? 1 : -1;
}

const sortedHands = hands.sort(sortHands);

console.log(sortedHands)

const res = sortedHands.reduce((res, hand, i) => res + hand.bid * (i + 1), 0);

console.log(res)
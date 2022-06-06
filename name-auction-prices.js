'use strict';

const fs = require('fs');
const namebaseFilePath = './HNS-transaction-history-latest.csv';
const outputFilePath = 'name-auction-results.csv';

main();

async function main() {
  const namebaseData = await getNamebaseData();
  namebaseData.sort((a, b) => +a.time - +b.time);

  const namesData = namebaseData.reduce((prev, next) => {
    prev[next.domain] = prev[next.domain] || {
      domain: '',
      price: 0,
      numberOfBids: 0,
      placeBid: 0,
      revealBid: 0,
      redeemBid: 0,
      correctRevealedBid: 0,
      rollbackPlaceBid: 0,
      undoRollback: 0,
      registerBid: undefined,
    };
    prev[next.domain].domain = next.domain;
    prev[next.domain][next.type] =
      (prev[next.domain][next.type] || 0) + next.amount;
    if (next.type === 'redeemBid' || next.type === 'registerBid') {
      prev[next.domain].numberOfBids++;
    }
    return prev;
  }, {});

  Object.keys(namesData).forEach(k => {
    const val = namesData[k];
    val.price = round(
      ((+val.placeBid || 0) +
        (+val.revealBid || 0) +
        (+val.redeemBid || 0) +
        (+val.correctRevealedBid || 0) +
        (+val.rollbackPlaceBid || 0) +
        (+val.undoRollback || 0) +
        (+val.registerBid || 0)) *
        -1
    );
  });

  let csv = '';
  csv += Object.keys(Object.values(namesData)[0]).join(',');
  csv +=
    '\n' +
    toString(
      Object.values(namesData)
        .filter(a => a.registerBid !== undefined)
        .map(a => Object.values(a).join(','))
    );
  fs.writeFileSync(outputFilePath, csv);
}

function toString(obj) {
  return obj
    .map(a => (typeof a === 'string' ? a : JSON.stringify(a)))
    .join('\n');
}

function round(a) {
  return Math.round(a * 1e6) / 1e6;
}

async function getNamebaseData() {
  const all = fs.readFileSync(namebaseFilePath).toString().split('\n');
  const cols = all.splice(0, 1)[0].split(',');
  const jsonArray = all.map(a =>
    a.split(',').reduce((prev, next, index) => {
      prev[cols[index]] = next;
      return prev;
    }, {})
  );
  const result = jsonArray
    .filter(
      a =>
        [
          'placeBid',
          'revealBid',
          'redeemBid',
          'registerBid',
          'correctRevealedBid',
          'rollbackPlaceBid',
          'undoRollback',
        ].indexOf(a.transactionType) !== -1
    )
    .map(a => ({
      time: new Date(a.timestamp),
      type: a.transactionType,
      unit: 'HNS',
      amount: +a.hnsDelta,
      domain: a['extra.domain'],
    }));
  return result;
}

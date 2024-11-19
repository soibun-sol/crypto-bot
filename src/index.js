const { monitorTransactions } = require('./monitor');

console.log('Starting Wallet Monitor...');
setInterval(monitorTransactions, 5000);
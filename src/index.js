import { monitorTransactions } from ('./monitor');

console.log('Starting Wallet Monitor...');
setInterval(monitorTransactions, 5000);
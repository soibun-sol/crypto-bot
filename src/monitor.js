const axios = require('axios');
const { sendNoitification } = require('./notification');
const{ walletAdrress, heliusApiKey } = require('./config');

const API_URL = 'https://api.helius.dev/v0/addresses/${walletAddress}/transactions';

async function monitorTransactions() {
    try {
        const response = await axios.get(API_URL, {
            apiKey: heliusApiKey,
        });
        const transactions = response.data;
        transactions.forEach((transaction) => {
            if (transaction.type === 'BUY') {
                console.log('Buy transaction detected:', transaction);
                sendNotification(transaction);
            }
        });
    } catch(error) {
        console.error('Error fetching transactions:', error);
    }
}    

module.exports = { monitorTransactions };
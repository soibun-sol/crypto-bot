import axios from ('axios');
import { sendNotification } from ('./notification');
import { walletAddress, heliusApiKey } from ('./config');

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

export { monitorTransactions };
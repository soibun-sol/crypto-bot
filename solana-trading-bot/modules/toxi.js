const { bot } = require('./telegram');

const TOXI_CHAT_ID = process.env.TOXI_BOT_CHAT_ID;

// Function to monitor the Toxi Solana Bot for whale transactions
function monitorToxiBot() {
    bot.on('message', (msg) => {
        if (msg.chat.id.toString() === TOXI_CHAT_ID) {
            console.log("New message from Toxi Bot:", msg.text);
            parseToxiMessage(msg.text);
        }
    });
}

// Function to parse Toxi Bot messages and extract wallet addresses or transactions
function parseToxiMessage(message) {
    const walletRegex = /([a-zA-Z0-9]{32,44})/; // Regex for Solana wallet addresses
    const walletMatch = message.match(walletRegex);

    if (walletMatch) {
        const walletAddress = walletMatch[0];
        console.log(`Wallet Address Detected: ${walletAddress}`);
        // Add further logic to analyze the wallet
    }
}

module.exports = { monitorToxiBot };
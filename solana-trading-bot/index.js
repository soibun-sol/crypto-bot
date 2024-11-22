const dotenv = require('dotenv');
const { initializeTelegramBot } = require('./modules/telegram');
const { monitorToxiBot } = require('./modules/toxi');
const { analyzeToken } = require('./modules/tokenAnalysis');
const { buyToken, sellToken } = require('./modules/tradeExecution');

dotenv.config();

async function main() {
    console.log("Starting Solana Trading Bot...");

    // Initialize Telegram Bot
    await initializeTelegramBot();

    // Monitor Toxi Solana Bot for Whale Signals
    monitorToxiBot(async (walletAddress, tokenAddress) => {
        console.log(`Analyzing wallet: ${walletAddress}`);
        console.log(`Detected token: ${tokenAddress}`);

        // Step 1: Analyze Token
        const isTokenSafe = await analyzeToken(tokenAddress);
        if (!isTokenSafe) {
            console.log("Token failed safety checks. Skipping...");
            return;
        }

        // Step 2: Execute Buy Trade
        const amountToBuy = 0.5; // Example: 0.5 SOL
        const buyResult = await buyToken(tokenAddress, amountToBuy);
        if (buyResult) {
            console.log(`Buy trade successful: ${buyResult}`);
        } else {
            console.log("Buy trade failed.");
        }
    });

    console.log("Solana Trading Bot is live and monitoring...");
}

main();
import dotenv from 'dotenv';

module.exports = {
    // Load environment variables from .env file
    solanaRpcUrl: process.env.SOLANA_RPC_URL,
    walletAddress: process.env.WALLET_ADDRESS,
    email:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        recipient: process.env.EMAIL_RECIPIENT
    },
    heliusApiKey: process.env.HELIUS_API_KEY,
};
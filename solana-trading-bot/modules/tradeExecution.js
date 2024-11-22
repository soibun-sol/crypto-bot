const { Connection, Keypair, PublicKey, Transaction, SystemProgram } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const axios = require('axios');
require('dotenv').config();

const SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com'; // Solana mainnet RPC URL
const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Load private key for wallet (store this securely)
const WALLET_PRIVATE_KEY = JSON.parse(process.env.WALLET_PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(Uint8Array.from(WALLET_PRIVATE_KEY));

// Constants for trade execution
const MAX_SPEND = 1; // Maximum amount of SOL to spend per trade
const SLIPPAGE_PERCENTAGE = 0.5; // Allowed slippage (e.g., 0.5%)

/**
 * Fetch Token Account Info
 * @param {string} tokenAddress - The SPL token address.
 */
async function getTokenAccountInfo(tokenAddress) {
    try {
        const tokenPublicKey = new PublicKey(tokenAddress);
        const tokenAccount = await connection.getParsedAccountInfo(tokenPublicKey);
        return tokenAccount;
    } catch (error) {
        console.error('Error fetching token account info:', error);
        return null;
    }
}

/**
 * Execute a Buy Order
 * @param {string} tokenAddress - The token to buy.
 * @param {number} amountSOL - Amount of SOL to spend.
 */
async function buyToken(tokenAddress, amountSOL) {
    try {
        console.log(`Initiating buy order for ${tokenAddress} with ${amountSOL} SOL.`);

        // Fetch token info (replace with DEX API calls for better pricing and liquidity info)
        const tokenInfo = await getTokenAccountInfo(tokenAddress);
        if (!tokenInfo) {
            console.error('Token info not found. Aborting trade.');
            return false;
        }

        // Estimate token price using Serum/Raydium API
        const estimatedPrice = await estimatePrice(tokenAddress, amountSOL, 'buy');
        if (!estimatedPrice) {
            console.error('Could not estimate price. Aborting trade.');
            return false;
        }

        // Prepare transaction (simplified example, replace with actual DEX swap logic)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(tokenAddress),
                lamports: amountSOL * 1e9, // Convert SOL to lamports
            })
        );

        // Sign and send transaction
        const signature = await connection.sendTransaction(transaction, [wallet]);
        console.log(`Buy transaction sent. Signature: ${signature}`);

        return signature;
    } catch (error) {
        console.error('Error executing buy order:', error);
        return null;
    }
}

/**
 * Execute a Sell Order
 * @param {string} tokenAddress - The token to sell.
 * @param {number} amountTokens - Amount of tokens to sell.
 */
async function sellToken(tokenAddress, amountTokens) {
    try {
        console.log(`Initiating sell order for ${tokenAddress} with ${amountTokens} tokens.`);

        // Prepare sell logic (replace with DEX API swap logic)
        const transaction = new Transaction().add(
            Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                wallet.publicKey,
                new PublicKey(tokenAddress),
                wallet.publicKey,
                [],
                amountTokens
            )
        );

        // Sign and send transaction
        const signature = await connection.sendTransaction(transaction, [wallet]);
        console.log(`Sell transaction sent. Signature: ${signature}`);

        return signature;
    } catch (error) {
        console.error('Error executing sell order:', error);
        return null;
    }
}

/**
 * Estimate the price of a token using a DEX API
 * @param {string} tokenAddress - The token to estimate.
 * @param {number} amountSOL - Amount of SOL to spend.
 * @param {string} action - "buy" or "sell".
 */
async function estimatePrice(tokenAddress, amountSOL, action = 'buy') {
    try {
        const response = await axios.get(`https://api.dexscreener.com/latest/dex/pairs/${tokenAddress}`);
        const pairData = response.data?.pairs[0];
        if (!pairData) {
            console.error('No pair data found for token.');
            return null;
        }

        // Calculate price based on action (buy/sell)
        const price = action === 'buy'
            ? pairData.priceUsd * (1 + SLIPPAGE_PERCENTAGE / 100) // Include slippage for buys
            : pairData.priceUsd * (1 - SLIPPAGE_PERCENTAGE / 100); // Include slippage for sells

        console.log(`Estimated ${action} price for ${tokenAddress}: $${price}`);
        return price;
    } catch (error) {
        console.error('Error estimating price:', error);
        return null;
    }
}

(async () => {
    const tokenAddress = 'TokenAddressHere'; // Replace with the actual token address
    const amountSOL = 0.5; // Amount of SOL to spend
    const result = await buyToken(tokenAddress, amountSOL);
    if (result) {
        console.log(`Buy order completed successfully. Transaction: ${result}`);
    }
})();

(async () => {
    const tokenAddress = 'TokenAddressHere'; // Replace with the actual token address
    const amountTokens = 100; // Amount of tokens to sell
    const result = await sellToken(tokenAddress, amountTokens);
    if (result) {
        console.log(`Sell order completed successfully. Transaction: ${result}`);
    }
})();

module.exports = { buyToken, sellToken };
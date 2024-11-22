const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });

// Function to initialize the Telegram bot
function initializeTelegramBot() {
    bot.on('message', (msg) => {
        console.log(`Received message from ${msg.chat.id}: ${msg.text}`);
        // Add custom responses or commands here
    });

    console.log("Telegram Bot initialized.");
    return bot;
}

module.exports = { bot, initializeTelegramBot };
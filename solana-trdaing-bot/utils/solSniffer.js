const axios = require('axios');

async function checkTokenSafety(tokenAddress) {
    try {
        const response = await axios.get(`https://api.solsniffer.com/check?token=${tokenAddress}`);
        return response.data;
    } catch (error) {
        console.error("Error checking token safety:", error.message);
    }
}

module.exports = { checkTokenSafety };
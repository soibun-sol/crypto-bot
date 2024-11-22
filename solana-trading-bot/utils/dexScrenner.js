const axios = require('axios');

async function getTokenMetrics(tokenAddress) {
    try {
        const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching token metrics:", error.message);
    }
}

module.exports = { getTokenMetrics };
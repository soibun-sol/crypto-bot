const axios = require('axios');

const TWEETSCOUT_API_BASE = 'https://tweetscout.io/api'; // Replace with the actual API base if TweetScout has one

/**
 * Fetch TweetScout score for a given Twitter handle.
 * @param {string} twitterHandle - The Twitter handle of the token.
 * @returns {Promise<number|null>} - Returns the TweetScout score or null if unavailable.
 */
async function getTweetScoutScore(twitterHandle) {
    try {
        console.log(`Fetching TweetScout score for: @${twitterHandle}`);
        
        // Example API call (this depends on TweetScout's actual API):
        const response = await axios.get(`${TWEETSCOUT_API_BASE}/score`, {
            params: {
                handle: twitterHandle,
            },
        });

        if (response.data && response.data.score) {
            console.log(`TweetScout Score for @${twitterHandle}: ${response.data.score}`);
            return response.data.score;
        }

        console.log(`No score available for @${twitterHandle}.`);
        return null;
    } catch (error) {
        console.error(`Error fetching TweetScout score for @${twitterHandle}:`, error.message);
        return null;
    }
}

/**
 * Check if a Twitter handle meets the minimum TweetScout score.
 * @param {string} twitterHandle - The Twitter handle of the token.
 * @param {number} minScore - The minimum acceptable score.
 * @returns {Promise<boolean>} - Returns true if the handle meets or exceeds the score.
 */
async function isScoreSufficient(twitterHandle, minScore = 300) {
    const score = await getTweetScoutScore(twitterHandle);
    if (score !== null && score >= minScore) {
        console.log(`@${twitterHandle} meets the minimum score of ${minScore}.`);
        return true;
    }
    console.log(`@${twitterHandle} does not meet the minimum score of ${minScore}.`);
    return false;
}

module.exports = { getTweetScoutScore, isScoreSufficient };
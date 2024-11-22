const { getTokenMetrics } = require('../utils/dexScreener');
const { checkTokenSafety } = require('../utils/solSniffer');
const { isScoreSufficient } = require('../utils/tweetScout');

async function analyzeToken(tokenAddress) {
    console.log(`Analyzing token: ${tokenAddress}`);

    // Step 1: Fetch Token Metrics
    const metrics = await getTokenMetrics(tokenAddress);
    if (!metrics) {
        console.log("Token metrics unavailable. Skipping...");
        return false;
    }

    // Step 2: Safety Check via SolSniffer
    const safetyReport = await checkTokenSafety(tokenAddress);
    if (!safetyReport || safetyReport.status !== 'safe') {
        console.log("Token failed safety checks.");
        return false;
    }

    console.log("Token passed all analysis steps.");
    return true;
}

async function analyzeTokenMediaSupport(twitterHandle) {
    const MIN_SCORE = 300;

    const isSupported = await isScoreSufficient(twitterHandle, MIN_SCORE);
    if (isSupported) {
        console.log(`Media support for @${twitterHandle} is strong.`);
        return true;
    } else {
        console.log(`Media support for @${twitterHandle} is insufficient.`);
        return false;
    }
}

module.exports = { analyzeToken ,analyzeTokenMediaSupport };
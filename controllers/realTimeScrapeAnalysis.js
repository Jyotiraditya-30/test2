// import { runTruthSocialScraper } from "../services/apiService.js";
// import { analyzePostWithGPT } from "../services/gptService.js";
// import Post from "../models/postModel.js";

// let isRunning = false;
// let scraperIntervalId = null;

// export const scraper = (username, intervalInMs = 60000) => {
//     if (scraperIntervalId) {
//         console.log("Scraper already running.");
//         return;
//     }

//     scraperIntervalId = setInterval(async () => {
//         if (isRunning) return;
//         isRunning = true;

//         try {
//             const posts = await runTruthSocialScraper(username, 10);

//             for (const post of posts) {
//                 const exists = await Post.findOne({ content: post.content });

//                 if (!exists) {
//                     await Post.create({
//                         username,
//                         content: post.content,
//                         url: post.url,
//                         createdAt: new Date(post.created_at),  // 💡 from Apify
//                         fetchedAt: new Date()                 // 💡 your fetch timestamp
//                     });
//                 }
//             }
//         } catch (err) {
//             console.error("Scraper error:", err.message);
//         }

//         isRunning = false;
//     }, intervalInMs);
// };


// export const analyze = async (req, res) => {
//     try {
//         const posts = await Post.find({ gptResponse: { $exists: false } });

//         for (const post of posts) {
//             try {
//                 const gptResponse = await analyzePostWithGPT(post.content);
//                 post.gptResponse = gptResponse;
//                 post.gptAnsweredAt = new Date();
//                 await post.save();
//             } catch (err) {
//                 console.error("GPT error:", err.message, "Post ID:", post._id);
//             }
//         }

//         res.json({ success: true, message: "GPT analysis completed." });
//     } catch (err) {
//         console.error("Analyze error:", err.message);
//         res.status(500).json({ success: false, error: err.message });
//     }
// };

// export const startScraperHandler = (req, res) => {
//     const { username, intervalInMs } = req.body;
//     if (!username) {
//         return res.status(400).json({ success: false, error: "Username is required." });
//     }

//     scraper(username, intervalInMs || 60000);
//     res.json({ success: true, message: `Scraper started for @${username}.` });
// };

// // ✅ NEW: Get latest stored posts from MongoDB
// export const getStoredPosts = async (req, res) => {
//     try {
//         const posts = await Post.find()
//             .sort({ createdAt: -1 })
//             .limit(20);

//         res.status(200).json({ posts });
//     } catch (err) {
//         console.error("Fetch posts error:", err.message);
//         res.status(500).json({ error: "Failed to fetch posts from DB." });
//     }
// };


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ update +++++++++++++++++++++++++++++++++++++++++++++++++ //

import { runTruthSocialScraper } from "../services/apiService.js";
import { analyzePostWithGPT } from "../services/gptService.js";
import Post from "../models/postModel.js";

let isRunning = false;
let scraperIntervalId = null;
let scraperUsername = "realdonaldtrump"; // default

// Run one-time scrape & analyze
const scraper = async (username) => {
    if (isRunning) return;
    isRunning = true;

    try {
        const posts = await runTruthSocialScraper(username, 5);

        for (const post of posts) {
            const exists = await Post.findOne({ content: post.content });

            if (exists) {
                console.log(`✅ Already exists: ${post.content.slice(0, 50)}...`);
                continue;
            }

            console.log(`🆕 New post found. Saving to DB: ${post.content.slice(0, 50)}...`);

            await Post.create({
                username,
                content: post.content,
                url: post.url,
                createdAt: new Date(post.created_at),
                fetchedAt: new Date()
            });
        }
    } catch (err) {
        console.error("Scraper error:", err.message);
    }

    isRunning = false;
};

const analyzeUnprocessedPosts = async () => {
    const posts = await Post.find({ gptResponse: { $exists: false } });

    for (const post of posts) {
        try {
            console.log(`🧠 Analyzing post ID ${post._id}`);
            const gptResponse = await analyzePostWithGPT(post.content);
            post.gptResponse = gptResponse;
            post.gptAnsweredAt = new Date();
            await post.save();
        } catch (err) {
            console.error("GPT error:", err.message, "Post ID:", post._id);
        }
    }
};

// 🟢 Start real-time loop
export const startScraperLoop = async (req, res) => {
    const { username = "realdonaldtrump", intervalInMs = 60000 } = req.body;

    if (scraperIntervalId) {
        return res.json({ success: false, message: "Scraper already running." });
    }

    scraperUsername = username;
    scraperIntervalId = setInterval(async () => {
        await scraper(scraperUsername);
        await analyzeUnprocessedPosts();
    }, intervalInMs);

    console.log(`🔁 Scraper started for @${scraperUsername} every ${intervalInMs / 1000}s`);
    res.json({ success: true, message: `Scraper started for @${scraperUsername}.` });
};

// 🔴 Stop real-time loop
export const stopScraperLoop = (req, res) => {
    if (scraperIntervalId) {
        clearInterval(scraperIntervalId);
        scraperIntervalId = null;
        console.log("⛔ Scraper stopped.");
        res.json({ success: true, message: "Scraper stopped." });
    } else {
        res.json({ success: false, message: "Scraper is not running." });
    }
};

// 🧠 One-time scrape and analyze
export const startScraperAndAnalyze = async (req, res) => {
    const { username = "realdonaldtrump" } = req.body;

    try {
        await scraper(username);
        await analyzeUnprocessedPosts();
        res.json({ success: true, message: `Scraping and GPT analysis completed for @${username}.` });
    } catch (err) {
        console.error("Combined handler error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getStoredPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({ posts });
    } catch (err) {
        console.error("Fetch posts error:", err.message);
        res.status(500).json({ error: "Failed to fetch posts from DB." });
    }
};

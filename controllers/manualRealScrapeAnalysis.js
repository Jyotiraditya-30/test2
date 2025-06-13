import { getPosts } from "../services/ManualTruthScrapingService.js";
import { analyzePostWithGPT } from "../services/gptService.js";
import testModel from "../models/testModel.js";

// 🧠 One-time run: scrape + analyze
// export const runManualScraperOnce = async (req, res) => {
//   const { username = "PhonatoStudio" } = req.body;

//   try {
//     const posts = await getPosts();
    
//     for (const post of posts) {
//       console.log("post",post)
//       const exists = await testModel.findOne({ content: post.text });
//       if (exists) continue;

//       await testModel.create({
//         username,
//         content: post.text,
//         url: post.postUrl,
//         createdAt: new Date(post.uploadTime),
//         fetchedAt: new Date(post.fetchedAt),
//       });
//     }

//     const unprocessed = await testModel.find({ gptResponse: { $exists: false } });

//     for (const post of unprocessed) {
//       try {
//         const gptResponse = await analyzePostWithGPT(post.content);
//         post.gptResponse = gptResponse;
//         post.gptAnsweredAt = new Date();
//         await post.save();
//       } catch (err) {
//         console.error("GPT analysis error:", err.message);
//       }
//     }

//     res.json({ success: true, message: "Manual scraping & GPT analysis completed." });

//   } catch (err) {
//     console.error("Manual scraper error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// 📦 Get latest scraped + analyzed posts
export const getManualScrapedPosts = async (req, res) => {
  try {
    const posts = await testModel.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ posts });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch posts from DB." });
  }
};

// import { runTruthSocialScraper } from "../services/apiService.js";
// import { analyzePostWithGPT } from "../services/gptService.js";

// export const analyzeTrumpPosts = async (req, res) => {
//   try {
//     const posts = await runTruthSocialScraper();

//     const analyzedPosts = [];
//     for (const post of posts) {
//       const gptAnalysis = await analyzePostWithGPT(post.content);
//       analyzedPosts.push({
//         post: post.content,
//         createdAt: post.createdAt,
//         url: post.url,
//         gptAnalysis
//       });
//     }

//     res.json({ success: true, analyzedPosts });
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++ updated ++++++++++++++++++++++++++++++++++++++++++++++ //

import { runTruthSocialScraper } from "../services/apiService.js";
import { analyzePostWithGPT } from "../services/gptService.js";

export const analyzeTruthPosts = async (req, res) => {
  const { username, maxPosts } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, error: "Username is required" });
  }

  try {
    const posts = await runTruthSocialScraper(username, maxPosts || 5);

    const analyzedPosts = [];
    for (const post of posts) {
      const gptAnalysis = await analyzePostWithGPT(post.content);
      analyzedPosts.push({
        post: post.content,
        createdAt: post.createdAt,
        url: post.url,
        gptAnalysis
      });
    }

    res.json({ success: true, analyzedPosts });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};


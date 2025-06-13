// import { runTruthSocialScraper } from "../services/apiService.js";

// export const scrapeTrumpPosts = async (req, res) => {
//   try {
//     const posts = await runTruthSocialScraper();

//     // You can limit fields if you like
//     const scrapedPosts = posts.map(post => ({
//       post: post.content,
//       createdAt: post.createdAt,
//       url: post.url,
//     }));

//     res.json({ success: true, posts: scrapedPosts });
//   } catch (err) {
//     console.error("Error:", err.message);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

//++++++++++++++++++++++++++++++++++++++++ UPDATE ++++++++++++++++++++++++++++++++++++++++++//

import { runTruthSocialScraper } from "../services/apiService.js";

export const scrapeTruthPosts = async (req, res) => {
  const { username, maxPosts } = req.body;

  if (!username) {
    return res.status(400).json({ success: false, error: "Username is required" });
  }

  try {
    const posts = await runTruthSocialScraper(username, maxPosts || 5);

    const scrapedPosts = posts.map(post => ({
      post: post.content,
      createdAt: post.createdAt,
      url: post.url,
    }));

    res.json({ success: true, posts: scrapedPosts });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

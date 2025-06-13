// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Path to the latest.json file
// const LATEST_JSON_PATH = path.resolve(__dirname, '../services/latest.json');

// // GET /api/posts — returns full list of recent posts
// router.get('/posts', (req, res) => {
//   try {
//     if (!fs.existsSync(LATEST_JSON_PATH)) {
//       return res.status(404).json({ message: 'No data found' });
//     }

//     const data = fs.readFileSync(LATEST_JSON_PATH, 'utf-8');
//     const posts = JSON.parse(data);
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: 'Error reading post history', error: err.message });
//   }
// });

// // GET /api/posts/latest — returns the latest post only
// router.get('/posts/latest', (req, res) => {
//   try {
//     if (!fs.existsSync(LATEST_JSON_PATH)) {
//       return res.status(404).json({ message: 'No data found' });
//     }

//     const data = fs.readFileSync(LATEST_JSON_PATH, 'utf-8');
//     const posts = JSON.parse(data);

//     if (!Array.isArray(posts) || posts.length === 0) {
//       return res.status(404).json({ message: 'No posts available' });
//     }

//     const latestPost = posts[posts.length - 1];
//     res.json(latestPost);
//   } catch (err) {
//     res.status(500).json({ message: 'Error reading latest post', error: err.message });
//   }
// });

// export default router;


import express from "express";
import {  getManualScrapedPosts} from "../controllers/manualRealScrapeAnalysis.js";

const router = express.Router();


// 👇 Fetch latest posts from DB
router.get("/posts", getManualScrapedPosts);

export default router;

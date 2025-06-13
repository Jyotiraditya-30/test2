// import express from "express";
// import { scrapeTrumpPosts } from "../controllers/scrapeController.js";
// const router = express.Router();

// router.get("/scrape-posts", scrapeTrumpPosts);

// export default router;

//++++++++++++++++++++++++++++++++++++++++++++++ update ++++++++++++++++++++++++++++++++++ //

import express from "express";
import { scrapeTruthPosts} from "../controllers/scrapeController.js";
const router = express.Router();

router.post("/scrape-posts", scrapeTruthPosts);

export default router;

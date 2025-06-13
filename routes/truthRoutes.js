// import express from "express";
// import { analyzeTrumpPosts } from "../controllers/TruthController.js";

// const router = express.Router();
// router.get("/scrape-analyze", analyzeTrumpPosts);
// export default router;

// +++++++++++++++++++++++++++++++ update +++++++++++++++++++++++++++++++++ //

import express from "express";
import { analyzeTruthPosts} from "../controllers/TruthController.js";

const router = express.Router();
router.post("/scrape-analyze", analyzeTruthPosts);
export default router;

import express from "express";
import { startScraperLoop,stopScraperLoop,startScraperAndAnalyze,getStoredPosts} from "../controllers/realTimeScrapeAnalysis.js";

const router = express.Router();

// router.post("/start-scraper", startScraperHandler);
// router.post("/run-analysis", analyze);

router.post("/scraper/start", startScraperLoop);      // Real-time start
router.post("/scraper/stop", stopScraperLoop);        // Real-time stop
router.post("/scraper/once", startScraperAndAnalyze); // One-time execution
router.get("/posts", getStoredPosts);  


export default router;

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import truthRoutes from "./routes/truthRoutes.js";
import scrapeRoutes from "./routes/scrapeRoutes.js"
import { runTruthSocialScraper } from "./services/apiService.js";
import realTimeRoutes from "./routes/realTimeRoutes.js"
import connectDB from './config/Db.js';
import { startWatcherLoop } from "./services/ManualTruthScrapingService.js";
// import scraperRoutes from  './routes/manualScraperRoutes.js'
import manualScraperRoutes from './routes/manualScraperRoutes.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3001;
const app = express();
startWatcherLoop();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with the env value
// connectDB(process.env.MONGO_URI);
// app.use("/truth", truthRoutes);
// app.use("/scrape", scrapeRoutes)
// app.use("/realtime", realTimeRoutes);
// // app.use('/api', scraperRoutes);
// app.use('/manual', manualScraperRoutes);

app.use('/api/manual', manualScraperRoutes);
app.use('/api/truth', truthRoutes);
app.use('/api/scrape', scrapeRoutes);
app.use('/api/realtime', realTimeRoutes);


// setInterval(async () => {
//   try {
//     const autoPosts = await runTruthSocialScraper("realdonaldtrump", 5);
//     console.log("Auto scrape result:", autoPosts.length);
//     // Optionally: Save to DB, notify frontend via WebSocket, etc.
//   } catch (err) {
//     console.error("Auto scrape failed:", err.message);
//   }
// }, 5 * 60 * 1000); // every 5 minutes


// Start the server
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`server listening on port: ${PORT}`);
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server listening on port: ${PORT}`);
  });

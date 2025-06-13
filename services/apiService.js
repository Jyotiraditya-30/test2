// import axios from "axios";
// import wait from "../utils/wait.js";
// import dotenv from "dotenv";
// dotenv.config();

// const APIFY_TOKEN = process.env.APIFY_TOKEN;
// const ACTOR_ID = "muhammetakkurtt~truth-social-scraper";

// export const runTruthSocialScraper = async () => {
//   const startRunRes = await axios.post(
//     `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
//     {
//       usernames: ["realDonaldTrump"],
//       maxPosts: 5
//     }
//   );

//   const runId = startRunRes.data.data.id;

//   let runStatus;
//   do {
//     const statusRes = await axios.get(
//       `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
//     );
//     runStatus = statusRes.data.data.status;
//     if (runStatus !== "SUCCEEDED") await wait(3000);
//   } while (runStatus !== "SUCCEEDED");

//   const datasetId = startRunRes.data.data.defaultDatasetId;
//   const dataRes = await axios.get(
//     `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
//   );

//   return dataRes.data;
// };


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ updated ++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

import axios from "axios";
import wait from "../utils/wait.js";
import dotenv from "dotenv";
dotenv.config();

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "muhammetakkurtt~truth-social-scraper";

export const runTruthSocialScraper = async (username, maxPosts) => {
  const startRunRes = await axios.post(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
    {
      usernames: [username],
      maxPosts
    }
  );

  const runId = startRunRes.data.data.id;

  let runStatus;
  do {
    const statusRes = await axios.get(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
    );
    runStatus = statusRes.data.data.status;
    if (runStatus !== "SUCCEEDED") await wait(3000);
  } while (runStatus !== "SUCCEEDED");

  const datasetId = startRunRes.data.data.defaultDatasetId;
  const dataRes = await axios.get(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
  );

  return dataRes.data;
};


//++++++++++++++++++++++++++++++++++++++++++++ Auto Running +++++++++++++++++++++++++++++++++++++++++ //

// import axios from "axios";
// import wait from "../utils/wait.js";
// import dotenv from "dotenv";
// dotenv.config();

// const APIFY_TOKEN = process.env.APIFY_TOKEN;
// const ACTOR_ID = "muhammetakkurtt~truth-social-scraper";

// // Optional: Wrap run in a function to reuse from cron/schedule too
// export const runTruthSocialScraper = async (username, maxPosts = 5) => {
//   if (!username) throw new Error("Username is required");

//   // Start actor run
//   const { data: runStart } = await axios.post(
//     `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
//     { usernames: [username], maxPosts }
//   );

//   const runId = runStart.data.id;

//   // Poll for status
//   let status;
//   do {
//     const { data: statusData } = await axios.get(
//       `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
//     );
//     status = statusData.data.status;

//     if (status !== "SUCCEEDED" && status !== "FAILED") {
//       await wait(3000); // Poll every 3s
//     } else if (status === "FAILED") {
//       throw new Error("Scraping failed");
//     }
//   } while (status !== "SUCCEEDED");

//   // Fetch dataset
//   const datasetId = runStart.data.defaultDatasetId;
//   const { data: items } = await axios.get(
//     `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
//   );

//   return items;
// };

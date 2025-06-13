import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  username: String,
  content: String,
  url: String,
  createdAt: Date,
  fetchedAt: Date,      // When we scraped it
  gptResponse: String,
  gptAnsweredAt: Date   // When GPT responded
});

export default mongoose.model("Test", TestSchema);

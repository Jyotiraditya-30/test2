import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  username: String,
  content: String,
  url: String,
  createdAt: Date,
  fetchedAt: Date,      // When we scraped it
  gptResponse: String,
  gptAnsweredAt: Date   // When GPT responded
});

export default mongoose.model("Post2", PostSchema);

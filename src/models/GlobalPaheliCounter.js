import mongoose from "mongoose";

const GlobalPaheliCounterSchema = new mongoose.Schema({
  // Use a fixed ID to ensure only one document exists
  _id: { type: String, default: "global-counters" },
  lastAssignedIndex: { type: [Number], default: [0, 0, 0, 0, 0, 0, 0] }, // Change this line
});

export default mongoose.models.GlobalPaheliCounter || mongoose.model("GlobalPaheliCounter", GlobalPaheliCounterSchema);
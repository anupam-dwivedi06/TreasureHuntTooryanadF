import mongoose from "mongoose";

const GlobalPaheliCounterSchema = new mongoose.Schema({
  // Use a fixed ID to ensure only one document exists
  _id: { type: String, default: "global-counter" },
  lastAssignedIndex: { type: Number, default: -1 },
});

export default mongoose.models.GlobalPaheliCounter || mongoose.model("GlobalPaheliCounter", GlobalPaheliCounterSchema);
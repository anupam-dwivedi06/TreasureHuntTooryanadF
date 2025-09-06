// src/models/Progress.js
import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentSpot: { type: Number, default: 1 },
    currentPaheliId: { type: String },
    completed: { type: Boolean, default: false },
    assignedPahelis: { type: [String], default: [] }, // NEW: Track all assigned pahelis
    history: [
      {
        spot: Number,
        paheliId: String,
        solvedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Progress || mongoose.model("Progress", ProgressSchema);
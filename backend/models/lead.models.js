// models/Lead.js
import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: String,
    probability: Number,
    status: {
      type: String,
      enum: ["Verified", "To Check"],
    },
    synced: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", LeadSchema);

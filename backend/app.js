import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import leadRoutes from "./routes/lead.route.js";
import cors from "cors";
import path from "path";
import cron from "node-cron";
import { fileURLToPath } from "url";
import LeadModels from "./models/lead.models.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "../frontend/dist");

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

// Routes
app.use("/api/lead", leadRoutes);

// Serve React build
app.use(express.static(clientBuildPath));
app.get(/^(?!\/api).*/, (req, res) =>
  res.sendFile(path.join(clientBuildPath, "index.html"))
);

// CRON Job
cron.schedule("*/5 * * * *", async () => {
  try {
    const leads = await LeadModels.find({ status: "Verified", synced: false });
    if (!leads.length) return;

    const bulkOps = leads.map((lead) => ({
      updateOne: {
        filter: { _id: lead._id, synced: false },
        update: { synced: true },
      },
    }));

    await LeadModels.bulkWrite(bulkOps);

    leads.forEach((lead) =>
      console.log(
        `[CRM Sync] Sending verified lead ${lead.name} to Sales Team...`
      )
    );
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
  }
});

// Start server after DB connection
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
};

startServer();

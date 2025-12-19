import axios from "axios";
import LeadModels from "../models/lead.models.js";

export const createLeads = async (req, res) => {
  const { names } = req.body;

  if (!names || !Array.isArray(names) || names.length === 0) {
    return res.status(400).json({ error: "Names array is required" });
  }

  try {
    const leadPromises = names.map(async (name) => {
      const response = await axios.get(
        `https://api.nationalize.io/?name=${name}`
      );
      const countries = response.data.country;

      if (!countries || countries.length === 0) return null;

      const topCountry = countries.reduce((a, b) =>
        b.probability > a.probability ? b : a
      );

      const status = topCountry.probability > 0.6 ? "Verified" : "To Check";

      return {
        name,
        country: topCountry.country_id,
        probability: topCountry.probability,
        status,
      };
    });

    const leads = (await Promise.all(leadPromises)).filter(Boolean);

    if (leads.length === 0) return res.json([]);

    const createdLeads = await LeadModels.insertMany(leads);

    res.status(201).json(createdLeads);
  } catch (error) {
    console.error("❌ Lead creation failed:", error.message);
    res.status(500).json({ error: "Failed to process leads" });
  }
};

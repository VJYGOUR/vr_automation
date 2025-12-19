// routes/leads.js
import express from "express";
import { createLeads } from "../controllers/lead.controllers.js";

const router = express.Router();

router.post("/", createLeads);

export default router;

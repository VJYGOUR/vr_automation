// src/types/lead.ts
export interface Lead {
  name: string;
  country: string;
  probability: number;
  status: "Verified" | "To Check";
}

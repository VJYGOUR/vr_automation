// src/hooks/useLeads.ts
import { useState } from "react";
import api from "../api/axios";
import type { Lead } from "../types/lead";

interface UseLeadsResult {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: (names: string[]) => Promise<void>;
}

export const useLeads = (): UseLeadsResult => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async (names: string[]) => {
    if (!names.length) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post<Lead[]>("/lead", { names });
      setLeads(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { leads, loading, error, fetchLeads };
};

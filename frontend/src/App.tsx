// src/App.tsx
import { useState } from "react";

import type { FormEvent } from "react";
import { useLeads } from "./hooks/useLeads";
import LeadTable from "./components/LeadTable";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<"All" | "Verified" | "To Check">("All");
  const { leads, loading, error, fetchLeads } = useLeads();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const names = input
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    await fetchLeads(names);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Smart Lead Automation System</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border border-gray-300 p-2 rounded"
          rows={4}
          placeholder="Enter names separated by commas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex items-center mt-2 gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "All" | "Verified" | "To Check")
            }
            className="border border-gray-300 p-2 rounded"
          >
            <option>All</option>
            <option>Verified</option>
            <option>To Check</option>
          </select>
        </div>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <LeadTable leads={leads} filter={filter} />
    </div>
  );
};

export default App;

// src/components/LeadTable.tsx
import React from "react";
import type { Lead } from "../types/lead";

interface LeadTableProps {
  leads: Lead[];
  filter: "All" | "Verified" | "To Check";
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, filter }) => {
  const filteredLeads = leads.filter(
    (lead) => filter === "All" || lead.status === filter
  );

  return (
    <table className="min-w-full border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Country</th>
          <th className="px-4 py-2 border">Confidence</th>
          <th className="px-4 py-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredLeads.map((lead, idx) => (
          <tr key={idx} className="text-center">
            <td className="px-4 py-2 border">{lead.name}</td>
            <td className="px-4 py-2 border">{lead.country}</td>
            <td className="px-4 py-2 border">{lead.probability.toFixed(2)}</td>
            <td
              className={`px-4 py-2 border font-semibold ${
                lead.status === "Verified"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {lead.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;

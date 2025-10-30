"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Oct 23", Total: 18, Flagged: 2 },
  { date: "Oct 24", Total: 22, Flagged: 3 },
  { date: "Oct 25", Total: 14, Flagged: 1 },
  { date: "Oct 26", Total: 20, Flagged: 2 },
  { date: "Oct 27", Total: 25, Flagged: 4 },
  { date: "Oct 28", Total: 18, Flagged: 1 },
  { date: "Oct 29", Total: 28, Flagged: 3 },
];

export function TransactionVolumeChart() {
  return (
    <Card className="p-6 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Transaction Volume
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="Total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Flagged" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

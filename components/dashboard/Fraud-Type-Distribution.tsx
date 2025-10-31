"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Phishing", value: 35 },
  { name: "Unauthorized Access", value: 25 },
  { name: "Suspicious Patterns", value: 20 },
  { name: "Unknown Device", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

export function FraudTypeDistribution() {
  return (
    <Card className="p-8 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Fraud Type Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300} className="text-sm">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: ReactNode;
}

export function KPICard({
  title,
  value,
  change,
  changeType,
  icon,
}: KPICardProps) {
  const changeColor =
    changeType === "positive" ? "text-green-600" : "text-red-600";

  return (
    <Card className="p-6 border border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">{icon}</div>
      </div>
      <p className={`text-sm font-medium ${changeColor}`}>{change}</p>
    </Card>
  );
}

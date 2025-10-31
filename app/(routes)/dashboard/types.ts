import type { LucideIcon } from "lucide-react";

export type Metric = {
  title: string;
  value: string | number;
  change: string;
  changeColor?: "green" | "red";
  icon: LucideIcon;
};

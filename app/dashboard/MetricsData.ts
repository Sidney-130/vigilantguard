import { ShieldCheck, AlertTriangle, TrendingUp, Lock } from "lucide-react";
import { Metric } from "./types";

export const metricsData: Metric[] = [
  {
    title: "Account Safety Score",
    value: "94%",
    change: "+2.5% from last week",
    changeColor: "green",
    icon: ShieldCheck,
  },
  {
    title: "Fraud Detected",
    value: 8,
    change: "-12% from last week",
    changeColor: "green",
    icon: AlertTriangle,
  },
  {
    title: "Total Transactions",
    value: 147,
    change: "+18% from last week",
    changeColor: "green",
    icon: TrendingUp,
  },
  {
    title: "Blocked Transactions",
    value: 3,
    change: "98.2% success rate",
    changeColor: "red",
    icon: Lock,
  },
];

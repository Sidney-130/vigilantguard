import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Repeat2 } from "lucide-react";

interface Transaction {
  id: string;
  type: "Send" | "Receive" | "Swap";
  amount: string;
  currency: string;
  date: string;
  time: string;
  riskScore: string;
  status: string;
  statusColor: string;
}

const transactions: Transaction[] = [
  {
    id: "tx-001",
    type: "Send",
    amount: "0.5",
    currency: "ETH",
    date: "2025-10-29",
    time: "14:32:15",
    riskScore: "15/",
    status: "confirmed",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "tx-002",
    type: "Receive",
    amount: "1.2",
    currency: "ETH",
    date: "2025-10-29",
    time: "12:18:42",
    riskScore: "8/10",
    status: "confirmed",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "tx-003",
    type: "Swap",
    amount: "250",
    currency: "USDT",
    date: "2025-10-29",
    time: "10:45:22",
    riskScore: "92/100",
    status: "flagged",
    statusColor: "bg-orange-100 text-orange-700",
  },
];

function getTransactionIcon(type: string) {
  switch (type) {
    case "Send":
      return <ArrowUpRight className="w-5 h-5 text-red-500" />;
    case "Receive":
      return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
    case "Swap":
      return <Repeat2 className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
}

export function RecentTransactions() {
  return (
    <Card className="p-6 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recent Transaction
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                Transaction
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                Type
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                Date & Time
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                Risk Score
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      0x8f234...e9e1
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getTransactionIcon(tx.type)}
                    <span className="text-sm text-foreground">{tx.type}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-foreground">
                    {tx.amount}{" "}
                    <span className="text-muted-foreground">{tx.currency}</span>
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-foreground">
                    {tx.date}{" "}
                    <span className="text-muted-foreground">{tx.time}</span>
                  </p>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">
                    {tx.riskScore}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${tx.statusColor}`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

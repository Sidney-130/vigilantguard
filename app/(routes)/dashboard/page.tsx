import Navbar from "@/components/Navbar";
// import MetricCard from "./MetricsCard";
// import { metricsData } from "./MetricsData";
import { KPICard } from "@/components/dashboard/Kpi-Card";
import { AlertTriangle, Lock, Shield, TrendingUp } from "lucide-react";
import { TransactionVolumeChart } from "@/components/dashboard/Transaction-Volume-Chart";
import { FraudTypeDistribution } from "@/components/dashboard/Fraud-Type-Distribution";
import { KeyMetrics } from "@/components/dashboard/Key-Metrics";
import { RiskScoreTrend } from "@/components/dashboard/Risk-Score-Trend";
import { RecentTransactions } from "@/components/dashboard/Recent-Transactions";

export default function Page() {
  return (
    <div className="">
      <Navbar />
      <div className="px-8 md:px-12">
        <div className="mt-5">
          <h1 className="text-3xl text-primary font-bold">Dashboard</h1>
          <p className="text-gray-700">
            Real-time fraud detection and account monitoring
          </p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 my-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
            {metricsData.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          <div></div>
        </div> */}
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Account Safety Score"
            value="94%"
            change="+2.5% from last week"
            changeType="positive"
            icon={<Shield className="w-8 h-8 text-blue-500" />}
          />
          <KPICard
            title="Fraud Detected"
            value="8"
            change="-12% from last week"
            changeType="negative"
            icon={<AlertTriangle className="w-8 h-8 text-red-500" />}
          />
          <KPICard
            title="Total Transactions"
            value="147"
            change="+18% from last week"
            changeType="positive"
            icon={<TrendingUp className="w-8 h-8 text-green-500" />}
          />
          <KPICard
            title="Blocked Transactions"
            value="3"
            change="98.2% success rate"
            changeType="positive"
            icon={<Lock className="w-8 h-8 text-orange-500" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TransactionVolumeChart />
          </div>
          <div>
            <FraudTypeDistribution />
          </div>
        </div>

        {/* Metrics and Trend Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <KeyMetrics />
          <RiskScoreTrend />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  );
}

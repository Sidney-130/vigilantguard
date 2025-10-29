import Navbar from "@/components/Navbar";
import MetricCard from "./MetricsCard";
import { metricsData } from "./MetricsData";

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
        <div className="grid grid-cols-1 md:grid-cols-2 my-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
            {metricsData.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

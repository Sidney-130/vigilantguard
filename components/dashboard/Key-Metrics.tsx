import { Card } from "@/components/ui/card";

export function KeyMetrics() {
  return (
    <Card className="p-6 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Key Metrics
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Average Risk Score
            </p>
            <p className="text-3xl font-bold text-foreground">24/100</p>
          </div>
          <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50">
            <span className="text-2xl font-bold text-green-600">24</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Detection Accuracy</p>
            <p className="text-sm font-semibold text-foreground">97.8%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "97.8%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">False Positive Rate</p>
            <p className="text-sm font-semibold text-foreground">1.2%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: "1.2%" }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-sm font-semibold text-foreground">0.3s avg</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "30%" }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
}

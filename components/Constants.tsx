import { Shield, Fingerprint, Bell, Lock, Brain, Gauge } from "lucide-react";
import { JSX } from "react";

export interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const features: FeatureItem[] = [
  {
    icon: <Shield />,
    title: "Real-Time Protection",
    description:
      "Advanced machine learning algorithms detect and block fraudulent transactions instantly before they can harm your assets.",
  },
  {
    icon: <Fingerprint />,
    title: "Behavioral Biometrics",
    description:
      "Analyze user behavior patterns to identify anomalies and suspicious activities across your Web3 transactions.",
  },
  {
    icon: <Bell />,
    title: "Instant Alerts",
    description:
      "Get notified immediately when suspicious activity is detected with customizable alert preferences.",
  },
  {
    icon: <Lock />,
    title: "Blockchain Security",
    description:
      "Leverage blockchain technology for transparent, immutable fraud detection records and enhanced security.",
  },
  {
    icon: <Brain />,
    title: "Adaptive Learning",
    description:
      "Our AI continuously learns from new fraud patterns to stay ahead of evolving threats and scams.",
  },
  {
    icon: <Gauge />,
    title: "Risk Scoring",
    description:
      "Every transaction receives a comprehensive risk score based on multiple security factors and behavioral analysis.",
  },
];

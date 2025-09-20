import type { LucideIcon } from "lucide-react";
import { ShieldCheck, AlertTriangle, Server, Users } from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export const statsCards: StatCard[] = [
  {
    title: "Events Analyzed",
    value: "1,234,567",
    change: "+12.5% from last week",
    icon: ShieldCheck,
  },
  {
    title: "High-Severity Alerts",
    value: "89",
    change: "-2.1% from last week",
    icon: AlertTriangle,
  },
  {
    title: "Systems Monitored",
    value: "2,405",
    change: "+50 new systems",
    icon: Server,
  },
  {
    title: "Active Users",
    value: "1,892",
    change: "stable",
    icon: Users,
  },
];

export const chartData = [
  { date: "Mon", Low: 2000, Medium: 1500, High: 200, Critical: 50 },
  { date: "Tue", Low: 2200, Medium: 1800, High: 250, Critical: 60 },
  { date: "Wed", Low: 1900, Medium: 1600, High: 220, Critical: 45 },
  { date: "Thu", Low: 2500, Medium: 2000, High: 300, Critical: 75 },
  { date: "Fri", Low: 2800, Medium: 2200, High: 350, Critical: 90 },
  { date: "Sat", Low: 3200, Medium: 2500, High: 400, Critical: 110 },
  { date: "Sun", Low: 3000, Medium: 2300, High: 380, Critical: 95 },
];

export type SecurityLog = {
  id: string;
  timestamp: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  source: string;
  description: string;
  details: string;
};

export const recentLogs: SecurityLog[] = [
  {
    id: "log-001",
    timestamp: "2024-07-31T12:00:00.000Z",
    severity: "Critical",
    source: "prod-db-01",
    description: "Multiple failed login attempts followed by successful login.",
    details: "User 'admin' failed to login 15 times from IP 203.0.113.55 before a successful login. Potential brute-force attack.",
  },
  {
    id: "log-002",
    timestamp: "2024-07-31T11:55:00.000Z",
    severity: "High",
    source: "api-gateway",
    description: "Unusual traffic pattern detected from a new ASN.",
    details: "Traffic from AS6789 increased by 500% over a 10-minute period, targeting the /v1/users endpoint. Possible DDoS attempt or vulnerability scanning.",
  },
  {
    id: "log-003",
    timestamp: "2024-07-31T11:45:00.000Z",
    severity: "Medium",
    source: "web-server-03",
    description: "Outdated SSL certificate detected.",
    details: "The SSL certificate for 'legacy.example.com' expired 2 days ago. This could lead to security warnings for users and potential MITM attacks.",
  },
  {
    id: "log-004",
    timestamp: "2024-07-31T11:30:00.000Z",
    severity: "Low",
    source: "auth-service",
    description: "User password reset initiated.",
    details: "User 'j.doe' initiated a password reset from a known device. Standard procedure.",
  },
  {
    id: "log-005",
    timestamp: "2024-07-31T11:15:00.000Z",
    severity: "High",
    source: "firewall-01",
    description: "Port scan detected from external IP.",
    details: "IP address 198.51.100.22 performed a sequential scan on ports 1-1024. The IP has been temporarily blocked.",
  },
];

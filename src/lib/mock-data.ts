import type { LucideIcon } from "lucide-react";
import { Bot, MessageSquareWarning, Newspaper, TrendingUp } from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export const statsCards: StatCard[] = [
  {
    title: "Narratives Analyzed",
    value: "1,284",
    change: "+15.2% from last month",
    icon: Bot,
  },
  {
    title: "High-Risk Narratives",
    value: "73",
    change: "-3.1% from last week",
    icon: MessageSquareWarning,
  },
  {
    title: "Sources Monitored",
    value: "405",
    change: "+12 new sources",
    icon: Newspaper,
  },
  {
    title: "Engagement Trend",
    value: "3.2M",
    change: "+8.9% engagement",
    icon: TrendingUp,
  },
];

export const chartData = [
  { date: "Mon", Coordinated: 400, "Bot-like": 240, Authentic: 240, Satire: 100 },
  { date: "Tue", Coordinated: 300, "Bot-like": 139, Authentic: 221, Satire: 120 },
  { date: "Wed", Coordinated: 200, "Bot-like": 980, Authentic: 229, Satire: 80 },
  { date: "Thu", Coordinated: 278, "Bot-like": 390, Authentic: 200, Satire: 150 },
  { date: "Fri", Coordinated: 189, "Bot-like": 480, Authentic: 218, Satire: 60 },
  { date: "Sat", Coordinated: 239, "Bot-like": 380, Authentic: 250, Satire: 110 },
  { date: "Sun", Coordinated: 349, "Bot-like": 430, Authentic: 210, Satire: 90 },
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
    source: "Verified News Outlet",
    description: "False narrative about election fraud rapidly gaining traction on social media.",
    details: "A coordinated campaign is pushing a false story about voting machine manipulation, citing a debunked source. Engagement is growing at 200% per hour.",
  },
  {
    id: "log-002",
    timestamp: "2024-07-31T11:55:00.000Z",
    severity: "High",
    source: "Social Media Platform",
    description: "Bot network detected amplifying divisive content about public health.",
    details: "A network of over 500 automated accounts has been identified posting and reposting misleading health advice from a single blog.",
  },
  {
    id: "log-003",
    timestamp: "2024-07-31T11:45:00.000Z",
    severity: "Medium",
    source: "Fringe Forum",
    description: "Conspiracy theory linking 5G towers to climate change emerging.",
    details: "A new narrative is taking hold in a niche online community, unsupported by any scientific evidence. Currently contained but has potential for wider spread.",
  },
  {
    id: "log-004",
    timestamp: "2024-07-31T11:30:00.000Z",
    severity: "Low",
    source: "Fact-Checking Site",
    description: "Satirical article being misinterpreted as genuine news.",
    details: "An article from a known satire website is being shared without context, leading some users to believe its claims are real.",
  },
  {
    id: "log-005",
    timestamp: "2024-07-31T11:15:00.000Z",
    severity: "High",
    source: "State-Sponsored Outlet",
    description: "Propaganda piece targeting international relations published.",
    details: "A news outlet with known state ties has published a one-sided article aimed at influencing foreign public opinion. The narrative is being amplified by official accounts.",
  },
];

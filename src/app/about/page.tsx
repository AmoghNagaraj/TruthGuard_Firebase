import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, ShieldCheck } from "lucide-react";
import DashboardHeader from "@/components/dashboard/header";

const aboutCards = [
    {
        icon: <Target className="w-8 h-8 text-primary" />,
        title: "Our Mission",
        description: "To empower individuals and organizations with advanced tools to identify, analyze, and counter online misinformation, fostering a more informed and resilient society.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-accent" />,
        title: "How It Works",
        description: "TruthGuard uses a state-of-the-art AI model to analyze content from various online sources. It identifies manipulation techniques, propaganda, and false narratives in real-time.",
    },
    {
        icon: <Users className="w-8 h-8 text-destructive" />,
        title: "Our Team",
        description: "We are a passionate group of data scientists, journalists, and engineers dedicated to promoting digital literacy and defending the truth in the digital age.",
    }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col h-full bg-background/0 p-4 sm:p-6 lg:p-8">
       <DashboardHeader title="About TruthGuard" description="Learn about our mission to combat misinformation." />
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 mt-6">
        {aboutCards.map((card, index) => (
            <Card key={index} className="flex flex-col transition-all duration-300 hover:-translate-y-1 animate-fade-in glass-card" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        {card.icon}
                        <CardTitle className="text-xl">{card.title}</CardTitle>
                    </div>
                    <CardDescription className="pt-2">{card.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Rss, Twitter, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/header";

const sources = [
  {
    trust: "High",
    title: "Verified News Outlet",
    description: "A well-established news organization with a history of fact-based reporting. Content is generally reliable.",
    type: "Website",
    icon: <Globe className="text-primary" />,
  },
  {
    trust: "Medium",
    title: "Independent Blog",
    description: "An influential blog with a specific viewpoint. Often provides valuable insight but may contain biases.",
    type: "Blog",
    icon: <Rss className="text-yellow-500" />,
  },
  {
    trust: "Low",
    title: "Anonymous Social Media Account",
    description: "A popular but unverified social media account known for sensationalist content. Prone to spreading rumors.",
    type: "Social",
    icon: <Twitter className="text-orange-500" />,
  },
    {
    trust: "Very Low",
    title: "Known Propaganda Outlet",
    description: "An outlet identified as being state-sponsored or having a clear agenda to spread disinformation.",
    type: "Bot Network",
    icon: <Bot className="text-destructive" />,
  },
];

const trustVariantMap: Record<string, "destructive" | "default" | "secondary"> = {
    "Very Low": "destructive",
    "Low": "default",
    "Medium": "secondary",
    "High": "secondary",
};

export default function SourcesPage() {
  return (
    <div className="flex flex-col h-full bg-background/0 p-4 sm:p-6 lg:p-8">
       <DashboardHeader title="Monitored Sources" description="Manage and review the sources of information being analyzed." />
      <div className="flex-1 space-y-4 mt-6">
        {sources.map((source, index) => (
            <Card key={index} className={cn("transition-all duration-300 hover:-translate-y-1 animate-fade-in border-l-4 glass-card", 
                source.trust === 'Very Low' && 'border-destructive',
                source.trust === 'Low' && 'border-orange-500',
                source.trust === 'Medium' && 'border-yellow-500',
                source.trust === 'High' && 'border-green-500'
            )} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="mt-1">{source.icon}</div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{source.title}</CardTitle>
                            <span className="text-xs text-muted-foreground">{source.type}</span>
                        </div>
                        <CardDescription className="mt-1">{source.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Badge variant={trustVariantMap[source.trust]} className={cn(source.trust === 'Low' && 'bg-orange-500 text-white', source.trust === 'High' && 'bg-green-500/20 text-green-400 border-green-500/30')}>
                        {source.trust} Trust
                    </Badge>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

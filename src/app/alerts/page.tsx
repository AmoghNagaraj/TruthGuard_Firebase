import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const alerts = [
  {
    severity: "Critical",
    title: "Potential Brute-Force Attack Detected",
    description: "Multiple failed login attempts followed by a successful login for user 'admin' from IP 203.0.113.55.",
    timestamp: "2 minutes ago",
    icon: <AlertTriangle className="text-destructive" />,
  },
  {
    severity: "High",
    title: "Unusual Traffic Pattern Detected",
    description: "Traffic from AS6789 increased by 500% over a 10-minute period, targeting the /v1/users endpoint.",
    timestamp: "15 minutes ago",
    icon: <AlertTriangle className="text-orange-500" />,
  },
  {
    severity: "Medium",
    title: "Outdated SSL Certificate",
    description: "The SSL certificate for 'legacy.example.com' has expired, posing a security risk.",
    timestamp: "1 hour ago",
    icon: <ShieldCheck className="text-yellow-500" />,
  },
    {
    severity: "Low",
    title: "User Password Reset",
    description: "User 'j.doe' initiated a password reset from a known device.",
    timestamp: "3 hours ago",
    icon: <Info className="text-primary" />,
  },
];

const severityVariantMap: Record<string, "destructive" | "default" | "secondary"> = {
    Critical: "destructive",
    High: "default",
    Medium: "secondary",
    Low: "secondary",
};


export default function AlertsPage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 sm:p-6 lg:p-8">
       <header className="pb-8 pt-4">
        <h1 className="text-4xl font-bold text-foreground">Alerts</h1>
        <p className="text-muted-foreground mt-2">Active security alerts requiring your attention.</p>
      </header>
      <div className="flex-1 space-y-4">
        {alerts.map((alert, index) => (
            <Card key={index} className={cn("transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 animate-fade-in border-l-4", 
                alert.severity === 'Critical' && 'border-destructive',
                alert.severity === 'High' && 'border-orange-500',
                alert.severity === 'Medium' && 'border-yellow-500',
                alert.severity === 'Low' && 'border-primary'
            )} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="mt-1">{alert.icon}</div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{alert.title}</CardTitle>
                            <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                        </div>
                        <CardDescription className="mt-1">{alert.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Badge variant={severityVariantMap[alert.severity]} className={cn(alert.severity === 'High' && 'bg-orange-500 text-white')}>
                        {alert.severity}
                    </Badge>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePieChart, CalendarClock, ShieldAlert } from "lucide-react";

const reportCards = [
    {
        icon: <FilePieChart className="w-8 h-8 text-primary" />,
        title: "Weekly Security Summary",
        description: "Generate a comprehensive overview of the last 7 days of activity, including key events and trends.",
        buttonText: "Generate Weekly Report"
    },
    {
        icon: <CalendarClock className="w-8 h-8 text-accent" />,
        title: "Custom Date Range Report",
        description: "Select a specific date range to generate a detailed report of all logged events and alerts.",
        buttonText: "Select Dates"
    },
    {
        icon: <ShieldAlert className="w-8 h-8 text-destructive" />,
        title: "Vulnerability Assessment",
        description: "Create a report detailing all identified vulnerabilities and recommended mitigation steps.",
        buttonText: "Run Assessment"
    }
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 sm:p-6 lg:p-8">
       <header className="pb-8 pt-4">
        <h1 className="text-4xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-2">Generate and view historical security reports.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {reportCards.map((report, index) => (
            <Card key={index} className="flex flex-col transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        {report.icon}
                        <CardTitle className="text-xl">{report.title}</CardTitle>
                    </div>
                    <CardDescription className="pt-2">{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                    <Button className="w-full">{report.buttonText}</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

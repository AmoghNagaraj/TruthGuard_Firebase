import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FilePieChart } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-screen bg-background p-4 sm:p-6">
       <header className="py-4">
        <h1 className="text-3xl font-bold font-headline text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate and view security reports.</p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <FilePieChart className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="font-headline">Reporting Dashboard</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Report generation and analytics will be available here soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

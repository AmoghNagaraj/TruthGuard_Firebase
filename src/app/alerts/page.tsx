import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="flex flex-col h-screen bg-background p-4 sm:p-6">
       <header className="py-4">
        <h1 className="text-3xl font-bold font-headline text-foreground">Alerts</h1>
        <p className="text-muted-foreground">Manage and review security alerts.</p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <AlertTriangle className="w-12 h-12 text-destructive" />
            </div>
            <CardTitle className="font-headline">Alerts Center</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Security alert management will be available here soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen bg-background p-4 sm:p-6">
       <header className="py-4">
        <h1 className="text-3xl font-bold font-headline text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your application settings.</p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Settings className="w-12 h-12 text-accent animate-spin" style={{ animationDuration: '5s' }} />
                </div>
                <CardTitle className="font-headline">Settings</CardTitle>
                <CardDescription>This section is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Configuration options will be available here soon.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

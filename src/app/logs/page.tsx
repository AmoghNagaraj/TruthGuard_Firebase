import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LogsPage() {
  return (
    <div className="flex flex-col h-screen bg-background p-4 sm:p-6">
      <header className="py-4">
        <h1 className="text-3xl font-bold font-headline text-foreground">Logs</h1>
        <p className="text-muted-foreground">Review detailed activity logs.</p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="font-headline">Logs Page</CardTitle>
            <CardDescription>This section is under construction.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Detailed log data and filtering options will be available here soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

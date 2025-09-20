import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 sm:p-6 lg:p-8">
       <header className="pb-8 pt-4">
        <h1 className="text-4xl font-bold font-headline text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and application settings.</p>
      </header>
      <div className="space-y-8 max-w-4xl mx-auto">
        <Card className="transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center gap-4">
                <User className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="font-headline text-xl">Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Admin" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="User" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@sentinelview.com" />
                </div>
                <Button>Update Profile</Button>
            </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center gap-4">
                <Bell className="w-8 h-8 text-accent" />
                <div>
                    <CardTitle className="font-headline text-xl">Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive an email for critical security alerts.
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
                 <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                           Get real-time alerts on your mobile device.
                        </p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>

        <Card className="border-destructive/50 transition-all duration-300 hover:bg-destructive/5 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader className="flex flex-row items-center gap-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <div>
                    <CardTitle className="font-headline text-xl text-destructive">Danger Zone</CardTitle>
                    <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
                    <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently remove your account and all data.</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

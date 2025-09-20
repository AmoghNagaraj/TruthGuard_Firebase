import { TruthGuardLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
       <Card className="mx-auto max-w-sm w-full glass-card animate-fade-in">
        <CardHeader className="space-y-2 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
                <TruthGuardLogo className="w-12 h-12 text-primary" />
                <span className="font-headline text-3xl font-bold text-primary">TruthGuard</span>
            </div>
          <CardTitle className="text-2xl font-bold pt-4">Welcome Back</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required defaultValue="admin@truthguard.org" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Link href="/dashboard" className="w-full">
                <Button type="submit" className="w-full">
                Login
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

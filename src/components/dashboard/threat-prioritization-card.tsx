'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleThreatPrioritization } from '@/app/actions';
import type { ThreatPrioritizationOutput } from '@/ai/flows/threat-prioritization';
import { Loader2, Sparkles } from 'lucide-react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import * as ProgressPrimitive from "@radix-ui/react-progress"

const formSchema = z.object({
  threatDescription: z.string().min(1, 'Threat description is required.'),
  logData: z.string().min(1, 'Log data is required.'),
  vulnerabilityData: z.string().optional(),
  riskFactors: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ThreatPrioritizationCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThreatPrioritizationOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threatDescription: 'Multiple failed login attempts followed by successful login from a suspicious IP address.',
      logData: `[${new Date().toISOString()}] Failed login for user 'admin' from 203.0.113.55\n[${new Date().toISOString()}] Failed login for user 'admin' from 203.0.113.55\n[${new Date().toISOString()}] Successful login for user 'admin' from 203.0.113.55`,
      vulnerabilityData: '',
      riskFactors: 'The user account has high privileges.',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setResult(null);
    const response = await handleThreatPrioritization(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      console.error('Prioritization failed:', response.error);
    }
    setLoading(false);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-destructive';
    if (score >= 5) return 'bg-orange-500';
    return 'bg-green-500';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI Threat Prioritization
        </CardTitle>
        <CardDescription>
          Get an AI-powered assessment of security threats.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="threatDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threat Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Multiple failed login attempts..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Log Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste relevant log data here"
                      className="font-mono text-xs"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vulnerabilityData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vulnerability Data (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., CVE-2023-12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="riskFactors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Factors (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., System hosts sensitive data" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Prioritize Threat'
              )}
            </Button>
          </form>
        </Form>
        {result && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold font-headline">Assessment Result</h3>
             <div>
                <div className="mb-2 flex justify-between items-baseline">
                    <h4 className="text-sm font-medium">Severity Score</h4>
                    <span className={cn("text-xl font-bold", getScoreColor(result.severityScore).replace('bg-','text-'))}>{result.severityScore} / 10</span>
                </div>
                <Progress value={result.severityScore * 10} className="h-3" indicatorClassName={getScoreColor(result.severityScore)} />
            </div>
            <div>
              <h4 className="font-medium">Impact Assessment</h4>
              <p className="text-sm text-muted-foreground">{result.impactAssessment}</p>
            </div>
             <div>
              <h4 className="font-medium">Recommended Actions</h4>
              <p className="text-sm text-muted-foreground">{result.recommendedActions}</p>
            </div>
            <div>
              <h4 className="font-medium">Justification</h4>
              <p className="text-sm text-muted-foreground">{result.justification}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Custom progress component to allow changing indicator color
const CustomProgress = React.forwardRef<
  React.ElementRef<typeof Progress>,
  React.ComponentPropsWithoutRef<typeof Progress> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <Progress
    ref={ref}
    className={className}
    {...props}
    value={value}
  />
));
CustomProgress.displayName = Progress.displayName;

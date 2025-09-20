'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { handleThreatAnalysis } from '@/app/actions';
import type { ThreatAnalysisOutput } from '@/ai/flows/threat-analysis-flow';
import { Loader2, Sparkles, CheckCircle, ShieldAlert } from 'lucide-react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  threatDescription: z.string().min(1, 'Threat description is required.'),
  logData: z.string().min(1, 'Log data is required.'),
  vulnerabilityData: z.string().optional(),
  riskFactors: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ThreatAnalysisCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThreatAnalysisOutput | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threatDescription: 'Multiple failed login attempts followed by successful login from a suspicious IP address.',
      logData: '',
      vulnerabilityData: 'CVE-2023-12345',
      riskFactors: 'The user account has high privileges on a critical database server.',
    },
  });
  
  useEffect(() => {
    const now = new Date();
    const fiveSecondsAgo = new Date(now.getTime() - 5000);
    const tenSecondsAgo = new Date(now.getTime() - 10000);

    form.reset({
        ...form.getValues(),
        logData: `[${now.toISOString()}] Successful login for user 'admin' from 203.0.113.55
[${fiveSecondsAgo.toISOString()}] Failed login for user 'admin' from 203.0.113.55
[${tenSecondsAgo.toISOString()}] Failed login for user 'admin' from 203.0.113.55`
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setResult(null);
    const response = await handleThreatAnalysis(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      console.error('Analysis failed:', response.error);
    }
    setLoading(false);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-red-500';
    if (score >= 5) return 'bg-orange-500';
    return 'bg-yellow-500';
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in border-accent/50" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI Threat Analysis
        </CardTitle>
        <CardDescription>
          Generate an in-depth analysis and mitigation report for security threats.
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
            <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Analyze Threat'
              )}
            </Button>
          </form>
        </Form>
        {loading && (
            <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">AI is analyzing the threat...</p>
            </div>
        )}
        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <h3 className="font-semibold font-headline text-lg">Analysis Report</h3>
            <Separator />
             <div>
                <div className="mb-2 flex justify-between items-baseline">
                    <h4 className="text-sm font-medium text-muted-foreground">Severity Score</h4>
                    <span className={cn("text-xl font-bold", getScoreColor(result.severityScore).replace('bg-','text-'))}>{result.severityScore} / 10</span>
                </div>
                <Progress value={result.severityScore * 10} className="h-2" indicatorClassName={getScoreColor(result.severityScore)} />
            </div>
             <div>
              <h4 className="font-medium">Threat Category</h4>
              <p className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md inline-block mt-1">{result.threatCategory}</p>
            </div>
            <div>
              <h4 className="font-medium">Executive Summary</h4>
              <p className="text-sm text-muted-foreground">{result.executiveSummary}</p>
            </div>
             <div>
              <h4 className="font-medium">Technical Analysis</h4>
              <p className="text-sm text-muted-foreground">{result.technicalAnalysis}</p>
            </div>
            <div>
              <h4 className="font-medium">Mitigation Steps</h4>
              <ul className="mt-2 space-y-2">
                {result.mitigationSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Incident Response Plan</h4>
              <div className="flex items-start gap-2 mt-2">
                <ShieldAlert className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{result.incidentResponsePlan}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

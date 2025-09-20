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
import { handleNarrativeAnalysis } from '@/app/actions';
import type { NarrativeAnalysisOutput } from '@/ai/flows/narrative-analysis-flow';
import { Loader2, Sparkles, CheckCircle, MessageSquareWarning } from 'lucide-react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  content: z.string().min(1, 'Content is required.'),
  source: z.string().min(1, 'Source is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ThreatAnalysisCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NarrativeAnalysisOutput | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: 'BREAKING: Scientists have confirmed that household plants are actually alien listening devices sent to spy on us. The recent surge in houseplant popularity is a coordinated effort to install surveillance equipment in every home. #PlantSpies #AlienInvasion',
      source: 'unverified-social-media-account.com',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setResult(null);
    const response = await handleNarrativeAnalysis(values);
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
    <Card className="transition-all duration-300 hover:shadow-lg animate-fade-in border-accent/50 glass-card" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI Narrative Analysis
        </CardTitle>
        <CardDescription>
          Generate an in-depth analysis of online content for misinformation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content to Analyze</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the article or post content here..."
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., news-website.com, @socialhandle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Analyze Content'
              )}
            </Button>
          </form>
        </Form>
        {loading && (
            <div className="mt-6 flex flex-col items-center justify-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">AI is analyzing the narrative...</p>
            </div>
        )}
        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <h3 className="font-semibold text-lg">Analysis Report</h3>
            <Separator />
             <div>
                <div className="mb-2 flex justify-between items-baseline">
                    <h4 className="text-sm font-medium text-muted-foreground">Misinformation Risk Score</h4>
                    <span className={cn("text-xl font-bold", getScoreColor(result.riskScore).replace('bg-','text-'))}>{result.riskScore} / 10</span>
                </div>
                <Progress value={result.riskScore * 10} className="h-2" indicatorClassName={getScoreColor(result.riskScore)} />
            </div>
             <div>
              <h4 className="font-medium">Key Narrative</h4>
              <p className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md inline-block mt-1">{result.keyNarrative}</p>
            </div>
            <div>
              <h4 className="font-medium">Summary</h4>
              <p className="text-sm text-muted-foreground">{result.analysisSummary}</p>
            </div>
             <div>
              <h4 className="font-medium">Detailed Analysis</h4>
              <p className="text-sm text-muted-foreground">{result.detailedAnalysis}</p>
            </div>
            <div>
              <h4 className="font-medium">Counter Points</h4>
              <ul className="mt-2 space-y-2">
                {result.counterPoints.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Telltale Signs</h4>
              <div className="flex items-start gap-2 mt-2">
                <MessageSquareWarning className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{result.telltaleSigns.join(', ')}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

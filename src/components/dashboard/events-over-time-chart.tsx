'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { chartData } from '@/lib/mock-data';
import type { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  Low: { label: 'Low', color: 'hsl(var(--chart-3))' },
  Medium: { label: 'Medium', color: 'hsl(var(--chart-4))' },
  High: { label: 'High', color: 'hsl(var(--chart-2))' },
  Critical: { label: 'Critical', color: 'hsl(var(--destructive))' },
} satisfies ChartConfig;

export default function EventsOverTimeChart() {
  return (
    <Card className="transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle>Events Over Time</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="Low" stackId="a" fill="var(--color-Low)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Medium" stackId="a" fill="var(--color-Medium)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="High" stackId="a" fill="var(--color-High)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Critical" stackId="a" fill="var(--color-Critical)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

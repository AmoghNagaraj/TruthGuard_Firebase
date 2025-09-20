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
  Authentic: { label: 'Authentic', color: 'hsl(var(--chart-3))' },
  Satire: { label: 'Satire', color: 'hsl(var(--chart-4))' },
  "Bot-like": { label: 'Bot-like', color: 'hsl(var(--chart-2))' },
  Coordinated: { label: 'Coordinated', color: 'hsl(var(--destructive))' },
} satisfies ChartConfig;

export default function EventsOverTimeChart() {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 animate-fade-in glass-card" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle>Narrative Activity</CardTitle>
        <CardDescription>Last 7 days by content type</CardDescription>
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
            <Bar dataKey="Authentic" stackId="a" fill="var(--color-Authentic)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Satire" stackId="a" fill="var(--color-Satire)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Bot-like" stackId="a" fill="var(--color-Bot-like)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Coordinated" stackId="a" fill="var(--color-Coordinated)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

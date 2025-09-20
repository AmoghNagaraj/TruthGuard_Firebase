import DashboardHeader from '@/components/dashboard/header';
import StatsCards from '@/components/dashboard/stats-cards';
import EventsOverTimeChart from '@/components/dashboard/events-over-time-chart';
import RecentLogs from '@/components/dashboard/recent-logs';
import ThreatAnalysisCard from '@/components/dashboard/threat-analysis-card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6">
      <DashboardHeader title="Overview" description="A summary of disinformation trends and analysis." />
      <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <StatsCards />
          <EventsOverTimeChart />
          <RecentLogs />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
          <ThreatAnalysisCard />
        </div>
      </main>
    </div>
  );
}

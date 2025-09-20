import RecentLogs from "@/components/dashboard/recent-logs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ListFilter } from "lucide-react";
import DashboardHeader from "@/components/dashboard/header";

export default function AnalysisPage() {
  return (
    <div className="flex flex-col h-full bg-background p-4 sm:p-6 lg:p-8">
      <DashboardHeader title="Narrative Analysis" description="Review detailed analysis of identified narratives." />
      
      <div className="flex items-center gap-4 my-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search narratives by keyword, source, or topic..." className="pl-10" />
        </div>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by risk level" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
            </SelectContent>
        </Select>
        <Button variant="outline">
            <ListFilter className="mr-2 h-4 w-4" />
            <span>More Filters</span>
        </Button>
      </div>

      <div className="flex-1">
        <RecentLogs />
      </div>
    </div>
  );
}

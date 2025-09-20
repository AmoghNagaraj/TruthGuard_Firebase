'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { recentLogs, type SecurityLog } from '@/lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const severityVariantMap: Record<SecurityLog['severity'], "default" | "secondary" | "destructive"> = {
    Low: "secondary",
    Medium: "default",
    High: "default",
    Critical: "destructive",
  };
  
const severityColorMap = {
    Low: 'bg-green-500',
    Medium: 'bg-yellow-500',
    High: 'bg-orange-500',
    Critical: 'bg-red-500',
};


export default function RecentLogs() {
  const [selectedLog, setSelectedLog] = useState<SecurityLog | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <>
      <Card className="transition-all duration-300 hover:bg-muted/50 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
          <CardDescription>
            A summary of the latest security events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Severity</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLogs.map((log) => (
                <TableRow
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={cn(
                    'cursor-pointer',
                    log.severity === 'Critical' && 'animate-pulse'
                  )}
                >
                  <TableCell>
                    <Badge variant={severityVariantMap[log.severity]} className={cn(log.severity === 'High' && 'bg-orange-500 text-white')}>
                       {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.source}</TableCell>
                  <TableCell className="truncate max-w-xs">{log.description}</TableCell>
                  <TableCell className="text-right">
                    {isClient ? formatDistanceToNow(new Date(log.timestamp), {
                      addSuffix: true,
                    }) : '...'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={!!selectedLog} onOpenChange={(isOpen) => !isOpen && setSelectedLog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
            <DialogDescription>
              {selectedLog?.timestamp
                ? new Date(selectedLog.timestamp).toLocaleString()
                : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-semibold">Severity</span>
              <div className="col-span-3">
              {selectedLog && (
                <Badge variant={severityVariantMap[selectedLog.severity]} className={cn(selectedLog.severity === 'High' && 'bg-orange-500 text-white')}>
                  {selectedLog.severity}
                </Badge>
              )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-semibold">Source</span>
              <span className="col-span-3">{selectedLog?.source}</span>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right font-semibold">Description</span>
              <p className="col-span-3">{selectedLog?.description}</p>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-right font-semibold">Details</span>
              <p className="col-span-3 text-sm font-mono bg-muted p-2 rounded-md">
                {selectedLog?.details}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

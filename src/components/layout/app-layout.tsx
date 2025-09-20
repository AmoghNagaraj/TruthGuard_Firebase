'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  AlertTriangle,
  FilePieChart,
  LayoutDashboard,
  ScrollText,
  Settings,
} from 'lucide-react';
import { SentinelViewLogo } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/logs', icon: ScrollText, label: 'Logs' },
  { href: '/alerts', icon: AlertTriangle, label: 'Alerts' },
  { href: '/reports', icon: FilePieChart, label: 'Reports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <SentinelViewLogo className="size-8 text-primary" />
            <span className="font-headline text-lg font-semibold">
              SentinelView
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  href={item.href}
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm">
            <Avatar className="size-8">
              <AvatarImage
                src="https://picsum.photos/seed/avatar/100/100"
                alt="User Avatar"
                data-ai-hint="profile photo"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <span className="font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@sentinelview.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

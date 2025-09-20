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
  SidebarGroup,
  SidebarGroupLabel,
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

const mainNavItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/logs', icon: ScrollText, label: 'Logs' },
  { href: '/alerts', icon: AlertTriangle, label: 'Alerts' },
  { href: '/reports', icon: FilePieChart, label: 'Reports' },
];

const secondaryNavItems = [{ href: '/settings', icon: Settings, label: 'Settings' }];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <SentinelViewLogo className="size-10 text-primary" />
            <span className="font-headline text-2xl font-bold">
              SentinelView
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              {mainNavItems.map((item) => (
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
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Support</SidebarGroupLabel>
              {secondaryNavItems.map((item) => (
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
            </SidebarGroup>
          </SidebarMenu>
          <div className="flex w-full items-center gap-3 overflow-hidden rounded-lg p-2 text-left text-sm bg-muted">
            <Avatar className="size-9">
              <AvatarImage
                src="https://picsum.photos/seed/avatar/100/100"
                alt="User Avatar"
                data-ai-hint="profile photo"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <span className="font-semibold">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@sentinelview.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

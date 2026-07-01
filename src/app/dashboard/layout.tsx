'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Shield,
  BarChart3,
  AlertTriangle,
  Settings,
  HelpCircle,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/policies', icon: Shield, label: 'Policies' },
  { href: '/dashboard/metrics', icon: BarChart3, label: 'Metrics' },
  { href: '/dashboard/incidents', icon: AlertTriangle, label: 'Incidents' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/help', icon: HelpCircle, label: 'Help & Support' }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  try {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar pathname={pathname} />
        
        <div className="pl-64">
          <TopBar pathname={pathname} />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard layout error:', error);
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Unable to load dashboard layout
          </p>
        </div>
      </div>
    );
  }
}

function Sidebar({ pathname }: { pathname: string }) {
  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 dark:border-slate-700 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
          S
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          SLATracker
        </span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>
      
      <div className="border-t border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
            <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              Alex Morgan
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              alex@company.com
            </p>
          </div>
          <button className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ pathname }: { pathname: string }) {
  const getPageTitle = () => {
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment === 'dashboard') return 'Dashboard';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          {getPageTitle()}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <button className="relative rounded-lg p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            AM
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Alex Morgan
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Admin
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Activity, Clock, TrendingUp, TrendingDown, Users, Settings, Bell, Search, ChevronRight, BarChart3, FileText } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
}

function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <span className="rounded-full bg-blue-50 dark:bg-blue-900/30 p-2 text-blue-600">{icon}</span>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
      <div className="mt-2 flex items-center gap-1 text-sm">
        <span className={trend > 0 ? 'text-emerald-600' : 'text-red-500'}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
        <span className="text-slate-500">vs last period</span>
      </div>
    </div>
  );
}

interface Activity {
  id: string;
  policy: string;
  service: string;
  status: 'compliant' | 'warning' | 'breach';
  timestamp: string;
  metric: string;
  value: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCardProps[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Mock data - would normally come from API
      setTimeout(() => {
        setStats([
          { label: 'Total Policies', value: '24', icon: <ShieldCheck className="h-5 w-5" />, trend: 12 },
          { label: 'Compliance Rate', value: '98.7%', icon: <Activity className="h-5 w-5" />, trend: 3.2 },
          { label: 'Active Incidents', value: '3', icon: <AlertTriangle className="h-5 w-5" />, trend: -25 },
          { label: 'Avg Resolution', value: '4.2h', icon: <Clock className="h-5 w-5" />, trend: -15 }
        ]);

        setActivities([
          { id: '1', policy: 'API Response Time', service: 'Payment Gateway', status: 'compliant', timestamp: '2 minutes ago', metric: 'Latency', value: '189ms' },
          { id: '2', policy: 'Database Uptime', service: 'User Authentication', status: 'warning', timestamp: '15 minutes ago', metric: 'Uptime', value: '99.85%' },
          { id: '3', policy: 'Email Delivery', service: 'Notification Service', status: 'breach', timestamp: '1 hour ago', metric: 'Error Rate', value: '2.3%' },
          { id: '4', policy: 'CDN Performance', service: 'Static Assets', status: 'compliant', timestamp: '2 hours ago', metric: 'Latency', value: '42ms' },
          { id: '5', policy: 'Backup Completion', service: 'Data Management', status: 'compliant', timestamp: '6 hours ago', metric: 'Success', value: '100%' }
        ]);

        setQuickActions([
          { title: 'Create Policy', description: 'Define new SLA terms', icon: <FileText className="h-5 w-5" />, color: 'bg-blue-50 text-blue-600' },
          { title: 'View Reports', description: 'Compliance analytics', icon: <BarChart3 className="h-5 w-5" />, color: 'bg-emerald-50 text-emerald-600' },
          { title: 'Manage Team', description: 'User permissions', icon: <Users className="h-5 w-5" />, color: 'bg-purple-50 text-purple-600' },
          { title: 'Settings', description: 'System configuration', icon: <Settings className="h-5 w-5" />, color: 'bg-slate-100 text-slate-600' }
        ]);

        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Error loading dashboard</h3>
          <p className="mt-1 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <div className="animate-pulse">
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700"></div>
                <div className="mt-2 h-8 w-16 rounded bg-slate-200 dark:bg-slate-700"></div>
                <div className="mt-2 h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Overview of your SLA compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-400 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="relative rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-400 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Policy</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                        {activity.policy}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                        {activity.service}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          activity.status === 'compliant' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          activity.status === 'warning' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-mono">
                        {activity.value}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                        {activity.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  className="flex w-full items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 text-left shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-0.5"
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                    {action.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{action.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{action.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Policy Compliance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Payment Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full bg-emerald-500" style={{ width: '98%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">98%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">User Auth</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full bg-amber-500" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Notification Service</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full bg-red-500" style={{ width: '87%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-red-600 dark:text-red-400">87%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">CDN Performance</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full bg-emerald-500" style={{ width: '99%' }}></div>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">99%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Download,
  FilePlus,
  FileText,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';

// -- Sparkline component (6-point inline SVG) --
function Sparkline({ points, color = '#5e6ad2' }: { points: number[]; color?: string }) {
  const w = 48;
  const h = 20;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={coords} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// -- 30-day compliance chart data --
const complianceData = [
  98.1, 98.4, 98.2, 98.9, 99.0, 98.7, 98.5, 99.1, 99.3, 99.0,
  98.8, 99.2, 99.1, 99.4, 99.2, 98.9, 99.3, 99.5, 99.1, 99.0,
  99.2, 99.4, 99.3, 99.1, 99.2, 99.5, 99.3, 99.2, 99.4, 99.2,
];

// -- Stat cards --
const stats: Array<{
  label: string;
  value: string;
  trend: string;
  trendDir: 'up' | 'down' | 'flat';
  trendText: string;
  icon: React.ReactNode;
  spark: number[];
  sparkColor: string;
  amber?: boolean;
}> = [
  {
    label: 'Active SLAs',
    value: '7',
    trend: '+2',
    trendDir: 'up' as const,
    trendText: 'from last week',
    icon: <ShieldCheck size={16} />,
    spark: [3, 4, 4, 5, 5, 6, 7],
    sparkColor: '#5e6ad2',
  },
  {
    label: 'Compliance Rate',
    value: '99.2%',
    trend: '+0.4%',
    trendDir: 'up' as const,
    trendText: 'vs last period',
    icon: <Activity size={16} />,
    spark: [98.1, 98.5, 98.9, 99.0, 98.8, 99.1, 99.2],
    sparkColor: '#34d399',
  },
  {
    label: 'Breaches Today',
    value: '0',
    trend: '0',
    trendDir: 'flat' as const,
    trendText: 'no change',
    icon: <AlertTriangle size={16} />,
    spark: [1, 0, 0, 0, 0, 0, 0],
    sparkColor: '#34d399',
  },
  {
    label: 'At Risk',
    value: '2',
    trend: '+1',
    trendDir: 'up' as const,
    trendText: 'needs attention',
    icon: <Clock size={16} />,
    spark: [0, 1, 1, 0, 1, 1, 2],
    sparkColor: '#f59e0b',
    amber: true,
  },
];

// -- Incidents --
type Incident = {
  time: string;
  sla: string;
  status: 'compliant' | 'at_risk' | 'breached' | 'pending';
  responseTime: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
};

const incidents: Incident[] = [
  { time: '14:32', sla: 'Payment Gateway Latency', status: 'compliant', responseTime: '142ms', severity: 'low' },
  { time: '14:18', sla: 'Auth Service Uptime', status: 'at_risk', responseTime: '1.8s', severity: 'medium' },
  { time: '13:55', sla: 'Email Delivery SLA', status: 'compliant', responseTime: '890ms', severity: 'low' },
  { time: '13:21', sla: 'CDN Cache Hit Rate', status: 'compliant', responseTime: '38ms', severity: 'low' },
  { time: '12:47', sla: 'Database Read Latency', status: 'at_risk', responseTime: '2.1s', severity: 'high' },
  { time: '11:03', sla: 'Search Indexing Pipeline', status: 'pending', responseTime: '—', severity: 'medium' },
  { time: '10:29', sla: 'Webhook Delivery Rate', status: 'compliant', responseTime: '210ms', severity: 'low' },
  { time: '09:15', sla: 'API Gateway Throughput', status: 'compliant', responseTime: '95ms', severity: 'low' },
];

const statusMap: Record<Incident['status'], { label: string; cls: string }> = {
  compliant: { label: 'Compliant', cls: 'bg-[#0d2818] text-emerald-400 border border-emerald-500/20' },
  at_risk: { label: 'At Risk', cls: 'bg-[#2a1f0d] text-amber-400 border border-amber-500/20' },
  breached: { label: 'Breached', cls: 'bg-[#2a0d0d] text-red-400 border border-red-500/20' },
  pending: { label: 'Pending', cls: 'bg-[#1a1a1e] text-[#8a8f98] border border-[rgba(255,255,255,0.08)]' },
};

const severityMap: Record<Incident['severity'], { cls: string }> = {
  low: { cls: 'text-[#8a8f98]' },
  medium: { cls: 'text-amber-400' },
  high: { cls: 'text-orange-400' },
  critical: { cls: 'text-red-400' },
};

// -- SVG compliance chart --
function ComplianceChart() {
  const w = 680;
  const h = 180;
  const pad = { top: 12, right: 12, bottom: 24, left: 36 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const min = 97.5;
  const max = 100;
  const range = max - min;

  const pts = complianceData.map((v, i) => ({
    x: pad.left + (i / (complianceData.length - 1)) * cw,
    y: pad.top + ch - ((v - min) / range) * ch,
  }));

  const line = pts.map((p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    return `C ${cpx1},${prev.y} ${cpx2},${p.y} ${p.x},${p.y}`;
  }).join(' ');

  const areaPath = `${line} L ${pts[pts.length - 1].x},${pad.top + ch} L ${pts[0].x},${pad.top + ch} Z`;

  const gridLines = [98, 98.5, 99, 99.5, 100];

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-[#f7f8f8]">Compliance Trend</h3>
        <span className="text-xs text-[#8a8f98]">Last 30 days</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 180 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* grid */}
        {gridLines.map((v) => {
          const y = pad.top + ch - ((v - min) / range) * ch;
          return (
            <g key={v}>
              <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={pad.left - 6} y={y + 3} textAnchor="end" fill="#8a8f98" fontSize="10" fontFamily="Inter, system-ui">{v}%</text>
            </g>
          );
        })}
        {/* x labels */}
        {['Jun 1', 'Jun 10', 'Jun 20', 'Jun 30'].map((lbl, i) => {
          const x = pad.left + (i / 3) * cw;
          return <text key={lbl} x={x} y={h - 4} textAnchor="middle" fill="#8a8f98" fontSize="10" fontFamily="Inter, system-ui">{lbl}</text>;
        })}
        {/* area fill */}
        <path d={areaPath} fill="url(#chartGrad)" />
        {/* line */}
        <path d={line} fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* end dot */}
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill="#34d399" />
      </svg>
    </div>
  );
}

// -- Sort keys --
type SortKey = 'time' | 'sla' | 'status' | 'responseTime' | 'severity';

export default function DashboardPage() {
  const [sortKey, setSortKey] = useState<SortKey>('time');
  const [sortAsc, setSortAsc] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...incidents].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = String(av).localeCompare(String(bv));
    return sortAsc ? cmp : -cmp;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronDown size={12} className="opacity-30" />;
    return sortAsc ? <ChevronUp size={12} className="text-[#5e6ad2]" /> : <ChevronDown size={12} className="text-[#5e6ad2]" />;
  };

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] px-4 py-3 flex flex-col justify-between transition-all duration-150 hover:border-[rgba(255,255,255,0.1)]"
            style={{ minHeight: 100 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#8a8f98] font-medium tracking-wide uppercase">{s.label}</span>
              <span className={`${s.amber ? 'text-amber-400' : 'text-[#8a8f98]'}`}>{s.icon}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-[#f7f8f8] tracking-tight">{s.value}</span>
              <Sparkline points={s.spark} color={s.sparkColor} />
            </div>
            <div className="flex items-center gap-1 mt-2">
              {s.trendDir === 'up' && <ArrowUpRight size={12} className={s.amber ? 'text-amber-400' : 'text-emerald-400'} />}
              {s.trendDir === 'down' && <ArrowDownRight size={12} className="text-red-400" />}
              {s.trendDir === 'flat' && <Minus size={12} className="text-[#8a8f98]" />}
              <span className={`text-xs ${s.amber ? 'text-amber-400' : s.trendDir === 'flat' ? 'text-[#8a8f98]' : 'text-emerald-400'}`}>
                {s.trend}
              </span>
              <span className="text-xs text-[#8a8f98]">{s.trendText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-3">
          <ComplianceChart />
        </div>
        <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[#f7f8f8] mb-1">Quick Actions</h3>
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#d0d6e0] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-150">
            <FilePlus size={14} className="text-[#5e6ad2]" />
            New SLA
          </button>
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#d0d6e0] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-150">
            <FileText size={14} className="text-[#5e6ad2]" />
            Run Report
          </button>
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#d0d6e0] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-150">
            <Download size={14} className="text-[#5e6ad2]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Incidents table */}
      <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
          <h3 className="text-sm font-medium text-[#f7f8f8]">Recent Incidents</h3>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8a8f98]" />
            <input
              type="text"
              placeholder="Filter incidents..."
              className="w-48 rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] pl-8 pr-10 py-1.5 text-xs text-[#d0d6e0] placeholder:text-[#8a8f98] focus:outline-none focus:border-[rgba(255,255,255,0.15)] transition-all duration-150"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 text-[10px] text-[#8a8f98] font-mono">⌘K</kbd>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                {([['time', 'Time'], ['sla', 'SLA Name'], ['status', 'Status'], ['responseTime', 'Response Time'], ['severity', 'Severity']] as [SortKey, string][]).map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="px-4 py-2.5 text-left text-xs font-medium text-[#8a8f98] uppercase tracking-wider cursor-pointer select-none hover:text-[#d0d6e0] transition-colors duration-150"
                  >
                    <span className="inline-flex items-center gap-1">
                      {label}
                      <SortIcon col={key} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((inc, i) => (
                <tr
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-[rgba(255,255,255,0.03)] transition-all duration-150 ${
                    hoveredRow === i ? 'bg-[rgba(255,255,255,0.04)]' : i % 2 === 0 ? 'bg-transparent' : 'bg-[rgba(255,255,255,0.015)]'
                  }`}
                >
                  <td className="px-4 py-2.5 text-sm text-[#8a8f98] font-mono tabular-nums">{inc.time}</td>
                  <td className="px-4 py-2.5 text-sm text-[#d0d6e0]">{inc.sla}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMap[inc.status].cls}`}>
                      {statusMap[inc.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-[#d0d6e0] font-mono tabular-nums">{inc.responseTime}</td>
                  <td className={`px-4 py-2.5 text-sm capitalize ${severityMap[inc.severity].cls}`}>{inc.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

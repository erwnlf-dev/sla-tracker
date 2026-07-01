'use client'

import { useState } from 'react'
import {
  Shield, Search, Plus, CheckCircle, AlertTriangle, XCircle,
  Clock, MoreHorizontal, Zap, Activity
} from 'lucide-react'

interface Policy {
  id: string
  name: string
  target: string
  current: number
  status: 'Compliant' | 'At Risk' | 'Breached'
  lastChecked: string
  nextCheck: string
  service: string
}

const mockPolicies: Policy[] = [
  { id: 'p1', name: 'API Response Time', target: '99.9%', current: 99.8, status: 'Compliant', lastChecked: '2 min ago', nextCheck: '58 min', service: 'Payment Gateway' },
  { id: 'p2', name: 'Database Uptime', target: '99.99%', current: 99.95, status: 'Compliant', lastChecked: '5 min ago', nextCheck: '55 min', service: 'Primary DB' },
  { id: 'p3', name: 'Email Delivery Rate', target: '98.0%', current: 87.3, status: 'Breached', lastChecked: '1 min ago', nextCheck: '59 min', service: 'Notification Service' },
  { id: 'p4', name: 'CDN Cache Hit Ratio', target: '95.0%', current: 94.1, status: 'At Risk', lastChecked: '3 min ago', nextCheck: '57 min', service: 'Static Assets' },
  { id: 'p5', name: 'Auth Service Latency', target: '99.5%', current: 99.7, status: 'Compliant', lastChecked: '1 min ago', nextCheck: '59 min', service: 'Auth Service' },
  { id: 'p6', name: 'Backup Completion', target: '100%', current: 100, status: 'Compliant', lastChecked: '12 min ago', nextCheck: '48 min', service: 'Data Management' },
]

const statusConfig = {
  Compliant: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', barColor: 'bg-emerald-500', icon: CheckCircle },
  'At Risk': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', barColor: 'bg-amber-500', icon: AlertTriangle },
  Breached: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', barColor: 'bg-red-500', icon: XCircle },
}

export default function PoliciesPage() {
  const [search, setSearch] = useState('')

  const filtered = mockPolicies.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.service.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f7f8f8]">SLA Policies</h2>
          <p className="text-sm text-[#8a8f98]">Manage compliance targets for all monitored services</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#5e6ad2] px-4 py-2 text-sm font-medium text-white hover:bg-[#7170ff] transition-colors">
          <Plus className="h-4 w-4" />
          Add Policy
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8f98]" />
        <input
          type="text"
          placeholder="Search policies or services..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg bg-[#0f1011] border border-[rgba(255,255,255,0.06)] pl-10 pr-4 py-2.5 text-sm text-[#f7f8f8] placeholder-[#8a8f98] focus:border-[#5e6ad2] focus:outline-none transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(policy => {
          const cfg = statusConfig[policy.status]
          const StatusIcon = cfg.icon
          return (
            <div
              key={policy.id}
              className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f1011] p-5 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${cfg.bg}`}>
                    <Shield className={`h-4.5 w-4.5 ${cfg.text}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f7f8f8]">{policy.name}</h3>
                    <p className="text-xs text-[#8a8f98]">{policy.service}</p>
                  </div>
                </div>
                <button className="rounded-md p-1 text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.06)] opacity-0 group-hover:opacity-100 transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Target */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8a8f98]">Target</span>
                <span className="text-sm font-mono font-medium text-[#d0d6e0]">{policy.target}</span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#8a8f98]">Current compliance</span>
                  <span className={`text-sm font-mono font-semibold ${cfg.text}`}>{policy.current}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#191a1b]">
                  <div
                    className={`h-full rounded-full ${cfg.barColor} transition-all duration-500`}
                    style={{ width: `${Math.min(policy.current, 100)}%` }}
                  />
                </div>
              </div>

              {/* Status + Timing */}
              <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                  <StatusIcon className="h-3 w-3" />
                  {policy.status}
                </span>
                <div className="flex items-center gap-3 text-xs text-[#8a8f98]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {policy.lastChecked}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1 text-xs text-[#8a8f98]">
                <Activity className="h-3 w-3" />
                Next check in {policy.nextCheck}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-[#8a8f98]">
          <Search className="h-8 w-8 mb-2" />
          <p className="text-sm">No policies match &ldquo;{search}&rdquo;</p>
        </div>
      )}
    </div>
  )
}

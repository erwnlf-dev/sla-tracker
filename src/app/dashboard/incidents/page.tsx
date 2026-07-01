'use client'

import { useState } from 'react'
import {
  AlertTriangle, ChevronDown, Download, Eye, Search, Filter,
  CheckCircle, Clock, AlertCircle, XCircle, Zap
} from 'lucide-react'

interface Incident {
  id: string
  title: string
  sla: string
  severity: 'Critical' | 'Major' | 'Minor'
  status: 'Open' | 'Investigating' | 'Resolved'
  duration: string
  created: string
}

const mockIncidents: Incident[] = [
  { id: 'INC-001', title: 'Payment gateway timeout exceeding 5s SLA', sla: 'API Response Time', severity: 'Critical', status: 'Open', duration: '2h 14m', created: 'Jun 30, 2026' },
  { id: 'INC-002', title: 'Auth service returning 503 intermittently', sla: 'Auth Uptime', severity: 'Critical', status: 'Investigating', duration: '45m', created: 'Jun 30, 2026' },
  { id: 'INC-003', title: 'Database read latency spike to 800ms', sla: 'DB Latency', severity: 'Major', status: 'Investigating', duration: '1h 22m', created: 'Jun 30, 2026' },
  { id: 'INC-004', title: 'CDN cache miss rate above 15% threshold', sla: 'CDN Performance', severity: 'Major', status: 'Open', duration: '3h 05m', created: 'Jun 29, 2026' },
  { id: 'INC-005', title: 'Email delivery rate dropped below 98%', sla: 'Email Delivery', severity: 'Minor', status: 'Resolved', duration: '4h 30m', created: 'Jun 29, 2026' },
  { id: 'INC-006', title: 'Webhook delivery delays exceeding 30s', sla: 'Webhook Latency', severity: 'Major', status: 'Open', duration: '55m', created: 'Jun 29, 2026' },
  { id: 'INC-007', title: 'Search index rebuild taking 2x expected time', sla: 'Search Performance', severity: 'Minor', status: 'Resolved', duration: '6h 12m', created: 'Jun 28, 2026' },
  { id: 'INC-008', title: 'SSO token refresh failing for SAML users', sla: 'Auth Uptime', severity: 'Critical', status: 'Resolved', duration: '1h 48m', created: 'Jun 28, 2026' },
  { id: 'INC-009', title: 'File upload service returning 413 for <10MB', sla: 'Upload Availability', severity: 'Minor', status: 'Open', duration: '12m', created: 'Jun 28, 2026' },
  { id: 'INC-010', title: 'Rate limiter blocking legitimate API calls', sla: 'API Availability', severity: 'Major', status: 'Investigating', duration: '33m', created: 'Jun 27, 2026' },
]

const severityConfig = {
  Critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  Major: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Minor: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
}

const statusConfig = {
  Open: { bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
  Investigating: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: AlertCircle },
  Resolved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
}

export default function IncidentsPage() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = mockIncidents.filter(i =>
    (statusFilter === 'All' || i.status === statusFilter) &&
    (severityFilter === 'All' || i.severity === severityFilter)
  )

  const toggleSelect = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const toggleAll = () => {
    setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map(i => i.id)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#f7f8f8]">Incidents</h2>
          <p className="text-sm text-[#8a8f98]">Track and manage SLA breaches across all services</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] hover:border-[rgba(255,255,255,0.12)] transition-all">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg bg-[#0f1011] border border-[rgba(255,255,255,0.06)] px-3 py-2">
          <Filter className="h-4 w-4 text-[#8a8f98]" />
          <span className="text-xs text-[#8a8f98] uppercase tracking-wider">Filters</span>
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg bg-[#0f1011] border border-[rgba(255,255,255,0.06)] px-3 py-2 pr-8 text-sm text-[#d0d6e0] hover:border-[rgba(255,255,255,0.12)] focus:border-[#5e6ad2] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8a8f98]" />
        </div>

        <div className="relative">
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
            className="appearance-none rounded-lg bg-[#0f1011] border border-[rgba(255,255,255,0.06)] px-3 py-2 pr-8 text-sm text-[#d0d6e0] hover:border-[rgba(255,255,255,0.12)] focus:border-[#5e6ad2] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="All">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8a8f98]" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 rounded-lg bg-[#0f1011] border border-[rgba(255,255,255,0.06)] px-3 py-2 cursor-pointer hover:border-[rgba(255,255,255,0.12)] transition-colors">
            <Clock className="h-4 w-4 text-[#8a8f98]" />
            <span className="text-sm text-[#d0d6e0]">Jun 27 – Jun 30, 2026</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#8a8f98]" />
          </div>
        </div>

        <div className="ml-auto text-sm text-[#8a8f98]">
          {filtered.length} incident{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f1011] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-[rgba(255,255,255,0.15)] bg-[#191a1b] text-[#5e6ad2] focus:ring-[#5e6ad2] focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">SLA</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">Severity</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8a8f98]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
            {filtered.map(incident => {
              const sev = severityConfig[incident.severity]
              const st = statusConfig[incident.status]
              const StatusIcon = st.icon
              return (
                <tr
                  key={incident.id}
                  className="hover:bg-[#191a1b] transition-colors group"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(incident.id)}
                      onChange={() => toggleSelect(incident.id)}
                      className="h-4 w-4 rounded border-[rgba(255,255,255,0.15)] bg-[#191a1b] text-[#5e6ad2] focus:ring-[#5e6ad2] focus:ring-offset-0 cursor-pointer"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-[#8a8f98]">
                    {incident.id}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm font-medium text-[#f7f8f8]">
                    {incident.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-[#d0d6e0]">
                    {incident.sla}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${sev.bg} ${sev.text} ${sev.border}`}>
                      {incident.severity === 'Critical' && <Zap className="h-3 w-3" />}
                      {incident.severity}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${st.bg} ${st.text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {incident.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-[#d0d6e0] font-mono">
                    {incident.duration}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button className="rounded-md p-1.5 text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[rgba(255,255,255,0.06)] opacity-0 group-hover:opacity-100 transition-all">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-[#8a8f98]">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="text-sm">No incidents match current filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

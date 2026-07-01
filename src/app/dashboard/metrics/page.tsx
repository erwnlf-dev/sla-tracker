'use client'

import { useState, useEffect } from 'react'
import {
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react'

interface MetricData {
  policyId: string
  name: string
  compliance: number
  trend: number
  breaches: number
}

interface TimeSeriesData {
  timestamp: string
  value: number
}

interface MetricsPageProps {}

const badgeColors = {
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  yellow: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
}

export default function MetricsPage({}: MetricsPageProps) {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')
  const [loading, setLoading] = useState(true)
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])

  useEffect(() => {
    try {
      setLoading(true)
      
      const mockMetrics: MetricData[] = [
        { policyId: '1', name: 'API Uptime', compliance: 99.8, trend: 0.2, breaches: 1 },
        { policyId: '2', name: 'Response Time', compliance: 98.5, trend: -0.5, breaches: 3 },
        { policyId: '3', name: 'Error Rate', compliance: 99.9, trend: 0.1, breaches: 0 },
        { policyId: '4', name: 'Database Uptime', compliance: 100, trend: 0, breaches: 0 }
      ]

      const mockTimeSeries: TimeSeriesData[] = Array.from({ length: timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (timeRange === '24h' ? i : timeRange === '7d' ? i * 24 : i) * 3600000).toISOString(),
        value: 95 + Math.random() * 5
      }))

      setTimeout(() => {
        setMetrics(mockMetrics)
        setTimeSeriesData(mockTimeSeries.reverse())
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to load metrics:', error)
      setLoading(false)
    }
  }, [timeRange])

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 99) return 'text-emerald-600 dark:text-emerald-400'
    if (compliance >= 95) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getStatusBadge = (compliance: number) => {
    if (compliance >= 99) return { text: 'Healthy', color: badgeColors.green }
    if (compliance >= 95) return { text: 'Warning', color: badgeColors.yellow }
    return { text: 'Critical', color: badgeColors.red }
  }

  const totalBreaches = metrics.reduce((sum, m) => sum + m.breaches, 0)
  const avgCompliance = metrics.length > 0 ? metrics.reduce((sum, m) => sum + m.compliance, 0) / metrics.length : 0
  const compliantPolicies = metrics.filter(m => m.compliance >= 99).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            SLA Metrics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor compliance and performance across all policies
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
          <button className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Overall Compliance', value: `${avgCompliance.toFixed(1)}%`, trend: 1.2, icon: Shield, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Active Policies', value: metrics.length.toString(), trend: 0, icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Compliant Policies', value: compliantPolicies.toString(), trend: 0.8, icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Total Breaches', value: totalBreaches.toString(), trend: -2.1, icon: AlertTriangle, color: totalBreaches > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400' }
        ].map((card, i) => (
          <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
              <span className={`rounded-full bg-blue-50 dark:bg-blue-900/30 p-2 ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {loading ? <div className="h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" /> : card.value}
            </p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <span className={card.trend > 0 ? 'text-emerald-600' : card.trend < 0 ? 'text-red-500' : 'text-slate-500'}>
                {card.trend > 0 ? '↑' : card.trend < 0 ? '↓' : '—'} {Math.abs(card.trend)}%
              </span>
              <span className="text-slate-500">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          <Filter className="mr-1 h-4 w-4" />
          Time Range:
        </span>
        {(['24h', '7d', '30d'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Compliance Trend
        </h3>
        <div className="h-80">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-40 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ) : (
            <div className="relative h-full">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {timeSeriesData.map((point, i) => {
                  const x = (i / (timeSeriesData.length - 1)) * 100
                  const y = 100 - point.value
                  return (
                    <circle
                      key={i}
                      cx={`${x}`}
                      cy={`${y}`}
                      r="1"
                      fill="currentColor"
                      className="text-blue-600 dark:text-blue-400"
                    />
                  )
                })}
                <path
                  d={`M ${timeSeriesData.map((point, i) => {
                    const x = (i / (timeSeriesData.length - 1)) * 100
                    const y = 100 - point.value
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                  }).join(' ')} L 100 100 L 0 100 Z`}
                  fill="currentColor"
                  className="text-blue-100 dark:text-blue-900/20"
                />
                <path
                  d={timeSeriesData.map((point, i) => {
                    const x = (i / (timeSeriesData.length - 1)) * 100
                    const y = 100 - point.value
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-blue-600 dark:text-blue-400"
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
                <span className="text-xs text-slate-500">{timeSeriesData[0]?.timestamp ? new Date(timeSeriesData[0].timestamp).toLocaleDateString() : ''}</span>
                <span className="text-xs text-slate-500">{timeSeriesData[timeSeriesData.length-1]?.timestamp ? new Date(timeSeriesData[timeSeriesData.length-1].timestamp).toLocaleDateString() : ''}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Policy Compliance</h3>
          <div className="flex gap-2">
            <input
              type="text"
              className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-1.5 text-sm"
              placeholder="Search policies..."
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Policy</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Compliance</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Trend</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Breaches</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                  ))}
                </tr>
              ))
            ) : metrics.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  No metrics data available
                </td>
              </tr>
            ) : (
              metrics.map(metric => {
                const status = getStatusBadge(metric.compliance)
                return (
                  <tr key={metric.policyId} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                      {metric.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={getComplianceColor(metric.compliance)}>
                        {metric.compliance.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1">
                        {metric.trend > 0 ? (
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                        ) : metric.trend < 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                        <span className={metric.trend > 0 ? 'text-emerald-600' : metric.trend < 0 ? 'text-red-500' : 'text-slate-500'}>
                          {Math.abs(metric.trend)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {metric.breaches}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
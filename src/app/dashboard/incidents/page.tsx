'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter,
  RefreshCw,
  Search,
  X
} from 'lucide-react';

// Types
interface Incident {
  id: string;
  policyId: string;
  start: string;
  end: string | null;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

// Mock data
const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    policyId: 'POL-001',
    start: '2024-08-10T14:23:00Z',
    end: '2024-08-10T14:45:00Z',
    description: 'Database connection timeout exceeded 200ms threshold',
    severity: 'high'
  },
  {
    id: 'INC-002',
    policyId: 'POL-002',
    start: '2024-08-11T09:15:00Z',
    end: null,
    description: 'API response latency degraded to 350ms (target: 200ms)',
    severity: 'medium'
  },
  {
    id: 'INC-003',
    policyId: 'POL-003',
    start: '2024-08-09T18:30:00Z',
    end: '2024-08-09T18:42:00Z',
    description: 'Error rate spiked to 5.2% during deployment window',
    severity: 'high'
  },
  {
    id: 'INC-004',
    policyId: 'POL-001',
    start: '2024-08-12T11:05:00Z',
    end: '2024-08-12T11:20:00Z',
    description: 'Uptime dropped to 99.7% for 15 minutes',
    severity: 'medium'
  },
  {
    id: 'INC-005',
    policyId: 'POL-004',
    start: '2024-08-13T08:45:00Z',
    end: null,
    description: 'Payment gateway latency exceeded SLA threshold',
    severity: 'high'
  }
];

// Badge colors based on severity
const badgeColors = {
  high: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
};

// Duration formatter
function formatDuration(start: string, end: string | null): string {
  if (!end) return 'Ongoing';
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  
  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncidents(mockIncidents);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter incidents
  const filteredIncidents = useMemo(() => {
    let result = [...incidents];
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(incident => 
        incident.id.toLowerCase().includes(term) ||
        incident.policyId.toLowerCase().includes(term) ||
        incident.description.toLowerCase().includes(term)
      );
    }
    
    // Severity filter
    if (severityFilter !== 'all') {
      result = result.filter(incident => incident.severity === severityFilter);
    }
    
    return result;
  }, [incidents, searchTerm, severityFilter]);
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIncidents([...mockIncidents]);
    setRefreshing(false);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-3xl">
            Incident Log
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            SLA breach history and resolution tracking
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </div>
        </button>
      </div>
      
      {/* Stats summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Incidents</p>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {loading ? (
              <span className="inline-block h-6 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            ) : (
              incidents.length
            )}
          </p>
        </div>
        
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">High Severity</p>
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {loading ? (
              <span className="inline-block h-6 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            ) : (
              incidents.filter(i => i.severity === 'high').length
            )}
          </p>
        </div>
        
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Ongoing</p>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {loading ? (
              <span className="inline-block h-6 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            ) : (
              incidents.filter(i => !i.end).length
            )}
          </p>
        </div>
        
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">MTTR</p>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {loading ? (
              <span className="inline-block h-6 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            ) : (
              '24m'
            )}
          </p>
        </div>
      </div>
      
      {/* Main table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            SLA Breaches ({filteredIncidents.length})
          </h3>
          
          <div className="flex items-center gap-3">
            {/* Severity filter */}
            <div className="relative">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-1.5 text-sm appearance-none pr-8"
              >
                <option value="all">All Severity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <Filter className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 pl-9 pr-3 py-1.5 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Policy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Start
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Severity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-4 py-3">
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    </td>
                  </tr>
                ))
              ) : filteredIncidents.length === 0 ? (
                // Empty state
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                      <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                        {searchTerm || severityFilter !== 'all' 
                          ? 'No matching incidents found' 
                          : 'No incidents recorded'
                        }
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                        {searchTerm || severityFilter !== 'all'
                          ? 'Try adjusting your search or filter criteria'
                          : 'SLA performance is within target thresholds'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                      {incident.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {incident.policyId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {formatDate(incident.start)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {formatDuration(incident.start, incident.end)}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="max-w-xs truncate" title={incident.description}>
                        {incident.description}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors[incident.severity]}`}>
                        {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (simplified) */}
        {!loading && filteredIncidents.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 px-4 py-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing 1 to {filteredIncidents.length} of {filteredIncidents.length} incidents
            </p>
            <div className="flex gap-2">
              <button
                disabled
                className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled
                className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Copy, 
  AlertCircle,
  X
} from 'lucide-react';

interface SLAPolicy {
  id: string;
  name: string;
  service: string;
  metric: 'uptime' | 'latency' | 'error_rate';
  target: number;
  window: string;
  created: string;
}

interface SLAPolicyTableProps {
  policies: SLAPolicy[];
  onEdit: (policy: SLAPolicy) => void;
  onDelete: (id: string) => void;
  onDuplicate: (policy: SLAPolicy) => void;
}

interface CreatePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePolicy: (policy: Omit<SLAPolicy, 'id' | 'created'>) => void;
}

const badgeColors = {
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  yellow: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  gray: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

const metricOptions = [
  { value: 'uptime', label: 'Uptime', unit: '%' },
  { value: 'latency', label: 'Latency', unit: 'ms' },
  { value: 'error_rate', label: 'Error Rate', unit: '%' },
];

const initialPolicies: SLAPolicy[] = [
  {
    id: 'pol_1',
    name: 'API Response Time',
    service: 'API Gateway',
    metric: 'latency',
    target: 200,
    window: '30d',
    created: '2024-01-15',
  },
  {
    id: 'pol_2',
    name: 'Database Availability',
    service: 'PostgreSQL',
    metric: 'uptime',
    target: 99.95,
    window: '1m',
    created: '2024-01-10',
  },
  {
    id: 'pol_3',
    name: 'Payment Service Errors',
    service: 'Payment Processor',
    metric: 'error_rate',
    target: 0.1,
    window: '7d',
    created: '2024-01-20',
  },
  {
    id: 'pol_4',
    name: 'Web App Performance',
    service: 'Frontend CDN',
    metric: 'latency',
    target: 100,
    window: '24h',
    created: '2024-01-22',
  },
];

function SLAPolicyTable({ policies, onEdit, onDelete, onDuplicate }: SLAPolicyTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const filteredPolicies = useMemo(() => {
    if (!searchQuery) return policies;
    const query = searchQuery.toLowerCase();
    return policies.filter(
      policy =>
        policy.name.toLowerCase().includes(query) ||
        policy.service.toLowerCase().includes(query) ||
        policy.metric.toLowerCase().includes(query)
    );
  }, [policies, searchQuery]);

  const getMetricBadgeColor = (metric: string) => {
    switch (metric) {
      case 'uptime': return 'green';
      case 'latency': return 'blue';
      case 'error_rate': return 'yellow';
      default: return 'gray';
    }
  };

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'uptime': return '%';
      case 'latency': return 'ms';
      case 'error_rate': return '%';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const columns = ['Policy', 'Service', 'Metric', 'Target', 'Window', 'Created', ''];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">SLA Policies</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              {columns.map((col, index) => (
                <th 
                  key={index}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filteredPolicies.map((policy) => (
              <tr 
                key={policy.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                  {policy.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                  {policy.service}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors[getMetricBadgeColor(policy.metric)]}`}>
                    {policy.metric.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-mono">
                  {policy.target}{getMetricUnit(policy.metric)}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                  {policy.window}
                </td>
                <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(policy.created)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <div className="relative">
                    <button
                      className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => setActionMenuOpen(actionMenuOpen === policy.id ? null : policy.id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {actionMenuOpen === policy.id && (
                      <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1">
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                          onClick={() => {
                            onEdit(policy);
                            setActionMenuOpen(null);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                          onClick={() => {
                            onDuplicate(policy);
                            setActionMenuOpen(null);
                          }}
                        >
                          <Copy className="h-4 w-4" />
                          Duplicate
                        </button>
                        <button
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
                          onClick={() => {
                            onDelete(policy.id);
                            setActionMenuOpen(null);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPolicies.length === 0 && (
        <div className="p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
          <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No policies found</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Get started by creating your first SLA policy.
          </p>
        </div>
      )}
    </div>
  );
}

function CreatePolicyModal({ isOpen, onClose, onCreatePolicy }: CreatePolicyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    metric: 'uptime' as const,
    target: 99.9,
    window: '30d',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'target' ? parseFloat(value) || 0 : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Policy name is required';
    }
    
    if (!formData.service.trim()) {
      newErrors.service = 'Service name is required';
    }
    
    if (formData.target <= 0) {
      newErrors.target = 'Target must be greater than 0';
    }
    
    if (!formData.window.match(/^\d+[dhm]$/)) {
      newErrors.window = 'Window must be in format like 30d, 24h, or 60m';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onCreatePolicy({
      name: formData.name.trim(),
      service: formData.service.trim(),
      metric: formData.metric,
      target: formData.target,
      window: formData.window,
    });
    
    setFormData({
      name: '',
      service: '',
      metric: 'uptime',
      target: 99.9,
      window: '30d',
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Create New SLA Policy
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Policy Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                  : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700'
              }`}
              placeholder="e.g., API Response Time"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Service
            </label>
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.service 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                  : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700'
              }`}
              placeholder="e.g., API Gateway, PostgreSQL"
            />
            {errors.service && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Metric
              </label>
              <select
                name="metric"
                value={formData.metric}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {metricOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.unit})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Target
              </label>
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                step="0.1"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.target 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                    : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700'
                }`}
              />
              {errors.target && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.target}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Monitoring Window
            </label>
            <input
              type="text"
              name="window"
              value={formData.window}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.window 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                  : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700'
              }`}
              placeholder="e.g., 30d, 24h, 60m"
            />
            {errors.window && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.window}</p>
            )}
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Use d for days, h for hours, m for minutes
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<SLAPolicy[]>(initialPolicies);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePolicy = (newPolicy: Omit<SLAPolicy, 'id' | 'created'>) => {
    const policy: SLAPolicy = {
      ...newPolicy,
      id: `pol_${Date.now()}`,
      created: new Date().toISOString().split('T')[0],
    };
    
    setPolicies(prev => [policy, ...prev]);
  };

  const handleEditPolicy = (policy: SLAPolicy) => {
    console.log('Edit policy:', policy);
    // In a real app, this would open an edit modal
  };

  const handleDeletePolicy = (id: string) => {
    setPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  const handleDuplicatePolicy = (policy: SLAPolicy) => {
    const newPolicy: SLAPolicy = {
      ...policy,
      id: `pol_${Date.now()}`,
      name: `${policy.name} (Copy)`,
      created: new Date().toISOString().split('T')[0],
    };
    
    setPolicies(prev => [newPolicy, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Policies
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your SLA policies and monitoring rules
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Policy
        </button>
      </div>
      
      <SLAPolicyTable
        policies={policies}
        onEdit={handleEditPolicy}
        onDelete={handleDeletePolicy}
        onDuplicate={handleDuplicatePolicy}
      />
      
      <CreatePolicyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePolicy={handleCreatePolicy}
      />
    </div>
  );
}
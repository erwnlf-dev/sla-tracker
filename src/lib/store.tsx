import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface SLAPolicy {
  id: string
  name: string
  service: string
  metric: 'uptime' | 'latency' | 'error_rate'
  target: number
  window: string
  created: string
}

export interface Metric {
  policyId: string
  timestamp: string
  actualValue: number
}

export interface Incident {
  id: string
  policyId: string
  start: string
  end: string | null
  description: string
  severity: 'low' | 'medium' | 'high'
}

interface StoreContextType {
  policies: SLAPolicy[]
  metrics: Metric[]
  incidents: Incident[]
  addPolicy: (policy: Omit<SLAPolicy, 'id' | 'created'>) => void
  updatePolicy: (id: string, updates: Partial<SLAPolicy>) => void
  deletePolicy: (id: string) => void
  addIncident: (incident: Omit<Incident, 'id'>) => void
}

const initialPolicies: SLAPolicy[] = [
  {
    id: 'pol_1',
    name: 'Production API Uptime',
    service: 'api.production',
    metric: 'uptime',
    target: 99.9,
    window: '30d',
    created: '2024-01-15T09:00:00Z'
  },
  {
    id: 'pol_2',
    name: 'Database Latency',
    service: 'db.main',
    metric: 'latency',
    target: 100,
    window: '1d',
    created: '2024-02-20T14:30:00Z'
  },
  {
    id: 'pol_3',
    name: 'Payment Gateway Errors',
    service: 'payment.stripe',
    metric: 'error_rate',
    target: 0.1,
    window: '7d',
    created: '2024-03-10T11:15:00Z'
  }
]

const initialIncidents: Incident[] = [
  {
    id: 'inc_1',
    policyId: 'pol_1',
    start: '2024-04-01T02:15:00Z',
    end: '2024-04-01T02:45:00Z',
    description: 'API response times exceeded 500ms threshold',
    severity: 'medium'
  },
  {
    id: 'inc_2',
    policyId: 'pol_2',
    start: '2024-04-05T18:30:00Z',
    end: null,
    description: 'Database connection pool exhausted',
    severity: 'high'
  }
]

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [policies, setPolicies] = useState<SLAPolicy[]>(initialPolicies)
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [metrics] = useState<Metric[]>(() => {
    // Generate mock metrics data
    const metricsData: Metric[] = []
    for (let i = 0; i < 30; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      metricsData.push(
        { policyId: 'pol_1', timestamp: date.toISOString(), actualValue: 99.8 + Math.random() * 0.2 },
        { policyId: 'pol_2', timestamp: date.toISOString(), actualValue: 80 + Math.random() * 40 },
        { policyId: 'pol_3', timestamp: date.toISOString(), actualValue: Math.random() * 0.3 }
      )
    }
    return metricsData
  })

  const addPolicy = useCallback((policy: Omit<SLAPolicy, 'id' | 'created'>) => {
    try {
      const newPolicy: SLAPolicy = {
        ...policy,
        id: `pol_${Date.now()}`,
        created: new Date().toISOString()
      }
      setPolicies(prev => [...prev, newPolicy])
    } catch (error) {
      console.error('Failed to add policy:', error)
    }
  }, [])

  const updatePolicy = useCallback((id: string, updates: Partial<SLAPolicy>) => {
    try {
      setPolicies(prev => prev.map(policy => 
        policy.id === id ? { ...policy, ...updates } : policy
      ))
    } catch (error) {
      console.error('Failed to update policy:', error)
    }
  }, [])

  const deletePolicy = useCallback((id: string) => {
    try {
      setPolicies(prev => prev.filter(policy => policy.id !== id))
    } catch (error) {
      console.error('Failed to delete policy:', error)
    }
  }, [])

  const addIncident = useCallback((incident: Omit<Incident, 'id'>) => {
    try {
      const newIncident: Incident = {
        ...incident,
        id: `inc_${Date.now()}`
      }
      setIncidents(prev => [...prev, newIncident])
    } catch (error) {
      console.error('Failed to add incident:', error)
    }
  }, [])

  return (
    <StoreContext.Provider value={{ policies, metrics, incidents, addPolicy, updatePolicy, deletePolicy, addIncident }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
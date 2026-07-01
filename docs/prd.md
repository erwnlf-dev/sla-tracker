### 1. Product Overview
SLATracker is a SaaS tool for monitoring and enforcing service level agreements. It provides automated breach detection, compliance reporting, and real-time status dashboards for internal IT and customer-facing SLAs.

### 2. Pages
- `/`: Marketing page with features, pricing, FAQ.
- `/dashboard`: Main app. Sidebar nav to all features.
- `/dashboard/policies`: SLA policy creation & management.
- `/dashboard/metrics`: Live and historical SLA compliance metrics.
- `/dashboard/incidents`: SLA breach history and incident log.

### 3. Component List
- **Landing (/):** HeroSection, FeatureGrid, PricingCards, FAQAccordion, SiteFooter.
- **Dashboard (/dashboard):** Sidebar, TopBar, WelcomeStat, PolicyComplianceSummary, NextBreachingPolicy.
- **Policies (/dashboard/policies):** Sidebar, TopBar, PolicyTable, CreatePolicyModal.
- **Metrics (/dashboard/metrics):** Sidebar, TopBar, MetricCards(4), TimeRangeSelector, ComplianceLineChart.
- **Incidents (/dashboard/incidents):** Sidebar, TopBar, IncidentTable, IncidentFilter.

### 4. Data Model
```typescript
interface SLAPolicy {
  id: string;
  name: string;
  service: string;
  metric: 'uptime' | 'latency' | 'error_rate';
  target: number; // e.g., 99.9 or 200
  window: string; // e.g., "30d", "1m"
  created: string;
}

interface Metric {
  policyId: string;
  timestamp: string;
  actualValue: number;
}

interface Incident {
  id: string;
  policyId: string;
  start: string;
  end: string | null;
  description: string;
  severity: 'low' | 'medium' | 'high';
}
```

### 5. UI Design Tokens
- **Colors:** `primary: #6366f1`, `success: #22c55e`, `warning: #f59e0b`, `danger: #ef4444`, `neutral: #f4f4f5` (bg), `#18181b` (text).
- **Fonts:** `body: "Inter", sans-serif`, `mono: "JetBrains Mono", monospace`. Sizes: `sm: 0.875rem`, `base: 1rem`, `lg: 1.125rem`, `xl: 1.25rem`.
- **Spacing:** `scale: [0, 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem]`.
- **Misc:** `radius: 0.5rem`, `shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)`.

### 6. File Manifest
```json
[
  {"path": "src/app/layout.tsx", "purpose": "Root layout with HTML/body, global styles, and fonts.", "dependencies": []},
  {"path": "src/app/page.tsx", "purpose": "Landing page. Self-contained marketing page with components.", "dependencies": ["tailwindcss"]},
  {"path": "src/app/dashboard/layout.tsx", "purpose": "Dashboard layout with Sidebar and TopBar.", "dependencies": []},
  {"path": "src/app/dashboard/page.tsx", "purpose": "Dashboard home. Shows summary stats and recent policy status.", "dependencies": ["@/lib/store"]},
  {"path": "src/app/dashboard/policies/page.tsx", "purpose": "Policy list and creation. Table + modal for CRUD.", "dependencies": ["@/lib/store"]},
  {"path": "src/app/dashboard/metrics/page.tsx", "purpose": "Metrics dashboard. Stat cards and a line chart for compliance.", "dependencies": ["@/lib/store", "recharts"]},
  {"path": "src/app/dashboard/incidents/page.tsx", "purpose": "Incident log. Filterable table of SLA breaches.", "dependencies": ["@/lib/store"]},
  {"path": "src/lib/store.ts", "purpose": "Global state (React Context) for policies, metrics, incidents. Initial mock data.", "dependencies": ["react"]}
]
```
skipped: Separate component files, API routes, middleware, auth. Add when: Features require shared UI or data persistence.
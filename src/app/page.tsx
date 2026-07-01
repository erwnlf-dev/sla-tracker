'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import Link from 'next/link'
import {
  Monitor,
  Bell,
  FileBarChart,
  Settings,
  BarChart3,
  Zap,
  ChevronDown,
  ArrowRight,
  Play,
  Check,
} from 'lucide-react'

function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const features = [
  {
    icon: Monitor,
    title: 'Real-time SLA monitoring',
    desc: 'Track every service-level agreement across teams in one live dashboard. No more spreadsheet archaeology.',
  },
  {
    icon: Bell,
    title: 'Proactive breach alerts',
    desc: 'Get notified before deadlines slip. Escalation rules route alerts to the right person automatically.',
  },
  {
    icon: FileBarChart,
    title: 'Compliance reports',
    desc: 'Generate audit-ready reports in one click. Export PDF, CSV, or share a live link with stakeholders.',
  },
  {
    icon: Settings,
    title: 'Custom SLA policies',
    desc: 'Define response and resolution targets per priority, customer tier, or channel. Flexible templates save hours.',
  },
  {
    icon: BarChart3,
    title: 'Trend analytics',
    desc: 'Spot recurring bottlenecks with rolling averages, heatmaps, and team-level breakdowns.',
  },
  {
    icon: Zap,
    title: 'Instant integrations',
    desc: 'Connect Jira, Zendesk, PagerDuty, Slack, and 30+ tools in minutes. Bi-directional sync keeps data fresh.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Connect your tools',
    desc: 'Link your help desk, project tracker, and chat platform. We auto-detect SLA fields.',
  },
  {
    num: '02',
    title: 'Define your SLAs',
    desc: 'Set targets by severity, business hours, and customer segment. Or import existing policies.',
  },
  {
    num: '03',
    title: 'Stay ahead of breaches',
    desc: 'Live dashboards and alerts keep your team proactive instead of reactive.',
  },
]

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'For small teams getting started with SLA tracking.',
    cta: 'Start free',
    highlight: false,
    features: [
      'Up to 3 SLA policies',
      '1 integration',
      'Daily email digest',
      '7-day data retention',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ user / month',
    desc: 'For growing teams that need real-time visibility.',
    cta: 'Start free trial',
    highlight: true,
    features: [
      'Unlimited SLA policies',
      'All integrations',
      'Real-time alerts (Slack, email, SMS)',
      '90-day data retention',
      'Custom dashboards',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: '$79',
    period: '/ user / month',
    desc: 'For orgs with compliance and audit requirements.',
    cta: 'Contact sales',
    highlight: false,
    features: [
      'Everything in Pro',
      'SAML SSO',
      'Audit log export',
      'Unlimited data retention',
      'Dedicated success manager',
      'Custom SLA onboarding',
      'SLA guarantee',
    ],
  },
]

const faqs = [
  {
    q: 'What counts as a "user"?',
    a: 'Any team member who logs in to SLATracker. Read-only viewers and API integrations do not count toward your seat limit.',
  },
  {
    q: 'Can I import existing SLA policies?',
    a: 'Yes. Upload a CSV or connect your help desk and we auto-map fields. Bulk import takes under a minute for most teams.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Annual plans save 20% compared to monthly. Contact sales for multi-year agreements.',
  },
  {
    q: 'How does the free trial work?',
    a: '14 days, full Pro features, no credit card required. Your data stays intact if you downgrade to Free after the trial.',
  },
  {
    q: 'Is my data secure?',
    a: 'We are SOC 2 Type II certified, encrypt data at rest and in transit, and run on infrastructure with 99.99% uptime SLA.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts on monthly or annual plans. Downgrade or cancel from your billing page — no phone call required.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border-b border-white/[0.08] py-5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7170ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a] rounded"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[15px] font-medium text-[#f7f8f8] group-hover:text-white transition-colors">{q}</span>
        <ChevronDown
          size={18}
          className="text-[#8a8f98] shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="text-[14px] text-[#8a8f98] leading-relaxed pt-3 pr-8">{a}</p>
      </div>
    </button>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] font-sans antialiased">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08090a]/80 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1120px] mx-auto flex items-center justify-between h-14 px-6">
          <Link href="/" className="text-[15px] font-semibold tracking-tight text-white">
            SLATracker
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#pricing" className="text-[13px] text-[#8a8f98] hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-[13px] text-[#8a8f98] hover:text-white transition-colors">FAQ</Link>
            <Link
              href="/signup"
              className="h-8 px-4 rounded-[6px] bg-[#5e6ad2] hover:bg-[#7170ff] text-[13px] font-medium text-white flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7170ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] text-[#8a8f98] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              Now generally available
            </div>
            <h1
              className="text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
            >
              Stop firefighting
              <br />
              SLA breaches
            </h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-[#8a8f98] max-w-[520px]">
              SLATracker monitors every agreement across your stack, alerts the right people before deadlines slip, and turns compliance from a scramble into a dashboard.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <Link
                href="/signup"
                className="h-10 px-5 rounded-[6px] bg-[#5e6ad2] hover:bg-[#7170ff] text-[14px] font-medium text-white flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7170ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
              >
                Start free trial
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/demo"
                className="h-10 px-5 rounded-[6px] border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-[14px] font-medium text-[#f7f8f8] flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7170ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
              >
                <Play size={14} />
                Watch demo
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={200} className="mt-16">
            <div className="rounded-[8px] border border-white/[0.08] bg-[#191a1b] h-[320px] md:h-[420px] flex items-center justify-center">
              {/* ponytail: replace with real product screenshot */}
              <div className="text-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                </div>
                <p className="text-[13px] text-[#8a8f98]">Dashboard preview</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 border-y border-white/[0.08]">
        <div className="max-w-[1120px] mx-auto px-6">
          <FadeIn>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[#8a8f98] text-center mb-8">
              Trusted by 500+ teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Stark Ind', 'Wayne Ent'].map((name) => (
                <span key={name} className="text-[14px] font-medium text-[#8a8f98]/50 tracking-tight select-none">
                  {name}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features — asymmetric layout */}
      <section className="py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[#5e6ad2] mb-3">Features</p>
            <h2 className="text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-white">
              Everything you need to stay compliant
            </h2>
            <p className="mt-3 text-[15px] text-[#8a8f98] max-w-[480px]">
              One tool to monitor, alert, and report on every SLA in your organisation.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 60}>
                <div
                  className={`rounded-[8px] border border-white/[0.08] bg-[#191a1b] p-6 hover:border-white/[0.14] transition-colors group ${
                    i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  } ${i === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <f.icon size={20} className="text-[#5e6ad2] mb-4" />
                  <h3 className="text-[15px] font-medium text-white mb-2">{f.title}</h3>
                  <p className="text-[14px] leading-[1.6] text-[#8a8f98]">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-y border-white/[0.08]">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[#5e6ad2] mb-3">How it works</p>
            <h2 className="text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-white">
              Up and running in minutes
            </h2>
          </FadeIn>

          <div className="mt-14 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-6 left-[calc(16.67%+12px)] right-[calc(16.67%+12px)] h-px bg-white/[0.08]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <FadeIn key={s.num} delay={i * 100}>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-[#191a1b] flex items-center justify-center text-[13px] font-medium text-[#5e6ad2] mb-5 relative z-10">
                      {s.num}
                    </div>
                    <h3 className="text-[15px] font-medium text-white mb-2">{s.title}</h3>
                    <p className="text-[14px] leading-[1.6] text-[#8a8f98]">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[#5e6ad2] mb-3">Pricing</p>
            <h2 className="text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-white">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-[15px] text-[#8a8f98]">No hidden fees. Cancel anytime.</p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {tiers.map((t, i) => (
              <FadeIn key={t.name} delay={i * 80}>
                <div
                  className={`rounded-[8px] border p-6 flex flex-col ${
                    t.highlight
                      ? 'border-[#5e6ad2] bg-[#191a1b] relative'
                      : 'border-white/[0.08] bg-[#191a1b]'
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 px-3 rounded-full bg-[#5e6ad2] text-[11px] font-medium text-white flex items-center">
                      Most popular
                    </div>
                  )}
                  <h3 className="text-[14px] font-medium text-[#8a8f98]">{t.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-[32px] font-semibold tracking-[-0.02em] text-white">{t.price}</span>
                    <span className="text-[13px] text-[#8a8f98]">{t.period}</span>
                  </div>
                  <p className="mt-3 text-[14px] text-[#8a8f98] leading-[1.5]">{t.desc}</p>
                  <Link
                    href="/signup"
                    className={`mt-6 h-9 rounded-[6px] text-[13px] font-medium flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7170ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a] ${
                      t.highlight
                        ? 'bg-[#5e6ad2] hover:bg-[#7170ff] text-white'
                        : 'border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-[#f7f8f8]'
                    }`}
                  >
                    {t.cta}
                  </Link>
                  <ul className="mt-6 space-y-3 flex-1">
                    {t.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-[13px] text-[#8a8f98]">
                        <Check size={14} className="text-[#10b981] mt-0.5 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 border-t border-white/[0.08]">
        <div className="max-w-[640px] mx-auto">
          <FadeIn>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[#5e6ad2] mb-3">FAQ</p>
            <h2 className="text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-white">
              Frequently asked questions
            </h2>
          </FadeIn>
          <div className="mt-10">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-24 px-6">
        <div className="max-w-[1120px] mx-auto">
          <FadeIn>
            <div className="rounded-[8px] border border-white/[0.08] bg-[#191a1b] px-8 py-14 md:flex md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-white">
                  Ready to stop missing SLAs?
                </h2>
                <p className="mt-3 text-[15px] text-[#8a8f98] max-w-[420px]">
                  Start tracking in minutes. Free plan available, no credit card required.
                </p>
              </div>
              <Link
                href="/signup"
                className="mt-6 md:mt-0 h-10 px-6 rounded-[6px] bg-[#5e6ad2] hover:bg-[#7170ff] text-[14px] font-medium text-white flex items-center gap-2 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7170ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090a]"
              >
                Get started free
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-12 px-6">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[14px] font-semibold text-white">SLATracker</span>
            <p className="mt-1 text-[13px] text-[#8a8f98]">SLA monitoring for modern teams.</p>
          </div>
          <div className="flex gap-10 text-[13px]">
            <div className="space-y-2.5">
              <p className="text-[#8a8f98] font-medium text-[12px] uppercase tracking-[0.08em]">Product</p>
              <Link href="#pricing" className="block text-[#8a8f98] hover:text-white transition-colors">Pricing</Link>
              <Link href="/integrations" className="block text-[#8a8f98] hover:text-white transition-colors">Integrations</Link>
              <Link href="/changelog" className="block text-[#8a8f98] hover:text-white transition-colors">Changelog</Link>
            </div>
            <div className="space-y-2.5">
              <p className="text-[#8a8f98] font-medium text-[12px] uppercase tracking-[0.08em]">Company</p>
              <Link href="/about" className="block text-[#8a8f98] hover:text-white transition-colors">About</Link>
              <Link href="/blog" className="block text-[#8a8f98] hover:text-white transition-colors">Blog</Link>
              <Link href="/careers" className="block text-[#8a8f98] hover:text-white transition-colors">Careers</Link>
            </div>
            <div className="space-y-2.5">
              <p className="text-[#8a8f98] font-medium text-[12px] uppercase tracking-[0.08em]">Legal</p>
              <Link href="/privacy" className="block text-[#8a8f98] hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="block text-[#8a8f98] hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1120px] mx-auto mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-[12px] text-[#8a8f98]">© 2026 SLATracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

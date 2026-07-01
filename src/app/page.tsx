import React from 'react';

const features = [
  { icon: "🎯", title: "Real-time Monitoring", description: "Track SLA compliance across all your services with live dashboards and instant alerts." },
  { icon: "⚡", title: "Automated Breach Detection", description: "Instantly identify when SLAs are breached and trigger automated response workflows." },
  { icon: "📊", title: "Compliance Reporting", description: "Generate audit-ready reports for management, clients, and regulatory requirements." },
  { icon: "🔔", title: "Smart Notifications", description: "Multi-channel alerts via Slack, email, or PagerDuty when thresholds are crossed." },
  { icon: "🔧", title: "Policy Management", description: "Define granular SLA policies for different services, regions, and time windows." },
  { icon: "📈", title: "Historical Analytics", description: "Analyze trends over time to predict and prevent future SLA breaches." }
];

const pricingTiers = [
  { name: "Free", price: "$0", features: ["Up to 3 SLA policies", "1,000 metrics/day", "Email alerts", "Basic reports"], highlight: false },
  { name: "Pro", price: "$49", features: ["Unlimited SLA policies", "100,000 metrics/day", "Slack + PagerDuty alerts", "Advanced analytics", "Priority support"], highlight: true },
  { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Dedicated support", "Custom integrations", "SLA guarantee", "On-premise option"], highlight: false }
];

const faqItems = [
  { question: "How does SLATracker calculate compliance?", answer: "SLATracker continuously monitors your services against defined thresholds. Compliance is calculated as the percentage of time within SLA targets over the measurement window." },
  { question: "What integrations do you support?", answer: "We support Slack, PagerDuty, Microsoft Teams, email, and custom webhooks. Pro and Enterprise plans include additional integrations like Jira and ServiceNow." },
  { question: "Can I create custom SLA policies?", answer: "Yes! You can define policies for uptime, latency, error rate, and custom metrics. Each policy has its own target, measurement window, and alert thresholds." },
  { question: "How is billing calculated for Pro plans?", answer: "Pro plans are billed monthly based on the number of active SLA policies and total metrics processed. We offer volume discounts for larger deployments." }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">SLATracker</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-slate-800/50 dark:to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Trusted by 500+ engineering teams</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            SLA monitoring <span className="text-blue-600">that actually works</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Stop firefighting SLA breaches. Get proactive monitoring, automated alerts, and compliance reports—all in one beautiful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Start free trial
            </button>
            <button className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="py-12 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">Trusted by forward-thinking companies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            {['Acme Corp', 'TechStart', 'GlobalNet', 'CloudBase', 'SecureStack'].map((company) => (
              <span key={company} className="text-lg font-bold text-slate-400 dark:text-slate-500">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Everything you need for SLA management
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A complete toolkit for monitoring, enforcing, and reporting on service level agreements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 mx-16" />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Define policies", description: "Set up SLA thresholds for your services with our intuitive policy builder." },
                { step: "2", title: "Connect data", description: "Integrate with your existing monitoring tools or use our API to send metrics." },
                { step: "3", title: "Monitor & act", description: "Get real-time dashboards and automated alerts when SLAs are at risk." }
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <div key={i} className={`rounded-xl border ${tier.highlight ? 'border-blue-600 ring-2 ring-blue-600' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-800 p-8 shadow-sm relative`}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  {tier.price}<span className="text-lg font-normal text-slate-500 dark:text-slate-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <span className="text-emerald-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${tier.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                  {tier.name === 'Enterprise' ? 'Contact sales' : 'Start free trial'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Loved by engineering teams
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              See what our customers have to say about SLATracker.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "SLATracker transformed how we handle SLAs. We reduced breach response time by 70% and improved compliance reporting by 90%.", name: "Alex Chen", role: "VP of Engineering", company: "TechStart" },
              { quote: "The real-time dashboard gives me complete visibility across all our services. It's become essential for our operations team.", name: "Maria Rodriguez", role: "Director of Operations", company: "GlobalNet" },
              { quote: "Finally, an SLA tool that actually works. Setup took 15 minutes and we were monitoring our critical services immediately.", name: "Sam Wilson", role: "Senior DevOps Engineer", company: "SecureStack" }
            ].map((testimonial, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 p-8">
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Everything you need to know about SLATracker.
            </p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="font-semibold text-slate-900 dark:text-white">{item.question}</span>
                  <span className="text-slate-400">→</span>
                </button>
                <div className="px-6 pb-4 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Ready to take control of your SLAs?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ teams using SLATracker to monitor and enforce their service level agreements. Start your free trial today.
          </p>
          <button className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
            Start free trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">SLATracker</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Monitor and enforce SLAs with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Integrations', 'API'].map((link) => (
                  <li key={link}><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                  <li key={link}><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Stay updated</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Get the latest updates and news.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
                />
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2024 SLATracker. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Security'].map((link) => (
                <a key={link} href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
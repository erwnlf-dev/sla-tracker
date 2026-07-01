'use client'

import { useState } from 'react'
import {
  User, Bell, Database, Key, Copy, Check, Upload, Download,
  RotateCcw, Mail, MessageSquare, AlertCircle
} from 'lucide-react'

export default function SettingsPage() {
  const [name, setName] = useState('Alex Morgan')
  const [email, setEmail] = useState('alex@company.com')
  const [emailNotif, setEmailNotif] = useState(true)
  const [slackNotif, setSlackNotif] = useState(true)
  const [pagerdutyNotif, setPagerdutyNotif] = useState(false)
  const [copied, setCopied] = useState(false)
  const maskedKey = 'sk_live_••••••••••••••••7a4f'

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Profile */}
      <section className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f1011] overflow-hidden">
        <div className="flex items-center gap-2.5 border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
          <User className="h-4.5 w-4.5 text-[#5e6ad2]" />
          <h3 className="text-sm font-semibold text-[#f7f8f8]">Profile</h3>
        </div>
        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8a8f98]">Full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.06)] px-3 py-2.5 text-sm text-[#f7f8f8] focus:border-[#5e6ad2] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8a8f98]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.06)] px-3 py-2.5 text-sm text-[#f7f8f8] focus:border-[#5e6ad2] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex justify-end pt-1">
            <button className="rounded-lg bg-[#5e6ad2] px-4 py-2 text-sm font-medium text-white hover:bg-[#7170ff] transition-colors">
              Save changes
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f1011] overflow-hidden">
        <div className="flex items-center gap-2.5 border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
          <Bell className="h-4.5 w-4.5 text-[#5e6ad2]" />
          <h3 className="text-sm font-semibold text-[#f7f8f8]">Notifications</h3>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {[
            { label: 'Email alerts', desc: 'Receive breach and recovery notifications via email', icon: Mail, on: emailNotif, toggle: () => setEmailNotif(!emailNotif) },
            { label: 'Slack integration', desc: 'Post incident updates to your configured Slack channel', icon: MessageSquare, on: slackNotif, toggle: () => setSlackNotif(!slackNotif) },
            { label: 'PagerDuty escalation', desc: 'Trigger PagerDuty incidents for critical SLA breaches', icon: AlertCircle, on: pagerdutyNotif, toggle: () => setPagerdutyNotif(!pagerdutyNotif) },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between px-5 py-4 hover:bg-[#191a1b] transition-colors">
              <div className="flex items-center gap-3">
                <item.icon className="h-4.5 w-4.5 text-[#8a8f98]" />
                <div>
                  <p className="text-sm font-medium text-[#f7f8f8]">{item.label}</p>
                  <p className="text-xs text-[#8a8f98]">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={item.toggle}
                className={`relative h-5 w-9 rounded-full transition-colors ${item.on ? 'bg-[#5e6ad2]' : 'bg-[#191a1b] border border-[rgba(255,255,255,0.12)]'}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${item.on ? 'left-[18px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Data */}
      <section className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f1011] overflow-hidden">
        <div className="flex items-center gap-2.5 border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
          <Database className="h-4.5 w-4.5 text-[#5e6ad2]" />
          <h3 className="text-sm font-semibold text-[#f7f8f8]">Data Management</h3>
        </div>
        <div className="flex flex-wrap gap-3 p-5">
          <button className="flex items-center gap-2 rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.08)] px-4 py-2.5 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] hover:border-[rgba(255,255,255,0.15)] transition-all">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.08)] px-4 py-2.5 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] hover:border-[rgba(255,255,255,0.15)] transition-all">
            <Upload className="h-4 w-4" />
            Import Data
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all">
            <RotateCcw className="h-4 w-4" />
            Reset All Data
          </button>
        </div>
      </section>

      {/* API Key */}
      <section className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0f1011] overflow-hidden">
        <div className="flex items-center gap-2.5 border-b border-[rgba(255,255,255,0.06)] px-5 py-4">
          <Key className="h-4.5 w-4.5 text-[#5e6ad2]" />
          <h3 className="text-sm font-semibold text-[#f7f8f8]">API Key</h3>
        </div>
        <div className="p-5">
          <p className="text-xs text-[#8a8f98] mb-3">Use this key to authenticate API requests. Keep it secret.</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.06)] px-3 py-2.5 font-mono text-sm text-[#d0d6e0]">
              {maskedKey}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg bg-[#191a1b] border border-[rgba(255,255,255,0.08)] px-3 py-2.5 text-sm font-medium text-[#d0d6e0] hover:text-[#f7f8f8] hover:border-[rgba(255,255,255,0.15)] transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

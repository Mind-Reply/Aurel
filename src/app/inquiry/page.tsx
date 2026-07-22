'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import EyebrowLabel from '@/components/EyebrowLabel'
import { GoldLineFull } from '@/components/GoldLine'

const environmentTypes = [
  'Private Residence / Villa',
  'Boutique Hotel / Hospitality',
  'Executive Office / Members Club',
  'Private Clinic / Medical Suite',
  'Restaurant / Showroom / Event Space',
  'Multi-Property Portfolio',
  'Other',
]

const services = [
  'Private Connectivity Blueprint',
  'Residence / Venue Design',
  'Seamless Guest Access',
  'Concierge Care Plan',
  'Upgrade Path Membership',
  'Full Programme',
]

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', environment: '', service: '', location: '', message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = `w-full bg-transparent border-b border-aurel-gold/20 focus:border-aurel-gold/60 outline-none py-3 text-aurel-pearl text-sm placeholder-aurel-stone/40 transition-colors duration-300`
  const labelClass = `block text-[10px] text-aurel-stone uppercase tracking-widest mb-2`

  return (
    <main className="bg-aurel-black min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-48 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <EyebrowLabel label="Private Inquiry" className="mb-8" />
            <h1 className="font-serif text-5xl md:text-7xl font-light text-aurel-pearl leading-tight mb-8 max-w-3xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Every engagement begins<br />
              with a{' '}
              <em className="text-aurel-gold">private conversation.</em>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-aurel-gold to-transparent mb-10" />
            <p className="text-aurel-stone text-lg max-w-lg leading-relaxed">
              No public pricing. No self-serve packages. A direct exchange about your environment, what it requires, and whether AUREL is the right fit.
            </p>
          </Reveal>
        </div>
      </section>

      <GoldLineFull className="mx-6 lg:mx-12" />

      {/* Form */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <Reveal>
              <div className="text-center py-20">
                <div className="font-serif text-6xl font-light text-aurel-gold mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>âœ¦</div>
                <h2 className="font-serif text-4xl font-light text-aurel-pearl mb-6"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Inquiry received.
                </h2>
                <p className="text-aurel-stone leading-relaxed max-w-md mx-auto mb-4">
                  We will review your inquiry privately and respond within 24 hours with a direct, personal reply.
                </p>
                <p className="text-aurel-stone/60 text-sm">
                  No automated sequences. No mass responses. A single point of contact from the first reply onward.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left context */}
                <div className="lg:col-span-1">
                  <h2 className="font-serif text-2xl font-light text-aurel-pearl mb-6"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                    What happens next
                  </h2>
                  <div className="space-y-8">
                    {[
                      { step: '01', label: 'We read your inquiry', body: 'Personally reviewed within 24 hours. No automated acknowledgements.' },
                      { step: '02', label: 'We respond directly', body: 'A single point of contact replies with a direct, considered response â€” not a template.' },
                      { step: '03', label: 'We schedule a conversation', body: 'A private call or meeting to understand your environment in detail.' },
                      { step: '04', label: 'Blueprint proposal', body: 'If there is a fit, we propose a Private Connectivity Blueprint as the first formal step.' },
                    ].map(s => (
                      <div key={s.step} className="flex gap-4">
                        <span className="text-aurel-gold/40 font-serif text-xl flex-shrink-0"
                          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{s.step}</span>
                        <div>
                          <div className="text-aurel-pearl text-sm font-light mb-1">{s.label}</div>
                          <div className="text-aurel-stone text-xs leading-relaxed">{s.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-aurel-gold/10">
                    <p className="text-aurel-stone text-xs leading-relaxed">
                      All inquiries are handled with full discretion under NDA where requested. Your information is never shared.
                    </p>
                  </div>
                </div>

                {/* Right form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label htmlFor="name" className={labelClass} style={{ letterSpacing: '0.2em' }}>Your Name</label>
                      <input
                        type="text" id="name" name="name" required
                        value={form.name} onChange={handleChange}
                        placeholder="Full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass} style={{ letterSpacing: '0.2em' }}>Email Address</label>
                      <input
                        type="email" id="email" name="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="Private email"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="environment" className={labelClass} style={{ letterSpacing: '0.2em' }}>Environment Type</label>
                    <select
                      id="environment" name="environment" required
                      value={form.environment} onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      style={{ appearance: 'none' }}
                    >
                      <option value="" className="bg-aurel-charcoal">Select environment</option>
                      {environmentTypes.map(t => (
                        <option key={t} value={t} className="bg-aurel-charcoal">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="service" className={labelClass} style={{ letterSpacing: '0.2em' }}>Service of Interest</label>
                    <select
                      id="service" name="service" required
                      value={form.service} onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      style={{ appearance: 'none' }}
                    >
                      <option value="" className="bg-aurel-charcoal">Select service</option>
                      {services.map(s => (
                        <option key={s} value={s} className="bg-aurel-charcoal">{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className={labelClass} style={{ letterSpacing: '0.2em' }}>Location / Country</label>
                    <input
                      type="text" id="location" name="location"
                      value={form.location} onChange={handleChange}
                      placeholder="City, Country"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass} style={{ letterSpacing: '0.2em' }}>Your Message</label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Describe your environment, current challenges, or what you are looking to achieve."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-12 py-4 bg-aurel-gold text-aurel-black text-[11px] uppercase tracking-widest hover:bg-aurel-gold-light transition-colors duration-300 font-medium"
                      style={{ letterSpacing: '0.18em' }}
                    >
                      Submit Private Inquiry
                    </button>
                    <p className="text-aurel-stone text-xs mt-4">
                      By submitting, you confirm this inquiry is confidential. We will never share your details.
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

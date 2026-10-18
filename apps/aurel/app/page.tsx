'use client';

import React, { useState } from 'react';
import { InquiryModal } from '../components/InquiryModal';

export default function AurelLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openInquiry = () => setIsModalOpen(true);

  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#1A1A1A] antialiased selection:bg-[#E8E6DF] selection:text-[#1A1A1A]">
      <header className="sticky top-0 z-40 w-full border-b border-[#E8E6DF] bg-[#FBFBF9]/90 px-6 py-5 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" aria-label="AUREL home" className="flex flex-col">
            <span className="font-serif text-lg font-medium uppercase tracking-[0.25em]">AUREL</span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#7D7566]">Invisible Premium Connectivity</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center space-x-8 text-xs uppercase tracking-[0.15em] text-[#4A4742] md:flex">
            <a href="#standard" className="transition-colors hover:text-[#1A1A1A]">The Standard</a>
            <a href="#residence" className="transition-colors hover:text-[#1A1A1A]">Residence</a>
            <a href="#hospitality" className="transition-colors hover:text-[#1A1A1A]">Hospitality</a>
            <a href="#telemetry" className="transition-colors hover:text-[#1A1A1A]">Telemetry</a>
          </nav>
          <button type="button" onClick={openInquiry} className="border border-[#1A1A1A] px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#1A1A1A] hover:text-[#FBFBF9]">Inquire</button>
        </div>
      </header>

      <section className="flex min-h-[75vh] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-[#7D7566]">Private Network Architecture</span>
          <h1 className="mb-6 font-serif text-5xl font-normal leading-tight tracking-tight md:text-6xl">We do not sell routers.<br /><span className="font-light italic text-[#7D7566]">We design confidence.</span></h1>
          <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-[#59554F] md:text-lg">Every room, every device, every moment — calm, stable, seamless connectivity engineered for high-consequence architectural estates.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={openInquiry} className="w-full border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-4 text-xs uppercase tracking-[0.2em] text-[#FBFBF9] shadow-sm transition-colors hover:bg-[#333333] sm:w-auto">Begin Private Inquiry</button>
            <a href="#standard" className="w-full border border-[#D5D2C7] px-8 py-4 text-center text-xs uppercase tracking-[0.2em] transition-colors hover:border-[#1A1A1A] sm:w-auto">The Standard</a>
          </div>
        </div>
      </section>

      <section id="standard" className="border-t border-[#E8E6DF] px-6 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4"><span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#7D7566]">The Architecture</span><h2 className="font-serif text-3xl font-normal leading-snug md:text-4xl">Infrastructure as an extension of interior space.</h2></div>
          <div className="flex flex-col space-y-8 text-base font-light leading-relaxed text-[#4A4742] md:col-span-8">
            <p>Traditional enterprise networks optimize for throughput at the cost of operational noise. In architectural estates, cables, blinking arrays, and unscheduled resets compromise the sanctuary of intentional design.</p>
            <p>AUREL integrates high-reliability wireless infrastructure into plaster, masonry, and millwork, with performance and coverage validated against each property’s actual requirements.</p>
            <div className="grid grid-cols-1 gap-8 border-t border-[#E8E6DF] pt-8 sm:grid-cols-3">
              <div><span className="mb-1 block font-serif text-3xl">Designed</span><span className="text-xs uppercase tracking-[0.15em] text-[#7D7566]">For resilience</span></div>
              <div><span className="mb-1 block font-serif text-3xl">Measured</span><span className="text-xs uppercase tracking-[0.15em] text-[#7D7566]">Against real conditions</span></div>
              <div><span className="mb-1 block font-serif text-3xl">Discreet</span><span className="text-xs uppercase tracking-[0.15em] text-[#7D7566]">By design</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="residence" className="border-t border-[#E8E6DF] bg-[#F4F2EC] px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl"><span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-[#7D7566]">Commission Frameworks</span><h2 className="font-serif text-3xl font-normal md:text-4xl">Bespoke network design for demanding environments.</h2></div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <article className="flex flex-col justify-between border border-[#E8E6DF] bg-white p-8 md:p-10"><div><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#7D7566]">Portfolio 01</span><h3 className="mb-4 font-serif text-2xl">Architectural Residences</h3><p className="mb-6 text-sm font-light leading-relaxed text-[#59554F]">Site-specific wireless planning for concrete, glass, and steel boundaries, with discreet access points and resilient connectivity options.</p></div><ul className="space-y-2 border-t border-[#F4F2EC] pt-6 text-xs uppercase tracking-[0.1em] text-[#4A4742]"><li>• Concealed cabling strategy</li><li>• Multi-WAN failover planning</li><li>• Segmented connected devices</li></ul></article>
            <article id="hospitality" className="flex flex-col justify-between border border-[#E8E6DF] bg-white p-8 md:p-10"><div><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#7D7566]">Portfolio 02</span><h3 className="mb-4 font-serif text-2xl">Private Hospitality & Villas</h3><p className="mb-6 text-sm font-light leading-relaxed text-[#59554F]">Guest connectivity designed for high-density use across indoor and outdoor spaces, with operational visibility and defined service expectations.</p></div><ul className="space-y-2 border-t border-[#F4F2EC] pt-6 text-xs uppercase tracking-[0.1em] text-[#4A4742]"><li>• Seamless roaming design</li><li>• Segregated guest access</li><li>• Remote health monitoring options</li></ul></article>
          </div>
        </div>
      </section>

      <section id="telemetry" className="border-t border-[#E8E6DF] px-6 py-20 md:px-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#7D7566]">Auditable Telemetry</span><h3 className="font-serif text-2xl">Operational records and network assurance.</h3></div><button type="button" onClick={openInquiry} className="border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-[#FBFBF9] transition-colors hover:bg-[#333333]">Commission Assessment</button></div></section>

      <footer className="border-t border-[#E8E6DF] bg-[#FBFBF9] px-6 py-16 md:px-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><span className="block font-serif text-lg uppercase tracking-[0.2em]">AUREL</span><p className="mt-1 text-xs font-light text-[#7D7566]">Engineering discreet connectivity, commissioned worldwide.</p></div><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"><a className="text-xs uppercase tracking-[0.1em] text-[#4A4742] underline-offset-4 hover:underline" href="mailto:contact@aurel.io">Inquiries: contact@aurel.io</a><span className="text-[11px] tracking-wider text-[#A8A29E]">© {new Date().getFullYear()} AUREL. All rights reserved.</span></div></div></footer>
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillLane?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, prefillLane }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [residenceLocation, setResidenceLocation] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState<'residential' | 'hospitality' | 'private_office'>('residential');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (prefillLane) {
      setMessage((prev) => (prev.startsWith('Lane of interest:') || prev === '' ? `Lane of interest: ${prefillLane}` : prev));
    }
  }, [prefillLane]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          residenceLocation: residenceLocation.trim(),
          portfolioCategory,
          message: message.trim(),
          lane: prefillLane || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');
      if (!data.receipt) throw new Error('The server did not return an inquiry receipt.');
      setReceipt(data.receipt);
      try {
        localStorage.setItem('aurel-last-receipt', data.receipt);
      } catch {}
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Network communication failure.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090807]/70 backdrop-blur-md p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-xl border border-white/10 bg-[#161310] p-8 shadow-2xl md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inquiry dialog"
          className="absolute right-6 top-6 text-[11px] uppercase tracking-[0.18em] text-[#8a7f72] hover:text-[#f3ece3] transition-colors"
        >
          [ Close ]
        </button>

        {receipt ? (
          <div className="space-y-4 py-8 text-center">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#c9854a]">Inquiry Registered</span>
            <h3 id="modal-title" className="font-display text-3xl font-light text-[#f3ece3]">Receipt Confirmed</h3>
            <p className="inline-block border border-white/10 bg-[#0c0b0a] px-4 py-2 font-mono text-sm tracking-wider text-[#c9854a]">
              {receipt}
            </p>
            <p className="mx-auto max-w-md text-sm font-light text-[#8a7f72]">
              Your inquiry is registered. We respond within <span className="text-[#f3ece3]">48 hours</span> using the contact you provided. Keep this receipt for reference.
            </p>
            <p className="text-[11px] text-[#5c564e]">
              No further action required until you hear from us.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 border border-[#c9854a] bg-[#c9854a] px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors hover:bg-transparent hover:text-[#c9854a]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-[#c9854a]">Private Commission</span>
              <h3 id="modal-title" className="font-display text-2xl font-light text-[#f3ece3] md:text-3xl">Begin Consultation</h3>
              {prefillLane && (
                <p className="mt-2 text-[11px] text-[#8a7f72]">Aligned to: <span className="text-[#c9854a]">{prefillLane}</span></p>
              )}
              <p className="mt-2 text-[11px] text-[#5c564e]">Response within 48 hours · Limited new commissions</p>
            </div>

            {errorMsg && (
              <div role="alert" aria-live="polite" className="border border-red-900/50 bg-red-950/30 p-3 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4 text-left">
              <div>
                <label htmlFor="inquiry-full-name" className="mb-1 block text-[11px] uppercase tracking-[0.15em] text-[#8a7f72]">Full Name</label>
                <input
                  id="inquiry-full-name"
                  name="fullName"
                  autoComplete="name"
                  type="text"
                  required
                  maxLength={160}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Principal or Representative"
                  className="w-full border border-white/10 bg-[#0c0b0a] px-4 py-3 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="mb-1 block text-[11px] uppercase tracking-[0.15em] text-[#8a7f72]">Corporate / Confidential Email</label>
                <input
                  id="inquiry-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full border border-white/10 bg-[#0c0b0a] px-4 py-3 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-location" className="mb-1 block text-[11px] uppercase tracking-[0.15em] text-[#8a7f72]">Property Location</label>
                  <input
                    id="inquiry-location"
                    name="residenceLocation"
                    autoComplete="address-level2"
                    type="text"
                    required
                    maxLength={200}
                    value={residenceLocation}
                    onChange={(e) => setResidenceLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full border border-white/10 bg-[#0c0b0a] px-4 py-3 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-category" className="mb-1 block text-[11px] uppercase tracking-[0.15em] text-[#8a7f72]">Environment Type</label>
                  <select
                    id="inquiry-category"
                    name="portfolioCategory"
                    value={portfolioCategory}
                    onChange={(e) => setPortfolioCategory(e.target.value as typeof portfolioCategory)}
                    className="w-full border border-white/10 bg-[#0c0b0a] px-4 py-3 text-sm text-[#f3ece3] focus:border-[#c9854a] focus:outline-none"
                  >
                    <option value="residential">Architectural Residence</option>
                    <option value="hospitality">Boutique Hospitality</option>
                    <option value="private_office">Private Family Office</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="inquiry-message" className="mb-1 block text-[11px] uppercase tracking-[0.15em] text-[#8a7f72]">Project Scope &amp; Dimensions (Optional)</label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={3}
                  maxLength={5000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Square meters, construction materials, specific telemetry requirements…"
                  className="w-full border border-white/10 bg-[#0c0b0a] px-4 py-3 text-sm text-[#f3ece3] placeholder:text-[#5c564e] focus:border-[#c9854a] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-[#c9854a] bg-[#c9854a] py-4 text-[11px] uppercase tracking-[0.2em] text-[#090807] transition-colors hover:bg-transparent hover:text-[#c9854a] disabled:opacity-50"
            >
              {isSubmitting ? 'Registering…' : 'Submit Specifications'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

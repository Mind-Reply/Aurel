'use client';

import React, { useState } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [residenceLocation, setResidenceLocation] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState<'residential' | 'hospitality' | 'private_office'>('residential');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry.');
      if (!data.receipt) throw new Error('The server did not return an inquiry receipt.');
      setReceipt(data.receipt);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Network communication failure.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/40 backdrop-blur-sm p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-xl border border-[#E8E6DF] bg-[#FBFBF9] p-8 shadow-2xl md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inquiry dialog"
          className="absolute right-6 top-6 text-xs uppercase tracking-widest text-[#7D7566] hover:text-[#1A1A1A]"
        >
          [ Close ]
        </button>

        {receipt ? (
          <div className="space-y-4 py-8 text-center">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-[#9E8347]">Inquiry Registered</span>
            <h3 id="modal-title" className="font-serif text-3xl text-[#1A1A1A]">Receipt Confirmed</h3>
            <p className="inline-block border border-[#E8E6DF] bg-[#F4F2EC] px-4 py-2 font-mono text-sm tracking-wider text-[#4A4742]">
              {receipt}
            </p>
            <p className="mx-auto max-w-md text-sm font-light text-[#7D7566]">
              Your inquiry has been received. The team will review the details and respond using the contact information provided.
            </p>
            <button type="button" onClick={onClose} className="mt-6 border border-[#1A1A1A] bg-[#1A1A1A] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#FBFBF9]">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-[#7D7566]">Private Commission</span>
              <h3 id="modal-title" className="font-serif text-2xl text-[#1A1A1A] md:text-3xl">Begin Consultation</h3>
            </div>

            {errorMsg && <div role="alert" aria-live="polite" className="border border-[#F5C2C2] bg-[#FDF2F2] p-3 text-xs text-[#A83232]">{errorMsg}</div>}

            <div className="space-y-4 text-left">
              <div>
                <label htmlFor="inquiry-full-name" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#4A4742]">Full Name</label>
                <input id="inquiry-full-name" name="fullName" autoComplete="name" type="text" required maxLength={160} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Principal or Representative" className="w-full border border-[#D5D2C7] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none" />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#4A4742]">Corporate / Confidential Email</label>
                <input id="inquiry-email" name="email" autoComplete="email" type="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full border border-[#D5D2C7] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="inquiry-location" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#4A4742]">Property Location</label>
                  <input id="inquiry-location" name="residenceLocation" autoComplete="address-level2" type="text" required maxLength={200} value={residenceLocation} onChange={(e) => setResidenceLocation(e.target.value)} placeholder="City, Country" className="w-full border border-[#D5D2C7] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="inquiry-category" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#4A4742]">Environment Type</label>
                  <select id="inquiry-category" name="portfolioCategory" value={portfolioCategory} onChange={(e) => setPortfolioCategory(e.target.value as typeof portfolioCategory)} className="w-full border border-[#D5D2C7] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none">
                    <option value="residential">Architectural Residence</option>
                    <option value="hospitality">Boutique Hospitality</option>
                    <option value="private_office">Private Family Office</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="inquiry-message" className="mb-1 block text-xs uppercase tracking-[0.15em] text-[#4A4742]">Project Scope &amp; Dimensions (Optional)</label>
                <textarea id="inquiry-message" name="message" rows={3} maxLength={5000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Square meters, construction materials, specific telemetry requirements..." className="w-full border border-[#D5D2C7] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full border border-[#1A1A1A] bg-[#1A1A1A] py-4 text-xs uppercase tracking-[0.2em] text-[#FBFBF9] transition-colors hover:bg-[#333333] disabled:opacity-50">
              {isSubmitting ? 'Registering…' : 'Submit Specifications'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* eslint-disable react/no-unescaped-entities */
'use client';

import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';
import ValidationModal from './ValidationModal';

export default function Hero() {
  const [showValidation, setShowValidation] = useState(false);

  const handlePrimaryClick = () => {
    trackEvent('hero_cta_clicked', { cta_type: 'primary' });
    setShowValidation(true);
  };

  const handleSecondaryClick = () => {
    trackEvent('hero_cta_clicked', { cta_type: 'secondary' });
    document.getElementById('validation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative bg-gradient-to-b from-slate-50 to-white pt-20 pb-20 sm:pt-32 sm:pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Visual element: subtle world connection */}
          <div className="mb-12 flex justify-center opacity-40">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-secondary-500">
              <circle cx="30" cy="30" r="8" fill="currentColor" />
              <circle cx="90" cy="80" r="8" fill="currentColor" />
              <line x1="30" y1="30" x2="90" y2="80" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
            Meet people.
            <br />
            Not dates.
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Genuine friendships with people around the world — built around conversation, curiosity
            and simply getting to know each other.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handlePrimaryClick}
              className="px-8 py-4 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 transition-colors"
            >
              Would you use this?
            </button>
            <button
              onClick={handleSecondaryClick}
              className="px-8 py-4 border-2 border-primary-900 text-primary-900 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Tell us what you're looking for
            </button>
          </div>

          {/* Scroll hint */}
          <p className="text-sm text-slate-500 mt-8">
            ↓ Learn more about the idea
          </p>
        </div>
      </section>

      {showValidation && (
        <ValidationModal onClose={() => setShowValidation(false)} initialStep="interest" />
      )}
    </>
  );
}

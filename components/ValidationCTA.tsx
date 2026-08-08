/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import ValidationModal from './ValidationModal';

export default function ValidationCTA() {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'interest' | 'survey'>('interest');

  const handleYesClick = () => {
    trackEvent('interest_yes');
    setModalStep('survey');
    setShowModal(true);
  };

  const handleMaybeClick = () => {
    trackEvent('interest_maybe');
    setModalStep('survey');
    setShowModal(true);
  };

  const handleNoClick = () => {
    trackEvent('interest_no');
  };

  return (
    <>
      <section id="validation" className="py-20 sm:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-8">
            Would you use something like this?
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleYesClick}
              className="px-8 py-4 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors"
            >
              Yes — I'd love this
            </button>

            <button
              onClick={handleMaybeClick}
              className="px-8 py-4 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 transition-colors"
            >
              Maybe — tell me more
            </button>

            <button
              onClick={handleNoClick}
              className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Not for me
            </button>
          </div>

          <p className="text-slate-500 text-sm mt-8">
            Choose one to help us understand if this idea resonates with you.
          </p>
        </div>
      </section>

      {showModal && (
        <ValidationModal onClose={() => setShowModal(false)} initialStep={modalStep} />
      )}
    </>
  );
}

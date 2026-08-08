/* eslint-disable react/no-unescaped-entities */
'use client';

import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';

export default function CountryDiscovery() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    { code: 'LU', name: 'Luxembourg' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'CA', name: 'Canada' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'KE', name: 'Kenya' },
  ];

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(selectedCountry === countryName ? null : countryName);
    trackEvent('country_selected', { country: countryName });
  };

  return (
    <section className="py-20 sm:py-32 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 text-center">
          Who would you like to meet?
        </h2>

        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Tap any country to see if you'd be interested in connecting with people from there.
        </p>

        {/* Countries grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country.name)}
              className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                selectedCountry === country.name
                  ? 'border-secondary-600 bg-secondary-50 scale-105'
                  : 'border-slate-200 bg-white hover:border-secondary-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-4xl mb-2">🌍</div>
              <p className="font-semibold text-primary-900 text-sm">{country.name}</p>
            </button>
          ))}

          {/* Anywhere option */}
          <button
            onClick={() => handleCountrySelect('Anywhere')}
            className={`p-6 rounded-lg border-2 transition-all duration-200 text-center ${
              selectedCountry === 'Anywhere'
                ? 'border-secondary-600 bg-secondary-50 scale-105'
                : 'border-slate-200 bg-white hover:border-secondary-300 hover:bg-slate-50'
            }`}
          >
            <div className="text-4xl mb-2">🌐</div>
            <p className="font-semibold text-primary-900 text-sm">Anywhere</p>
          </button>
        </div>

        {selectedCountry && (
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6 text-center">
            <p className="text-slate-700">
              Interested in connecting with people from <span className="font-semibold text-primary-900">{selectedCountry}</span>?
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

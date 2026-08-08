'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface SurveyFormProps {
  onClose: () => void;
}

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
  'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia',
  'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China',
  'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Côte d\'Ivoire', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
  'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
  'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain',
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe',
];

export default function SurveyForm({ onClose }: SurveyFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCountrySelect = (country: string) => {
    setResponses((prev) => ({ ...prev, country }));
  };

  const handleCheckboxChange = (value: string) => {
    const current = (responses.features as string[]) || [];
    setResponses((prev) => ({
      ...prev,
      features: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    }));
  };

  const handleConnectionSelect = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      connectionType: value,
    }));
  };

  const handleImportanceSelect = (value: number) => {
    setResponses((prev) => ({
      ...prev,
      friendshipImportance: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    trackEvent('survey_completed', {
      country: responses.country as string,
      features_count: Array.isArray(responses.features) ? (responses.features as string[]).length : 0,
      connection_type: responses.connectionType as string,
      friendship_importance: responses.friendshipImportance as number,
      has_trust_feedback: !!responses.trustFeedback,
      wants_email: responses.wantsEmail as boolean,
    });
    setSubmitted(true);
  };

  const handleEmailSignup = (email: string) => {
    trackEvent('email_signup', { source: 'survey' });
    // In a real application, this would submit to a backend service
    console.log('Email signup:', email);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">
          Thank you for your feedback! 🎉
        </h2>
        <p className="text-slate-600 mb-6">
          Your insights will help us understand whether this idea resonates with people like you.
        </p>

        {/* Email signup */}
        <div className="bg-secondary-50 rounded-lg p-6 mb-6">
          <label className="block text-sm font-semibold text-primary-900 mb-4">
            Want to know when we launch?
          </label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value;
              if (email) {
                handleEmailSignup(email);
                alert("Thanks! We'll let you know when we launch.");
                onClose();
              }
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 text-slate-900"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 transition-colors whitespace-nowrap"
            >
              Notify me
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-3">
            We respect your privacy. No spam, just launch updates.
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  const questions = [
    {
      title: 'Where are you from?',
      type: 'country',
    },
    {
      title: 'What would you want from a platform like this?',
      type: 'multiple-choice',
      options: [
        'One-on-one friendships',
        'Group conversations',
        'Meet people from specific countries',
        'Cultural exchange',
        'Fun/random conversations',
        'Online events',
        'Shared hobbies/interests',
        'Other',
      ],
    },
    {
      title: 'How would you prefer to connect?',
      type: 'single-choice',
      options: ['Text', 'Voice', 'Video', 'Group conversation'],
    },
    {
      title: 'How important is friendship without dating?',
      type: 'scale',
      min: 1,
      max: 5,
      minLabel: 'Not important',
      maxLabel: 'Extremely important',
    },
    {
      title: 'What would make you trust a platform like this?',
      type: 'text',
    },
  ];

  const question = questions[currentQuestion];

  // @ts-ignore
  return (
    <div className="p-8">
      {/* Progress */}
      <div className="mb-8">
        <p className="text-sm text-slate-500 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-secondary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-2xl font-bold text-primary-900 mb-6">{question.title}</h3>

      {/* Answers */}
      <div className="space-y-4 mb-8">
        {question.type === 'country' && (
          <div className="space-y-2">
            <select
              value={responses.country || ''}
              onChange={(e) => handleCountrySelect(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 text-slate-900"
            >
              <option value="">Select your country...</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        )}

        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={((responses.features || []) as string[]).includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-5 h-5 appearance-none rounded border-2 border-slate-300 bg-white cursor-pointer checked:bg-secondary-600 checked:border-secondary-600"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'single-choice' && (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="connection"
                  value={option}
                  checked={responses.connectionType === option}
                  onChange={() => handleConnectionSelect(option)}
                  className="w-5 h-5 appearance-none border-2 border-slate-300 bg-white rounded-full cursor-pointer checked:bg-secondary-600 checked:border-secondary-600"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'scale' && (
          <div className="space-y-4">
            <div className="flex justify-between gap-2">
              {Array.from({ length: question.max || 5 }).map((_, i) => {
                const value = i + 1;
                return (
                  <button
                    key={value}
                    onClick={() => handleImportanceSelect(value)}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                      responses.friendshipImportance === value
                        ? 'bg-secondary-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-slate-500 px-2">
              <span>{question.minLabel}</span>
              <span>{question.maxLabel}</span>
            </div>
          </div>
        )}

        {question.type === 'text' && (
          <textarea
            value={(responses.trustFeedback || '') as string}
            onChange={(e) => setResponses((prev) => ({ ...prev, trustFeedback: e.target.value }))}
            placeholder="Tell us what would help you trust a platform like this..."
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 min-h-32 resize-none text-slate-900"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={
            (question.type === 'country' && !responses.country) ||
            (question.type === 'multiple-choice' &&
              (!Array.isArray(responses.features) || responses.features.length === 0)) ||
            (question.type === 'single-choice' && !responses.connectionType)
          }
          className="px-6 py-2 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

'use client';

import SurveyForm from './SurveyForm';

interface ValidationModalProps {
  onClose: () => void;
  initialStep: 'interest' | 'survey';
}

export default function ValidationModal({ onClose, initialStep }: ValidationModalProps) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 text-slate-400 hover:text-slate-600 float-right text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {initialStep === 'survey' && (
          <SurveyForm onClose={onClose} />
        )}
      </div>
    </div>
  );
}

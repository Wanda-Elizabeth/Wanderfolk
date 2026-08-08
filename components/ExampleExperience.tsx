export default function ExampleExperience() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-12 text-center">
          How it could work
        </h2>

        {/* Connection visualization */}
        <div className="space-y-8 max-w-2xl mx-auto">
          {/* You */}
          <div className="bg-slate-50 rounded-xl p-8 border-2 border-slate-200">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">
              You
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇰🇪</span>
                <span className="text-lg font-semibold text-primary-900">Kenya</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">Interested in:</p>
              <div className="flex flex-wrap gap-2">
                {['Movies', 'Music', 'Travel', 'Random conversations'].map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-center text-4xl text-slate-300">↓</div>

          {/* Meeting someone */}
          <div className="text-center">
            <p className="text-lg font-semibold text-primary-900">Meet someone from</p>
          </div>

          {/* Them */}
          <div className="bg-accent-50 rounded-xl p-8 border-2 border-accent-500">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wider mb-4">
              Potential friend
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇱🇺</span>
                <span className="text-lg font-semibold text-primary-900">Luxembourg</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">Interested in:</p>
              <div className="flex flex-wrap gap-2">
                {['Movies', 'Food', 'Travel', 'Random conversations'].map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-center text-4xl text-slate-300">↓</div>

          {/* CTA */}
          <div className="text-center">
            <button className="px-6 py-3 bg-primary-900 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors">
              Start a conversation
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-slate-500 text-center pt-8">
            This is a conceptual demonstration. We're currently validating demand before building
            matching functionality.
          </p>
        </div>
      </div>
    </section>
  );
}

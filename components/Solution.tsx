export default function Solution() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-8">
          A place for genuine connection.
        </h2>

        <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
          <p>
            Imagine a platform where people could discover others from different countries based on
            shared interests, have meaningful conversations, and see where a genuine friendship
            develops naturally.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 my-12">
            {[
              'Discover people from different countries',
              'Find people with shared interests',
              'Have one-to-one conversations',
              'Join group conversations',
              'Participate in international activities',
              'Discover other cultures',
              'Make genuine friendships',
            ].map((feature) => (
              <div key={feature} className="flex gap-4">
                <div className="text-secondary-600 text-2xl flex-shrink-0">✓</div>
                <p className="font-medium text-primary-900">{feature}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-100 p-8 rounded-lg border border-slate-200">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Current phase
            </p>
            <p className="text-lg font-semibold text-primary-900">
              We're not building all of that yet.
            </p>
            <p className="text-slate-700 mt-3">
              We're testing whether people actually want it. This is a validation experiment — your
              feedback will directly influence what we build next.
            </p>
          </div>

          <p className="text-slate-700">
            If you think this idea has potential, we want to hear from you. Your feedback will help us
            understand what features matter most and whether this is something people genuinely want.
          </p>
        </div>
      </div>
    </section>
  );
}

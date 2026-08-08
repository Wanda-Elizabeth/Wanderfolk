/* eslint-disable react/no-unescaped-entities */
export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
          <p>
            <strong>Last Updated:</strong> August 2026
          </p>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Overview</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Wanderfolk
              website and related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Current Status</h2>
            <p>
              <strong>Important Disclaimer:</strong> Wanderfolk is currently a validation MVP
              (Minimum Viable Product). This website exists to test whether people want an
              international friendship platform. No actual platform, user accounts, or messaging
              functionality exists yet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Survey & Feedback</h2>
            <p>
              By participating in our survey, you acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Your feedback is optional</li>
              <li>No guarantees are made about future development</li>
              <li>Your responses may be analyzed and shared (anonymously)</li>
              <li>You can withdraw at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Use of Website</h2>
            <p>You agree to use this website only for lawful purposes and in a way that:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Does not violate any applicable law or regulation</li>
              <li>Does not infringe upon the rights of others</li>
              <li>Does not interfere with the operation of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">
              Limitations of Liability
            </h2>
            <p>
              This website is provided "as is" without warranties of any kind. We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Website downtime or errors</li>
              <li>Loss of data</li>
              <li>Future availability of any service</li>
              <li>Decisions made based on this validation experiment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Email Signup</h2>
            <p>
              If you sign up for launch notifications, we will use your email only to notify you
              about Wanderfolk's development. We will not share your email with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Your continued use of the website constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:{' '}
              <a href="mailto:legal@wanderfolk.com" className="text-secondary-600 hover:underline">
                legal@wanderfolk.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

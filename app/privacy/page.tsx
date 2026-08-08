/* eslint-disable react/no-unescaped-entities */
export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
          <p>
            <strong>Last Updated:</strong> August 2026
          </p>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Overview</h2>
            <p>
              Wanderfolk ("we," "us," "our," or "Company") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Information We Collect</h2>
            <p>
              <strong>Survey Information:</strong> We collect optional information from our survey,
              including country of origin, interests, and communication preferences. Email addresses
              are collected only when explicitly offered.
            </p>
            <p>
              <strong>Analytics Information:</strong> We use Google Analytics 4 to understand how
              visitors interact with our website. This includes page views, engagement metrics, and
              anonymized demographic information.
            </p>
            <p>
              <strong>Device Information:</strong> We may collect information about your device type,
              operating system, and browser, which helps us understand device usage patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To understand whether people want this product</li>
              <li>To analyze feature preferences</li>
              <li>To improve our website and messaging</li>
              <li>To send launch notifications (if you opt in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Data Sharing</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties, except:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Google Analytics (anonymized analytics data)</li>
              <li>Email service providers (only if you opt in to launch notifications)</li>
              <li>As required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. To exercise
              these rights, please contact us at privacy@wanderfolk.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-900 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@wanderfolk.com" className="text-secondary-600 hover:underline">
                privacy@wanderfolk.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

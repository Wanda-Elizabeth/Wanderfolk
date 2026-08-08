import { trackEvent } from '@/lib/analytics';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12 border-t border-primary-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Wanderfolk</h3>
            <p className="text-primary-200">
              Genuine friendships with people around the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition">
                  How it works
                </a>
              </li>
              <li>
                <a href="#validation" className="hover:text-white transition">
                  Get started
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-800 pt-8 text-center text-sm text-primary-300">
          <p>
            This is a validation experiment. We're testing whether people actually want this before
            building the full platform.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} Wanderfolk. All rights reserved. No platform exists yet.
          </p>
        </div>
      </div>
    </footer>
  );
}

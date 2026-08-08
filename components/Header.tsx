export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <nav className="max-w-6xl mx-auto px-6 py-4 sm:py-5 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-900">Wanderfolk</div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#about" className="text-slate-700 hover:text-primary-900 transition">
            About
          </a>
          <a href="#how-it-works" className="text-slate-700 hover:text-primary-900 transition">
            How it works
          </a>
          <a href="#validation" className="text-slate-700 hover:text-primary-900 transition">
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}

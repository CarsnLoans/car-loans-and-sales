import { Link, useLocation } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import { SOCIAL_LINKS } from '../../constants/data';
import { Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { settings = {} } = useSettings();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const primaryPhone = settings.primaryPhone || '+91 8660516762';
  const alternatePhone = settings.alternatePhone || '+91 8197596707';
  const email = settings.email || 'info@carloansandsales.com';

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Benefits', path: '/benefits' },
    { label: 'Eligibility', path: '/eligibility' },
    { label: 'Interest Rates', path: '/interest-rates' },
    { label: 'EMI Calculator', path: '/emi-calculator' },
  ];

  const isActive = (path) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-dark text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span>Call: {primaryPhone} / {alternatePhone}</span>
            <span>Email: {email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Quick approval • Minimal docs</span>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Car Loans & Sales" className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  isActive(item.path) ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/apply" className="btn-primary !py-2 !px-4 text-sm inline-flex items-center">
              Apply Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`py-2 ${
                  isActive(item.path) ? 'text-primary font-semibold' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/apply" onClick={() => setMenuOpen(false)} className="btn-primary text-center">
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

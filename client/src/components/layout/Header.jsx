import { Link, useLocation } from 'react-router-dom';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants/data';
import { Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
            <span>Call: {CONTACT_INFO.phone}</span>
            <span>Email: {CONTACT_INFO.email}</span>
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
          <Link to="/" className="text-2xl font-bold text-primary">
            Car Loans & Sales
          </Link>

          <nav className="hidden md:flex space-x-6">
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
            <Link to="/apply" className="btn-primary !py-2 !px-4 text-sm">
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

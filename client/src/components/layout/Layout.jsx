import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Accordion from '../common/Accordion';
import QuickApplyBar from '../common/QuickApplyBar';
import { FAQS } from '../../constants/data';
import { BadgeCheck, ShieldCheck, Timer } from 'lucide-react';
import { useEffect } from 'react';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('reveal-active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  const showCommonFaq = pathname !== '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <section className="py-16 px-4 bg-gray-50 reveal" data-reveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Fast approvals, honest pricing</h2>
            <p className="text-gray-600 mt-3">Trusted by thousands for transparent, hassle-free financing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 reveal" data-reveal>
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Timer className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Quick Decisions</h3>
              <p className="text-gray-600 mt-2">Get eligibility in minutes with minimal documentation.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 reveal" data-reveal>
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Secure & Compliant</h3>
              <p className="text-gray-600 mt-2">Your data is protected with industry-grade security.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 reveal" data-reveal>
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Best-Rate Network</h3>
              <p className="text-gray-600 mt-2">Compare offers from trusted partners for the right deal.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="reveal" data-reveal>
        <QuickApplyBar />
      </div>
      {showCommonFaq && (
        <section className="py-16 px-4 reveal" data-reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-6">Common Questions</h2>
            <Accordion items={FAQS.slice(0, 5)} />
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Layout;

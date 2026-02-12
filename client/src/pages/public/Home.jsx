import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Accordion from '../../components/common/Accordion';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import usePageMeta from '../../hooks/usePageMeta';
import useSettings from '../../hooks/useSettings';
import {
  Car,
  ClipboardList,
  BadgeCheck,
  Timer,
  Wallet,
  BadgeIndianRupee,
  ShieldCheck,
  Sparkles,
  HandCoins,
  RefreshCcw,
  ArrowRightLeft,
  Star,
} from 'lucide-react';
import {
  HERO_IMAGE,
  LOAN_STEPS,
  LENDING_PARTNERS,
  TESTIMONIALS,
  COMPANY_METRICS,
  FAQS,
} from '../../constants/data';

const Home = () => {
  const { settings = {} } = useSettings();
  
  const primaryPhone = settings.primaryPhone || '+91 8660516762';
  const alternatePhone = settings.alternatePhone || '+91 8197596707';
  const loanTypes = settings.loanTypes || [
    'New Car Loan',
    'Used Car Loan',
    'Auto Loan Top Up',
    'Refinance',
    'Balance Transfer',
    'Personal Loan',
    'Home Loan',
  ];
  
  usePageMeta({
    title: 'Car Loans & Sales | Home',
    description: 'Get quick approvals, low interest rates, and flexible repayment options for your car loan.',
  });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const stepIcons = [<ClipboardList key="s1" />, <BadgeCheck key="s2" />, <Car key="s3" />];
  const loanTypeIcons = [
    <Car key="l1" />,
    <Sparkles key="l2" />,
    <HandCoins key="l3" />,
    <RefreshCcw key="l4" />,
    <ArrowRightLeft key="l5" />,
  ];
  const metricIcons = [<Timer key="m1" />, <BadgeIndianRupee key="m2" />, <Wallet key="m3" />, <ShieldCheck key="m4" />];

  const loanComparisons = [
    { title: 'New Car Loan', apr: '9.5% - 12%', tenure: '1 - 7 years' },
    { title: 'Used Car Loan', apr: '11% - 14%', tenure: '1 - 5 years' },
    { title: 'Balance Transfer', apr: '9% - 11.5%', tenure: 'Up to 6 years' },
  ];

  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const renderStars = (rating = 5) => {
    const normalized = Math.max(0, Math.min(5, Number(rating) || 5));
    return [...Array(5)].map((_, index) => {
      const fillAmount = Math.max(0, Math.min(1, normalized - index));
      return (
        <span key={index} className="relative h-4 w-4">
          <Star className="h-4 w-4 text-gray-300" />
          {fillAmount > 0 && (
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillAmount * 100}%` }}>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-red-600 to-red-700 text-white py-20 px-4">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-black/10 blur-3xl animate-float-slow" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-yellow-300 animate-pulse-soft" />
              CAR LOANS
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
              Easy Funding to <br /> get the car you want
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Low interest rates, fast approvals, and flexible repayment options tailored to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/apply">
                <Button className="!bg-white !text-primary hover:!bg-gray-100 shadow-lg">
                  Get Loan Now
                </Button>
              </Link>
              <Link to="/emi-calculator">
                <Button
                  variant="outline"
                  className="shadow-lg !text-white !border-white/70 hover:!bg-white/10"
                >
                  EMI Calculator
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#steps" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                Steps
              </a>
              <a href="#loan-types" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                Loan Types
              </a>
              <a href="#partners" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                Partners
              </a>
              <a href="#faq" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                FAQ
              </a>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-sm">
                <p className="font-semibold">4.8/5 Rating</p>
                <p className="text-white/80">From 2,000+ reviews</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 text-sm">
                <p className="font-semibold">Minimal Documentation</p>
                <p className="text-white/80">Faster approvals</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 text-sm">
                <p className="font-semibold">Trusted Partners</p>
                <p className="text-white/80">National lenders</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/10 blur-2xl animate-pulse-soft" />
            <img src={HERO_IMAGE} alt="cars" className="w-full drop-shadow-2xl animate-float" />
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-16 px-4 bg-white reveal" data-reveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Compare</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Popular Loan Options</h2>
            <p className="text-gray-600 mt-3">Choose the plan with rates that fit your budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loanComparisons.map((item) => (
              <Card key={item.title} className="text-center border border-gray-100 hover:-translate-y-1 transition-transform">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-3xl font-extrabold text-primary">{item.apr}</p>
                <p className="text-gray-600 mt-2">Tenure: {item.tenure}</p>
                <Link to="/apply" className="inline-block mt-4 text-primary font-semibold hover:underline">
                  Check Eligibility
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-20 px-4 reveal scroll-mt-24" data-reveal>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Get a Loan in 3 Simple Steps</h2>
          <p className="text-gray-600 mt-2">Getting a loan on your car is Quick, Simple and Hassle Free</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {LOAN_STEPS.map((step, index) => (
              <Card key={index} className="group text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-primary/10" />
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  {stepIcons[index]}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section id="loan-types" className="py-20 px-4 bg-gray-50 reveal scroll-mt-24" data-reveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Loan Options</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Types of Loans We Offer
            </h2>
            <p className="text-gray-600 mt-3">
              Choose the perfect loan type designed for your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanTypes.map((loanType, index) => (
              <Card
                key={index}
                className="group text-left border border-gray-100 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    {loanTypeIcons[index] || <Car />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{loanType}</h3>
                    <p className="text-gray-600">Get the best rates and flexible repayment options</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lending Partners */}
      <section id="partners" className="py-20 px-4 bg-gradient-to-r from-primary to-red-700 reveal scroll-mt-24" data-reveal>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Lending Partners</h2>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={2000}
            showDots
            removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
            className="pb-6"
          >
            {LENDING_PARTNERS.map((partner, index) => (
              <div key={index} className="px-3">
                <div className="bg-white/95 rounded-xl shadow-md p-5 flex flex-col items-center backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <img src={partner.image} alt={partner.name} className="h-16 object-contain" />
                  <p className="mt-3 font-semibold text-gray-700">{partner.name}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Happy Customers */}
      <section id="testimonials" className="py-20 px-4 reveal scroll-mt-24" data-reveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Happy Customers</h2>
            <p className="text-gray-600 mt-3">Real stories from car buyers we helped.</p>
          </div>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={2800}
            showDots
            partialVisible
            removeArrowOnDeviceType={["tablet", "mobile"]}
            className="pb-8"
          >
            {TESTIMONIALS.map((item, index) => (
              <div key={index} className="px-3">
                <Card className="relative text-center border border-gray-100 h-[360px] flex flex-col overflow-hidden bg-gradient-to-br from-white via-white to-red-50/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30">
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                  <div className="relative mx-auto mb-4 h-16 w-16 rounded-full bg-white shadow-md border border-gray-100 text-primary flex items-center justify-center text-lg font-semibold">
                    {getInitials(item.name)}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{Number(item.rating).toFixed(1)}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 min-h-[96px]">“{item.quote}”</p>
                  <div className="mt-4">
                    <h6 className="font-semibold text-gray-900">{item.name}</h6>
                    <p className="text-gray-500 text-sm">{item.car}</p>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 px-4 border-t border-b bg-gray-50 reveal" data-reveal>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {COMPANY_METRICS.map((metric, index) => (
            <div key={index} className="text-center bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {metricIcons[index]}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{metric.label}</h3>
              <p className="text-gray-600">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 reveal scroll-mt-24" data-reveal>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Give a missed call {primaryPhone} / {alternatePhone}
          </h2>
          <h3 className="text-2xl font-semibold mb-4">FAQ's?</h3>
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-red-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Apply now and drive your dream car home today!</p>
          <Link to="/apply">
            <Button className="!bg-white !text-primary hover:!bg-gray-100 shadow-lg">Apply Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

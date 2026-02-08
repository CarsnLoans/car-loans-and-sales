import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Accordion from '../../components/common/Accordion';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import usePageMeta from '../../hooks/usePageMeta';
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
} from 'lucide-react';
import {
  HERO_IMAGE,
  LOAN_TYPES,
  LOAN_STEPS,
  LENDING_PARTNERS,
  TESTIMONIALS,
  COMPANY_METRICS,
  FAQS,
  CONTACT_INFO,
} from '../../constants/data';

const Home = () => {
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-red-600 to-red-700 text-white py-20 px-4">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-black/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-yellow-300" />
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
                <Button variant="secondary" className="shadow-lg">EMI Calculator</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/10 blur-2xl" />
            <img src={HERO_IMAGE} alt="cars" className="w-full drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Get a Loan in 3 Simple Steps</h2>
          <p className="text-gray-600 mt-2">Getting a loan on your car is Quick, Simple and Hassle Free</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {LOAN_STEPS.map((step, index) => (
              <Card key={index} className="text-center relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-primary/10" />
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Loan Options</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Types of Car Loans We Offer
            </h2>
            <p className="text-gray-600 mt-3">
              Choose the perfect loan type designed for your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOAN_TYPES.map((loanType, index) => (
              <Card
                key={index}
                className="text-left border border-gray-100 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-red-700">
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
                <div className="bg-white/95 rounded-xl shadow-md p-5 flex flex-col items-center backdrop-blur">
                  <img src={partner.image} alt={partner.name} className="h-16 object-contain" />
                  <p className="mt-3 font-semibold text-gray-700">{partner.name}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Happy Customers */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Happy Customers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, index) => (
              <Card key={index} className="text-center border border-gray-100">
                <img src={item.image} alt={item.name} className="w-32 mx-auto mb-4" />
                <p className="text-gray-600">{item.quote}</p>
                <h6 className="mt-3 font-semibold">— {item.name}</h6>
                <p className="text-gray-500 text-sm">{item.car}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 px-4 border-t border-b bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {COMPANY_METRICS.map((metric, index) => (
            <div key={index} className="text-center bg-white rounded-xl shadow-sm p-6">
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            Give a missed call {CONTACT_INFO.phone}
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

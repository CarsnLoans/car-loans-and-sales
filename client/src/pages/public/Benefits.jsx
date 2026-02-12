import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import usePageMeta from '../../hooks/usePageMeta';
import {
  BadgeCheck,
  Clock,
  Coins,
  FileText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const Benefits = () => {
  usePageMeta({
    title: 'Benefits | Car Loans & Sales',
    description: 'Explore key benefits and features of used car loans with fast approvals and flexible terms.',
  });

  return (
    <div>
      <PageHeader
        title="Benefits For You"
        subtitle="Know about used car loan benefits"
        className="bg-gradient-to-r from-primary to-red-700"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Benefits' },
        ]}
      />

      <section className="py-20 px-4 reveal" data-reveal>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center">Overview</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">What is a Used Car Loan?</h2>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Opting for a used car loan is a smart, value-for-money purchase. We offer used car loans for a wide
            collection of cars ranging from hatchbacks & SUVs to premium sedans. We extend loans up to 95% loan on
            your car value and provide flexible EMI repayment options, and quick disbursal of loans which makes the
            best choice for financing your car.
          </p>
          <p className="mt-4 italic text-gray-600">
            <strong>Disclaimer:</strong> We Provide you Service to get Car Loans at the indicative interest rates as per
            respective banks pertain to loans availed for cars which are for personal use. For loans for cars which are
            for commercial use, interest rates may differ. Interest rates may differ from time to time at the discretion
            of respective banks. Terms and conditions apply.
          </p>

          <div className="text-center mt-10">
            <Link to="/apply">
              <Button className="rounded-full">Apply Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 reveal" data-reveal>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl bg-gradient-to-br from-primary to-red-700 text-white p-8 md:p-10 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">Key Features</p>
              <h2 className="text-3xl font-extrabold mt-2">Built for smart car buyers</h2>
              <p className="mt-4 text-white/90">
                Transparent pricing, flexible terms, and quick approvals—everything you need to finance a car with confidence.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <Coins className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Loan Amount</p>
                    <p className="text-lg font-semibold">1,00,000 – 50,00,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <Clock className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Loan Tenure</p>
                    <p className="text-lg font-semibold">12–60 months</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <BadgeCheck className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Interest Rate</p>
                    <p className="text-lg font-semibold">Starting at 15%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="text-left border border-gray-100 hover:-translate-y-1 transition-transform">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Flexible Tenure</h5>
              <p className="text-gray-600 text-sm">Easy ways to repay your loan over a period of 60 months.</p>
            </Card>
            <Card className="text-left border border-gray-100 hover:-translate-y-1 transition-transform">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Quick Processing</h5>
              <p className="text-gray-600 text-sm">
                Online application process with minimal paperwork. We will take care of the rest.
              </p>
            </Card>
            <Card className="text-left border border-gray-100 hover:-translate-y-1 transition-transform">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Coins />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Flexi EMI Options</h5>
              <p className="text-gray-600 text-sm">Repay your loan according to your convenience.</p>
            </Card>
            <Card className="text-left border border-gray-100 hover:-translate-y-1 transition-transform">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BadgeCheck />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Competitive Interest Rates</h5>
              <p className="text-gray-600 text-sm">We suggest the best interest rates among lenders.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary text-center">How it works</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">Application Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Online Application</h5>
              <p className="text-gray-600 text-sm">We just need your basic details.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Documentation and Verification</h5>
              <p className="text-gray-600 text-sm">We assist you with document submission.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BadgeCheck />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Approval</h5>
              <p className="text-gray-600 text-sm">Your loan is sanctioned.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Drive Away</h5>
              <p className="text-gray-600 text-sm">Receive amount and take your car.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why Us</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">6 Reasons to Choose Us for Taking a Used Car Loan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Minimum Paperwork</h5>
              <p className="text-gray-600 text-sm">We help you throughout documentation.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Repayment</h5>
              <p className="text-gray-600 text-sm">We remind you to repay on time.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Coins />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Competitive Interest Rates</h5>
              <p className="text-gray-600 text-sm">We help select best rates.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BadgeCheck />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">High Loan Amount</h5>
              <p className="text-gray-600 text-sm">Get upto 95% of loan amount.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Minimum Documents</h5>
              <p className="text-gray-600 text-sm">Minimal documentation for your request.</p>
            </Card>
            <Card className="border border-gray-100">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck />
              </div>
              <h5 className="text-lg font-semibold text-gray-900">Instant Online Approval</h5>
              <p className="text-gray-600 text-sm">We process your loan on your required time.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Accordion from '../../components/common/Accordion';
import { BadgeCheck, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';

const EligibilityPanel = ({ title, subtitle, items }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-gray-700">
          <BadgeCheck className="h-4 w-4 text-primary mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const tabs = [
  {
    key: 'salaried',
    label: 'Salaried individuals',
    content: (
      <EligibilityPanel
        title="Eligibility for Salaried Applicants"
        subtitle="Basic requirements for salaried individuals."
        items={[
          'Minimum 21 years of age',
          'Maximum 60 years of age at maturity (conditions apply)',
          'Minimum net annual salary of Rs 2,40,000 p.a. for certain models and Rs 3,00,000 p.a. for specific models',
          'Income eligibility based on latest salary slip/form16/ last 3 months bank statements',
          'Minimum 1 year of continuous employment',
        ]}
      />
    ),
  },
  {
    key: 'self-employed',
    label: 'Self-employed individuals',
    content: (
      <EligibilityPanel
        title="Eligibility for Self-Employed"
        subtitle="Requirements for professionals and business owners."
        items={[
          'Minimum 21 years of age',
          'Maximum 65 years of age at maturity',
          'Minimum Net Annual Business income of Rs. 2,00,000 p.a. for selected models and Rs. 3,50,000 p.a. for others.',
          'Minimum 2 years of employment in the same line of business',
        ]}
      />
    ),
  },
  {
    key: 'non-individuals',
    label: 'Self-employed non-individuals',
    content: (
      <EligibilityPanel
        title="Eligibility for Non-Individual Entities"
        subtitle="Ideal for firms, partnerships, and entities."
        items={[
          'Minimum 21 years of age',
          'Minimum Net Annual Business income of Rs. 2,50,000 p.a. for selected models and Rs. 3,50,000 p.a. for others',
          'Income eligibility based on latest 2 years Income Tax Returns and audited financials of 2 years along with computation of income',
          'Minimum 2 years of employment in the same line of business',
        ]}
      />
    ),
  },
  {
    key: 'calculator',
    label: 'Car Loan Eligibility Calculator',
    content: (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6">
        <h3 className="text-xl font-semibold text-gray-900">Check Eligibility Instantly</h3>
        <p className="text-sm text-gray-600 mt-2">
          Use the calculator to understand your estimated eligibility and monthly EMI.
        </p>
        <Link
          to="/emi-calculator"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
        >
          Open EMI Calculator
        </Link>
      </div>
    ),
  },
];

const faqs = [
  {
    question: 'What are Factors Affecting Your Used Car Loan Eligibility?',
    answer: (
      <div>
        <p className="mb-3">Your used car loan eligibility is dependent upon the following factors –</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Income - </strong>The higher your monthly income, the higher will be your eligibility for a used car loan.</li>
          <li><strong>CIBIL or Credit Score – </strong>Unpaid loans are a huge red flag and may make you ineligible to borrow a used car loan.</li>
          <li><strong>Outstanding Loan – </strong>Unpaid loans are a huge red flag and may make you ineligible to borrow a used car loan.</li>
          <li><strong>Work Stability – </strong>Having a stable source of income increases your loan eligibility whereas lenders may reject your application in case of frequent job hopping or irregular business ROI.</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Factors Affecting Used Car Loan Interest Rates',
    answer: (
      <div>
        <p className="mb-3">Some of the main factors that affect the used car loan interest rates are:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Debt-to-Income Ratio: </strong>Your debt-to-income ratio determines whether you can pay the EMIs on time.</li>
          <li><strong>Repayment Tenure: </strong>Lenders offer low-interest rates in case you opt for a longer tenure.</li>
          <li><strong>Increase the down payment: </strong>Lenders offer low pre-owned car loan interest rates if you make high down payment.</li>
          <li><strong>Income: </strong>Individuals with a steady income and a stable occupation can get a used car loan with a low-interest rate.</li>
          <li><strong>Credit score: </strong>Individuals with a good credit score are provided loans with a lower interest rate.</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How Can I be Eligible to Avail a Used Car Loan?',
    answer: (
      <p>
        Whether you’re a salaried or a self-employed individual, you can meet used car loan eligibility by maintaining a good CIBIL score of 750 or above. Salaried individuals need to be between 21 and 60 years, have a minimum monthly income of Rs. 20,000 and have work stability for at least a year. Self-employed individuals must be between 21 and 65 years of age, have an annual business income of Rs. 2 lakhs, and a stable business for a minimum of three years.
      </p>
    ),
  },
];

const Eligibility = () => {
  usePageMeta({
    title: 'Eligibility | Car Loans & Sales',
    description: 'Check eligibility and documents required for used car loans.',
  });

  return (
    <div>
      <PageHeader
        title="Eligibility"
        subtitle="Eligibility and Documents Required for Used Car Loan"
        className="bg-gradient-to-r from-primary to-red-700"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Eligibility' },
        ]}
      />

      <section className="py-16 px-4 reveal" data-reveal>
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Eligibility & Required Documents</h2>
              <p className="text-gray-600 mt-2">Check the core eligibility criteria before applying.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-primary text-sm font-semibold">Fast Approval</span>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-primary text-sm font-semibold">Minimal Docs</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold">General Eligibility</h3>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary mt-0.5" />
                  <span>Minimum 21 years of age and Maximum 65 years of age at maturity (conditions apply)</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary mt-0.5" />
                  <span>Income – at least Rs. 20,000 per month (salaried) and Rs. 2 lakhs per annum (self-employed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary mt-0.5" />
                  <span>Minimum 1 year of continuous employment</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h3 className="text-lg font-semibold">Required Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-primary"><FileText className="h-4 w-4" /></div>
                  <p className="text-gray-600">Photo ID: Voter’s ID/Passport/PAN/Driving License/Aadhaar</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-primary"><ClipboardList className="h-4 w-4" /></div>
                  <p className="text-gray-600">Income proof: salary slip/form16/last 3 months bank statements</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-primary"><ShieldCheck className="h-4 w-4" /></div>
                  <p className="text-gray-600">Address proof: utility bill/bank statement/property documents</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="mt-1 text-primary"><BadgeCheck className="h-4 w-4" /></div>
                  <p className="text-gray-600">Vehicle RC, phone bill, and signature proof</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 reveal" data-reveal>
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <Tabs />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const activeContent = tabs.find((tab) => tab.key === activeTab)?.content;

  return (
    <div>
      <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-2xl border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-white shadow'
                : 'text-gray-600 hover:bg-white'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6 text-gray-700">{activeContent}</div>
    </div>
  );
};

export default Eligibility;

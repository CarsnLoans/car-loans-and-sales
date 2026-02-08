import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Accordion from '../../components/common/Accordion';
import { BadgeCheck, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';

const tabs = [
  {
    key: 'salaried',
    label: 'Salaried individuals',
    content: (
      <>
        <h2 className="text-xl font-semibold mt-4">DOCUMENTS REQUIRED FOR USED CAR LOAN</h2>
        <h5 className="mt-3">Salaried individuals who are eligible for a Used Car Loan</h5>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
          <li>Minimum 21 years of age</li>
          <li>Maximum 60 years of age at maturity (conditions apply)</li>
          <li>Minimum net annual salary of Rs 2,40,000 p.a. for certain models and Rs 3,00,000 p.a. for specific models</li>
          <li>Income eligibility based on latest salary slip/form16/ last 3 months bank statements</li>
          <li>Minimum 1 year of continuous employment</li>
        </ul>
      </>
    ),
  },
  {
    key: 'self-employed',
    label: 'Self-employed individuals',
    content: (
      <>
        <h2 className="text-xl font-semibold mt-4">DOCUMENTS REQUIRED FOR USED CAR LOAN</h2>
        <h5 className="mt-3">Self-employed individuals who are eligible for a Used Car Loan</h5>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
          <li>Minimum 21 years of age</li>
          <li>Maximum 65 years of age at maturity</li>
          <li>Minimum Net Annual Business income of Rs. 2,00,000 p.a. for selected models and Rs. 3,50,000 p.a. for others.</li>
          <li>Minimum 2 years of employment in the same line of business</li>
        </ul>
      </>
    ),
  },
  {
    key: 'non-individuals',
    label: 'Self-employed non-individuals',
    content: (
      <>
        <h2 className="text-xl font-semibold mt-4">DOCUMENTS REQUIRED FOR USED CAR LOAN</h2>
        <h5 className="mt-3">Self-employed non-individuals who are eligible for a Used Car Loan</h5>
        <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
          <li>Minimum 21 years of age</li>
          <li>Minimum Net Annual Business income of Rs. 2,50,000 p.a. for selected models and Rs. 3,50,000 p.a. for others</li>
          <li>Income eligibility based on latest 2 years Income Tax Returns and audited financials of 2 years along with computation of income</li>
          <li>Minimum 2 years of employment in the same line of business</li>
        </ul>
      </>
    ),
  },
  {
    key: 'calculator',
    label: 'Car Loan Eligibility Calculator',
    content: (
      <>
        <h2 className="text-xl font-semibold mt-4">DOCUMENTS REQUIRED FOR USED CAR LOAN</h2>
        <h5 className="mt-3">Use the Car Loan eligibility calculator to find out whether you can avail of a pre-owned car loan.</h5>
      </>
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
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">Eligibility and Documents Required for Used Car Loan</h2>
              <p className="text-gray-600 mt-2">Know the basic eligibility and documents before you apply.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 px-4 py-2 text-primary text-sm font-semibold">Fast Approval</div>
              <div className="rounded-xl bg-primary/10 px-4 py-2 text-primary text-sm font-semibold">Minimal Docs</div>
            </div>
          </div>
          <p className="font-semibold underline mt-4">General Eligibility requirements</p>
          <ul className="list-disc pl-5 text-gray-600 mt-3 space-y-2">
            <li>Minimum 21 years of age and Maximum 65 years of age at maturity (conditions apply)</li>
            <li>Income – The income of the applicant must be at least Rs. 20,000 per month (for salaried individuals) and Rs. 2 lakhs per annum (for self-employed individuals).</li>
            <li>Minimum 1 year of continuous employment</li>
          </ul>

          <p className="font-semibold underline mt-6">General used car loan documents</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-primary"><FileText /></div>
              <p className="text-gray-600">Photo Identity Proof – Voter’s ID/Passport/PAN/Driving License/Aadhaar</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-primary"><ClipboardList /></div>
              <p className="text-gray-600">Income proof – latest salary slip/form16/last 3 months bank statements</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-primary"><ShieldCheck /></div>
              <p className="text-gray-600">Address proof – utility bill/bank statement/property documents</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-primary"><BadgeCheck /></div>
              <p className="text-gray-600">Vehicle RC, phone bill, and signature proof</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
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

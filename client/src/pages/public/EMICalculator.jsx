import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Calculator, BadgeIndianRupee } from 'lucide-react';
import usePageMeta from '../../hooks/usePageMeta';

const EMICalculator = () => {
  usePageMeta({
    title: 'EMI Calculator | Car Loans & Sales',
    description: 'Calculate your monthly EMI for car loans with our easy calculator.',
  });

  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [emi, setEmi] = useState('');

  const handleCalculate = () => {
    const monthlyInterestRate = interestRate / 1200;
    const months = tenure * 12;
    if (!principal || !interestRate || !tenure) {
      setEmi('');
      return;
    }
    const emiValue =
      (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
      (Math.pow(1 + monthlyInterestRate, months) - 1);
    setEmi(emiValue.toFixed(2));
  };

  const months = tenure * 12;
  const totalPayable = emi ? (Number(emi) * months).toFixed(2) : '';
  const totalInterest = emi ? (Number(totalPayable) - Number(principal)).toFixed(2) : '';

  return (
    <div>
      <PageHeader
        title="EMI Calculator"
        subtitle="Calculate your monthly EMI"
        className="bg-gradient-to-r from-primary to-red-700"
      />

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border border-gray-100 shadow-xl lg:col-span-2">
            <div className="flex items-center justify-center gap-2 mb-6 text-primary">
              <Calculator />
              <h2 className="text-2xl font-bold">EMI Calculator</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount</label>
                <input
                  type="number"
                  className="input-field"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  className="input-field"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tenure (Years)</label>
                <input
                  type="number"
                  className="input-field"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
              </div>
              <Button onClick={handleCalculate} className="w-full">
                Calculate EMI
              </Button>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">EMI</label>
                <div className="flex items-center gap-2">
                  <span className="text-primary"><BadgeIndianRupee /></span>
                  <input type="text" className="input-field" value={emi} readOnly />
                </div>
              </div>
            </div>
          </Card>
          <div className="space-y-6">
            <div className="rounded-2xl bg-primary text-white p-6 shadow-xl">
              <p className="text-sm text-white/80">Estimated Monthly EMI</p>
              <p className="text-3xl font-bold mt-2">₹ {emi || '0.00'}</p>
              <p className="text-xs text-white/80 mt-2">Based on your inputs</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
              <p className="text-sm text-gray-600">Total Payable</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">₹ {totalPayable || '0.00'}</p>
              <p className="text-sm text-gray-600 mt-4">Total Interest</p>
              <p className="text-2xl font-bold text-primary mt-2">₹ {totalInterest || '0.00'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EMICalculator;

import { useMemo, useState } from 'react';
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

  const schedule = useMemo(() => {
    if (!emi || !principal || !interestRate || !tenure) return [];
    const rows = [];
    const monthlyRate = interestRate / 1200;
    const monthlyEmi = Number(emi);
    let balance = Number(principal);

    for (let i = 1; i <= months; i += 1) {
      const interest = balance * monthlyRate;
      const principalPaid = Math.min(monthlyEmi - interest, balance);
      const closing = Math.max(balance - principalPaid, 0);

      rows.push({
        month: i,
        opening: balance,
        emi: monthlyEmi,
        principal: principalPaid,
        interest,
        closing,
      });

      balance = closing;
      if (balance <= 0) break;
    }

    return rows;
  }, [emi, principal, interestRate, tenure, months]);

  const formatCurrency = (value) => `₹ ${Number(value).toFixed(2)}`;

  const handleDownloadSchedule = () => {
    if (schedule.length === 0) return;

    const headers = ['Month', 'Opening Balance', 'EMI', 'Principal', 'Interest', 'Closing Balance'];
    const rows = schedule.map((row) => [
      row.month,
      row.opening.toFixed(2),
      row.emi.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.closing.toFixed(2),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `emi-schedule-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <PageHeader
        title="EMI Calculator"
        subtitle="Calculate your monthly EMI"
        className="bg-gradient-to-r from-primary to-red-700"
      />

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border border-gray-100 shadow-xl lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calculator className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold">EMI Calculator</h2>
                  <p className="text-sm text-gray-600">Get a clear breakdown of your monthly payment.</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                Quick estimate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-primary"><BadgeIndianRupee className="h-4 w-4" /></span>
                  <input
                    type="number"
                    className="input-field"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    placeholder="Enter loan amount"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  className="input-field"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  placeholder="e.g. 9.5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tenure (Years)</label>
                <input
                  type="number"
                  className="input-field"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  placeholder="e.g. 5"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button onClick={handleCalculate} className="sm:w-auto w-full">
                Calculate EMI
              </Button>
              <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500">Monthly EMI</p>
                <div className="mt-1 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <BadgeIndianRupee className="h-4 w-4 text-primary" /> {emi || '0.00'}
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-red-700 text-white p-6 shadow-xl">
              <p className="text-sm text-white/80">Estimated Monthly EMI</p>
              <p className="text-3xl font-bold mt-2">₹ {emi || '0.00'}</p>
              <p className="text-xs text-white/80 mt-2">Based on your inputs</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Total Payable</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">₹ {totalPayable || '0.00'}</p>
                </div>
                <div className="rounded-xl bg-primary/5 p-4">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-2xl font-bold text-primary mt-2">₹ {totalInterest || '0.00'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          <Card className="border border-gray-100 shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">EMI Schedule</h3>
                <p className="text-sm text-gray-600">Month-wise breakup of interest and principal.</p>
              </div>
              <Button
                variant="outline"
                onClick={handleDownloadSchedule}
                disabled={schedule.length === 0}
              >
                Download CSV
              </Button>
            </div>

            {schedule.length === 0 ? (
              <p className="text-gray-600">Enter values and calculate EMI to see the schedule.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">Month</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">Opening Balance</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">EMI</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">Principal</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">Interest</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50/70">
                        <td className="px-4 py-3 text-gray-700">{row.month}</td>
                        <td className="px-4 py-3 text-gray-700">{formatCurrency(row.opening)}</td>
                        <td className="px-4 py-3 text-gray-700">{formatCurrency(row.emi)}</td>
                        <td className="px-4 py-3 text-gray-700">{formatCurrency(row.principal)}</td>
                        <td className="px-4 py-3 text-gray-700">{formatCurrency(row.interest)}</td>
                        <td className="px-4 py-3 text-gray-700">{formatCurrency(row.closing)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default EMICalculator;

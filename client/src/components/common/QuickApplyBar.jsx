import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import Button from './Button';

const QuickApplyBar = () => {
  const { settings = {} } = useSettings();
  const loanTypes = settings.loanTypes || [
    'New Car Loan',
    'Used Car Loan',
    'Auto Loan Top Up',
    'Refinance',
    'Balance Transfer',
    'Personal Loan',
    'Home Loan',
  ];
  const [form, setForm] = useState({ firstName: '', phone: '', loanType: '' });
  const navigate = useNavigate();

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (form.firstName) params.set('firstName', form.firstName.trim());
    if (form.phone) params.set('phone', form.phone.trim());
    if (form.loanType) params.set('loanType', form.loanType);
    const query = params.toString();
    navigate(query ? `/apply?${query}` : '/apply');
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <section className="bg-gradient-to-r from-primary to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Quick Apply</h3>
            <p className="text-white/90 text-sm">Leave basics and finish the application in seconds.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:max-w-3xl">
            <input
              type="text"
              className="input-field !bg-white/95 !text-gray-800"
              placeholder="Your name"
              value={form.firstName}
              onChange={handleChange('firstName')}
            />
            <input
              type="tel"
              className="input-field !bg-white/95 !text-gray-800"
              placeholder="Mobile number"
              value={form.phone}
              onChange={handleChange('phone')}
            />
            <select
              className="input-field !bg-white/95 !text-gray-800"
              value={form.loanType}
              onChange={handleChange('loanType')}
            >
              <option value="">Select loan type</option>
              {loanTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="sm:col-span-3 flex justify-end">
              <Button type="submit" className="!bg-white !text-primary hover:!bg-gray-100">
                Continue Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuickApplyBar;

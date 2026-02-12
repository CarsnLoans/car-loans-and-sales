import { useEffect, useState } from 'react';
import { SettingsContext } from './SettingsContextFile';
import { getSettings } from '../services/settingsService';

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    primaryPhone: '+91 8660516762',
    alternatePhone: '+91 8197596707',
    email: 'info@carloansandsales.com',
    loanTypes: [
      'New Car Loan',
      'Used Car Loan',
      'Auto Loan Top Up',
      'Refinance',
      'Balance Transfer',
      'Personal Loan',
      'Home Loan',
    ],
    companyName: 'Car Loans & Sales',
    facebookUrl: 'https://facebook.com/carloansandsales',
    instagramUrl: 'https://instagram.com/carloansandsales',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        // Use defaults if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

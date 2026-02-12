const Settings = require('../models/Settings');

const createDefaultSettings = async () => {
  try {
    const existing = await Settings.findOne();
    if (existing) {
      return;
    }

    await Settings.create({
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

    console.log('✅ Default settings created');
  } catch (error) {
    console.error('Error creating default settings:', error);
  }
};

module.exports = createDefaultSettings;

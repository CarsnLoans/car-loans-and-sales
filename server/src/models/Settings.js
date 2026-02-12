const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    primaryPhone: {
      type: String,
      default: '+91 8660516762',
    },
    alternatePhone: {
      type: String,
      default: '+91 8197596707',
    },
    email: {
      type: String,
      default: 'info@carloansandsales.com',
    },
    loanTypes: {
      type: [String],
      default: [
        'New Car Loan',
        'Used Car Loan',
        'Auto Loan Top Up',
        'Refinance',
        'Balance Transfer',
        'Personal Loan',
        'Home Loan',
      ],
    },
    companyName: {
      type: String,
      default: 'Car Loans & Sales',
    },
    facebookUrl: {
      type: String,
      default: 'https://facebook.com/carloansandsales',
    },
    instagramUrl: {
      type: String,
      default: 'https://instagram.com/carloansandsales',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);

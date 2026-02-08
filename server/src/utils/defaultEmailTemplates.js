const defaultEmailTemplates = [
  {
    name: 'leadConfirmation',
    subject: 'Application Received - Car Loans & Sales',
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Thank You for Your Application!</h2>
        <p>Dear {{name}},</p>
        <p>We have received your application for <strong>{{loanType}}</strong>.</p>
        <p>Our team will review your application and get back to you within 24-48 hours.</p>
        <p>If you have any questions, feel free to contact us at:</p>
        <ul>
          <li>Phone: +91 9686-870-536</li>
          <li>Email: info@carloansandsales.com</li>
        </ul>
        <p>Best regards,<br/>Car Loans & Sales Team</p>
      </div>
    `,
    textBody: `Thank You for Your Application!\n\nDear {{name}},\n\nWe have received your application for {{loanType}}.\n\nOur team will review your application and get back to you within 24-48 hours.`,
  },
  {
    name: 'adminNotification',
    subject: 'New Lead Submitted - Car Loans & Sales',
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">New Lead Submitted</h2>
        <p><strong>Name:</strong> {{name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Phone:</strong> {{phone}}</p>
        <p><strong>Loan Type:</strong> {{loanType}}</p>
        <p><strong>City:</strong> {{city}}</p>
        <p>Login to your dashboard to view full details and take action.</p>
      </div>
    `,
    textBody: `New Lead Submitted\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nLoan Type: {{loanType}}\nCity: {{city}}`,
  },
  {
    name: 'statusUpdate',
    subject: 'Application Status Update - {{status}}',
    htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Application Status Update</h2>
        <p>Dear {{name}},</p>
        <p>Your application status has been updated to: <strong>{{status}}</strong></p>
        {{#if message}}<p>{{message}}</p>{{/if}}
        <p>Best regards,<br/>Car Loans & Sales Team</p>
      </div>
    `,
    textBody: `Application Status Update\n\nDear {{name}},\n\nYour application status has been updated to: {{status}}\n\n{{message}}`,
  },
];

module.exports = { defaultEmailTemplates };

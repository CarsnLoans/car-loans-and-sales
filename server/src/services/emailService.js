const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');
const { defaultEmailTemplates } = require('../utils/defaultEmailTemplates');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const renderTemplate = (template, data = {}) => {
  if (!template) return '';

  let output = template;

  output = output.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, content) => {
    return data[key] ? content : '';
  });

  output = output.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = data[key];
    return value === undefined || value === null ? '' : String(value);
  });

  return output;
};

const getTemplate = async (templateName) => {
  const storedTemplate = await EmailTemplate.findOne({ name: templateName });
  if (storedTemplate) return storedTemplate;

  const fallback = defaultEmailTemplates.find((t) => t.name === templateName);
  return fallback || null;
};

const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const emailTemplate = await getTemplate(template);

    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    const mergedData = {
      companyName: process.env.COMPANY_NAME || 'Car Loans & Sales',
      logoUrl:
        process.env.EMAIL_LOGO_URL ||
        (process.env.SERVER_URL ? `${process.env.SERVER_URL.replace(/\/$/, '')}/assets/logo.svg` : ''),
      supportEmail: process.env.SUPPORT_EMAIL || 'info@carloansandsales.com',
      supportPhone: process.env.SUPPORT_PHONE || '+91 9686-870-536',
      ...data,
    };

    const templateSubject = renderTemplate(emailTemplate.subject, mergedData);
    const htmlBody = renderTemplate(emailTemplate.htmlBody, mergedData);
    const textBody = renderTemplate(emailTemplate.textBody, mergedData);

    // Send email via Nodemailer
    const fromEmail = process.env.FROM_EMAIL;
    const finalSubject = subject || templateSubject;


    const result = await transporter.sendMail({
      from: fromEmail,
      to,
      subject: finalSubject,
      html: htmlBody,
      text: textBody,
    });

    console.log('✅ Email sent successfully:', {
      to,
      messageId: result.messageId,
    });
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', {
      to,
      message: error.message,
    });
    // Don't throw error - just log it so application continues
    return null;
  }
};

module.exports = {
  sendEmail,
  renderTemplate,
};

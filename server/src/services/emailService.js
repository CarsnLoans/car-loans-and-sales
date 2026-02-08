const postmark = require('postmark');
const EmailTemplate = require('../models/EmailTemplate');
const { defaultEmailTemplates } = require('../utils/defaultEmailTemplates');

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

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

    const templateSubject = renderTemplate(emailTemplate.subject, data);
    const htmlBody = renderTemplate(emailTemplate.htmlBody, data);
    const textBody = renderTemplate(emailTemplate.textBody, data);

    // Send email via Postmark
    const result = await client.sendEmail({
      From: process.env.FROM_EMAIL,
      To: to,
      Subject: subject || templateSubject,
      HtmlBody: htmlBody,
      TextBody: textBody,
      MessageStream: 'outbound',
    });

    console.log('✅ Email sent successfully:', result.MessageID);
    return result;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    // Don't throw error - just log it so application continues
    return null;
  }
};

module.exports = {
  sendEmail,
  renderTemplate,
};

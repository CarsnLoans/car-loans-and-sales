const EmailTemplate = require('../models/EmailTemplate');
const { defaultEmailTemplates } = require('../utils/defaultEmailTemplates');

const ensureDefaultTemplates = async () => {
  const existing = await EmailTemplate.find({}, 'name').lean();
  const existingNames = new Set(existing.map((t) => t.name));

  const missing = defaultEmailTemplates.filter((t) => !existingNames.has(t.name));
  if (missing.length > 0) {
    await EmailTemplate.insertMany(missing);
  }
};

// @desc    Get email templates
// @route   GET /api/admin/email-templates
// @access  Private (Admin)
const getEmailTemplates = async (req, res) => {
  try {
    await ensureDefaultTemplates();
    const templates = await EmailTemplate.find({}).sort('name');
    res.status(200).json({
      success: true,
      templates,
    });
  } catch (error) {
    console.error('Get email templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email templates',
    });
  }
};

// @desc    Update email template
// @route   PATCH /api/admin/email-templates/:name
// @access  Private (Admin)
const updateEmailTemplate = async (req, res) => {
  try {
    const { name } = req.params;
    const { subject, htmlBody, textBody } = req.body;

    const template = await EmailTemplate.findOne({ name });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    template.subject = subject || template.subject;
    template.htmlBody = htmlBody || template.htmlBody;
    template.textBody = textBody || template.textBody;
    template.updatedBy = req.admin.id;

    await template.save();

    res.status(200).json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Update email template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email template',
    });
  }
};

module.exports = { getEmailTemplates, updateEmailTemplate };

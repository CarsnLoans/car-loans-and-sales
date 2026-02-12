const Settings = require('../models/Settings');

// @desc    Get settings
// @route   GET /api/admin/settings
// @access  Public (all can view)
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if not exists
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settings',
    });
  }
};

// @desc    Update settings
// @route   PATCH /api/admin/settings
// @access  Private (super-admin only)
const updateSettings = async (req, res) => {
  try {
    const { primaryPhone, alternatePhone, email, loanTypes, companyName, facebookUrl, instagramUrl } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    // Update only provided fields
    if (primaryPhone) settings.primaryPhone = primaryPhone;
    if (alternatePhone) settings.alternatePhone = alternatePhone;
    if (email) settings.email = email;
    if (loanTypes && Array.isArray(loanTypes)) settings.loanTypes = loanTypes;
    if (companyName) settings.companyName = companyName;
    if (facebookUrl) settings.facebookUrl = facebookUrl;
    if (instagramUrl) settings.instagramUrl = instagramUrl;

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
    });
  }
};

module.exports = { getSettings, updateSettings };

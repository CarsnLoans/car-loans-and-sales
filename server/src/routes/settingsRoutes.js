const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Public route to get settings
router.get('/', getSettings);

// Super-admin only - update settings
router.patch('/', protect, authorizeRoles('super_admin'), updateSettings);

module.exports = router;

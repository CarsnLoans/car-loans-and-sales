const express = require('express');
const { protect, authorizeRoles } = require('../middleware/auth');
const { getAdmins } = require('../controllers/adminController');
const { getAuditLogs } = require('../controllers/auditLogController');
const { getEmailTemplates, updateEmailTemplate } = require('../controllers/emailTemplateController');

const router = express.Router();

router.get('/users', protect, authorizeRoles('super_admin'), getAdmins);
router.get('/audit-logs', protect, authorizeRoles('admin', 'super_admin'), getAuditLogs);
router.get('/email-templates', protect, authorizeRoles('admin', 'super_admin'), getEmailTemplates);
router.patch('/email-templates/:name', protect, authorizeRoles('admin', 'super_admin'), updateEmailTemplate);

module.exports = router;

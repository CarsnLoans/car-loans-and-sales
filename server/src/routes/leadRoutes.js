const express = require('express');
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  bulkUpdateLeads,
  deleteLead,
  bulkDeleteLeads,
  getStats,
} = require('../controllers/leadController');
const { protect, authorizeRoles } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Public route - Create lead
router.post(
  '/',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('pincode').trim().notEmpty().withMessage('Pincode is required'),
    body('loanType').trim().notEmpty().withMessage('Loan type is required'),
  ],
  validate,
  createLead
);

// Protected admin routes
router.get('/admin/leads', protect, getLeads);
router.patch('/admin/leads/bulk', protect, authorizeRoles('admin', 'manager', 'super_admin'), bulkUpdateLeads);
router.delete('/admin/leads/bulk', protect, authorizeRoles('super_admin'), bulkDeleteLeads);
router.get('/admin/leads/:id', protect, getLead);
router.patch('/admin/leads/:id', protect, updateLead);
router.delete('/admin/leads/:id', protect, authorizeRoles('admin', 'super_admin'), deleteLead);
router.get('/admin/stats', protect, getStats);

module.exports = router;

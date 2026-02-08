const AuditLog = require('../models/AuditLog');

// @desc    Get audit logs
// @route   GET /api/admin/audit-logs
// @access  Private (Admin)
const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, action, entityType, performedBy } = req.query;

    const query = {};
    if (action) query.action = action;
    if (entityType) query.entityType = entityType;
    if (performedBy) query.performedBy = performedBy;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await AuditLog.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit))
      .populate('performedBy', 'name email role');

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      logs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch audit logs',
    });
  }
};

module.exports = { getAuditLogs };

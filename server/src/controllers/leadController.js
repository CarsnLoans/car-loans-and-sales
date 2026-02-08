const Lead = require('../models/Lead');
const AuditLog = require('../models/AuditLog');
const { sendEmail } = require('../services/emailService');

const logAudit = async ({ req, action, entityId, metadata = {} }) => {
  try {
    if (!req?.admin) return;
    await AuditLog.create({
      action,
      entityType: 'Lead',
      entityId,
      performedBy: req.admin.id,
      metadata,
    });
  } catch (error) {
    console.error('Audit log error:', error);
  }
};

// @desc    Create new lead (from public form)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, city, state, pincode, loanType, message } = req.body;

    // Create lead
    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      pincode,
      loanType,
      message,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Application Received - Car Loans & Sales',
      template: 'leadConfirmation',
      data: {
        name: `${firstName} ${lastName}`,
        loanType,
      },
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Lead Submitted',
      template: 'adminNotification',
      data: {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        loanType,
        city,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Your application has been submitted successfully. We will contact you soon!',
      lead: {
        id: lead._id,
        name: `${lead.firstName} ${lead.lastName}`,
      },
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
    });
  }
};

// @desc    Get all leads with filters
// @route   GET /api/admin/leads
// @access  Private
const getLeads = async (req, res) => {
  try {
    const {
      status,
      loanType,
      search,
      followUp,
      page = 1,
      limit = 10,
      sortBy = '-createdAt',
    } = req.query;

    // Build query
    const query = {};

    if (status) {
      query.status = status;
    }

    if (loanType) {
      query.loanType = loanType;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (followUp) {
      const now = new Date();
      const startOfToday = new Date(now);
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date(now);
      endOfToday.setHours(23, 59, 59, 999);

      if (followUp === 'overdue') {
        query.nextFollowUpAt = { $lt: startOfToday };
      } else if (followUp === 'today') {
        query.nextFollowUpAt = { $gte: startOfToday, $lte: endOfToday };
      } else if (followUp === 'upcoming') {
        query.nextFollowUpAt = { $gt: endOfToday };
      } else if (followUp === 'none') {
        query.nextFollowUpAt = null;
      }
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const leads = await Lead.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'name email');

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      leads,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
    });
  }
};

// @desc    Get single lead
// @route   GET /api/admin/leads/:id
// @access  Private
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name');

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lead',
    });
  }
};

// @desc    Update lead
// @route   PATCH /api/admin/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  try {
    const { status, assignedTo, note, nextFollowUpAt } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    const previousStatus = lead.status;

    // Update status
    if (status) {
      lead.status = status;
      if (
        ['Contacted', 'Follow-up', 'Interested', 'Not Interested'].includes(status)
      ) {
        lead.lastContactedAt = new Date();
      }
    }

    // Update next follow-up date
    if (typeof nextFollowUpAt !== 'undefined') {
      lead.nextFollowUpAt = nextFollowUpAt ? new Date(nextFollowUpAt) : null;
    }

    // Update assigned to
    if (assignedTo) {
      lead.assignedTo = assignedTo;
    }

    // Add note
    if (note) {
      lead.notes.push({
        text: note,
        addedBy: req.admin.id,
      });
    }

    await lead.save();

    // Send status update email if status changed
    if (status && previousStatus !== status) {
      await sendEmail({
        to: lead.email,
        template: 'statusUpdate',
        data: {
          name: `${lead.firstName} ${lead.lastName}`,
          status: lead.status,
          message: note || '',
        },
      });
    }

    await logAudit({
      req,
      action: 'lead_updated',
      entityId: lead._id,
      metadata: {
        previousStatus,
        newStatus: lead.status,
        assignedTo: assignedTo || lead.assignedTo || null,
        nextFollowUpAt: lead.nextFollowUpAt || null,
        noteAdded: Boolean(note),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lead',
    });
  }
};

// @desc    Bulk update leads
// @route   PATCH /api/admin/leads/bulk
// @access  Private
const bulkUpdateLeads = async (req, res) => {
  try {
    const { ids = [], status, assignedTo, nextFollowUpAt, note } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No lead IDs provided',
      });
    }

    const update = {};
    if (status) {
      update.status = status;
      if (['Contacted', 'Follow-up', 'Interested', 'Not Interested'].includes(status)) {
        update.lastContactedAt = new Date();
      }
    }
    if (assignedTo) {
      update.assignedTo = assignedTo;
    }
    if (typeof nextFollowUpAt !== 'undefined') {
      update.nextFollowUpAt = nextFollowUpAt ? new Date(nextFollowUpAt) : null;
    }

    if (Object.keys(update).length > 0) {
      await Lead.updateMany({ _id: { $in: ids } }, { $set: update });
    }

    if (note) {
      await Lead.updateMany(
        { _id: { $in: ids } },
        { $push: { notes: { text: note, addedBy: req.admin.id } } }
      );
    }

    await logAudit({
      req,
      action: 'lead_bulk_updated',
      entityId: null,
      metadata: {
        ids,
        status: status || null,
        assignedTo: assignedTo || null,
        nextFollowUpAt: nextFollowUpAt || null,
        noteAdded: Boolean(note),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Leads updated successfully',
    });
  } catch (error) {
    console.error('Bulk update leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update leads',
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/admin/leads/:id
// @access  Private
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    await lead.deleteOne();

    await logAudit({
      req,
      action: 'lead_deleted',
      entityId: lead._id,
      metadata: {
        name: `${lead.firstName} ${lead.lastName}`,
        email: lead.email,
        status: lead.status,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete lead',
    });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    // Total leads
    const totalLeads = await Lead.countDocuments();

    // Leads by status
    const leadsByStatus = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Leads by loan type
    const leadsByLoanType = await Lead.aggregate([
      {
        $group: {
          _id: '$loanType',
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent leads (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentLeads = await Lead.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    // Today's leads
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayLeads = await Lead.countDocuments({
      createdAt: { $gte: today },
    });

    // Monthly trend (last 6 months)
    const monthlyTrend = await Lead.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        todayLeads,
        recentLeads,
        leadsByStatus,
        leadsByLoanType,
        monthlyTrend,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLead,
  updateLead,
  bulkUpdateLeads,
  deleteLead,
  getStats,
};

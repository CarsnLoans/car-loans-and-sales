const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    htmlBody: {
      type: String,
      required: true,
    },
    textBody: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);

const defaultEmailTemplates = [
  {
    name: 'leadConfirmation',
    subject: 'Application Received - Car Loans & Sales',
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Received</title>
      </head>
      <body style="margin:0;padding:0;background:#ffffff;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#1f2937;line-height:1.6;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;padding:16px 12px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
            <tr>
              <td style="padding:28px 24px;background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);border-radius:18px 18px 0 0;box-shadow:0 18px 36px -12px rgba(220,38,38,0.25);position:relative;overflow:hidden;">
                <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 50%);"></div>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;position:relative;">
                  <tr>
                    <td style="padding:0;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                        <tr>
                          <td style="width:48px;vertical-align:middle;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" valign="middle" style="height:48px;width:48px;background:#fee2e2;border-radius:14px;box-shadow:0 4px 10px rgba(220,38,38,0.25);">
                                  <span style="color:#dc2626;font-size:20px;font-weight:700;line-height:48px;display:inline-block;">🚗</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style="padding-left:16px;vertical-align:middle;">
                            <div style="color:#fef7f6;font-size:13px;letter-spacing:0.025em;font-weight:500;margin-bottom:4px;opacity:0.95;">{{companyName}}</div>
                            <div style="color:#ffffff;font-size:26px;font-weight:800;line-height:1.2;margin:0;">Application Received</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:12px;">
                      <div style="color:#fef7f6;font-size:14px;line-height:1.5;opacity:0.95;">We've received your application and will review it soon.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border-radius:0 0 18px 18px;box-shadow:0 16px 20px -8px rgba(0,0,0,0.08),0 8px 8px -6px rgba(0,0,0,0.04);">
                <div style="padding:28px 24px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                    <tr>
                      <td>
                        <p style="margin:0 0 16px 0;font-size:18px;line-height:1.5;color:#111827;font-weight:700;">Hello {{name}},</p>
                        <p style="margin:0 0 20px 0;font-size:15px;line-height:1.7;color:#374151;">Thank you for applying for <strong style="color:#dc2626;">{{loanType}}</strong>. Our team is reviewing your request.</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px;background:#fef7f6;border:1px solid #fee2e2;border-radius:16px;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                          <tr>
                            <td style="width:48px;padding-right:14px;vertical-align:middle;">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td align="center" valign="middle" style="height:44px;width:44px;border-radius:12px;background:#dc2626;color:#ffffff;font-size:18px;font-weight:700;">⏱️</td>
                                </tr>
                              </table>
                            </td>
                            <td>
                              <div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">Review Timeline</div>
                              <div style="font-size:14px;color:#6b7280;">Expect a response within <strong>24-48 hours</strong>.</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:20px;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;background:#fef3c7;border:1px solid #fed7aa;border-radius:16px;padding:18px;">
                          <tr>
                            <td>
                              <div style="font-size:16px;font-weight:700;color:#92400e;margin-bottom:8px;">Need Help?</div>
                              <div style="color:#92400e;font-size:14px;line-height:1.6;">
                                <div style="padding-bottom:4px;">📞 {{supportPhone}}</div>
                                <div>✉️ {{supportEmail}}</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:20px;">
                        <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">Best regards,<br><strong style="color:#dc2626;font-size:16px;">{{companyName}} Team</strong></p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 20px 24px;">
                <div style="text-align:center;font-size:12px;color:#9ca3af;background:#f9fafb;border-radius:12px;padding:12px;border:1px solid #e5e7eb;">
                  This is an automated confirmation email. Please don't reply directly to this message.
                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,
    textBody: `Thank You for Your Application!

Dear {{name}},

We've received your application for {{loanType}}.

Our team will review it and get back to you within 24-48 hours.

If you have questions:
Phone: {{supportPhone}}
Email: {{supportEmail}}

Best regards,
{{companyName}} Team`,
  },
  {
    name: 'adminNotification',
    subject: '🆕 New Lead Submitted - Car Loans & Sales',
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Alert</title>
      </head>
      <body style="margin:0;padding:0;background:#fef3c7;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#1f2937;line-height:1.6;">
        <div style="max-width:640px;margin:0 auto;background:#fef3c7;padding:16px 12px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
            <tr>
              <td style="padding:28px 24px;background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);border-radius:18px 18px 0 0;box-shadow:0 18px 36px -12px rgba(220,38,38,0.35);position:relative;overflow:hidden;">
                <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 70% 20%, rgba(255,255,255,0.2) 0%, transparent 50%);"></div>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;position:relative;">
                  <tr>
                    <td style="padding:0;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                        <tr>
                          <td style="width:48px;vertical-align:middle;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" valign="middle" style="height:48px;width:48px;background:#fee2e2;border-radius:14px;box-shadow:0 4px 10px rgba(220,38,38,0.25);">
                                  <span style="color:#dc2626;font-size:20px;font-weight:700;line-height:48px;display:inline-block;">🆕</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td style="padding-left:16px;vertical-align:middle;">
                            <div style="color:#fef7f6;font-size:13px;letter-spacing:0.025em;font-weight:500;margin-bottom:4px;opacity:0.95;">{{companyName}}</div>
                            <div style="color:#ffffff;font-size:26px;font-weight:800;line-height:1.2;margin:0;">New Lead Alert</div>
                          </td>
                          <td style="width:80px;text-align:right;vertical-align:middle;">
                            <div style="background:rgba(255,255,255,0.2);border-radius:18px;padding:8px 14px;font-size:11px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">URGENT</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border-radius:0 0 18px 18px;box-shadow:0 16px 20px -8px rgba(0,0,0,0.08),0 8px 8px -6px rgba(0,0,0,0.04);">
                <div style="padding:28px 24px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;">
                    <tr>
                      <td style="padding-bottom:32px;">
                        <h2 style="margin:0 0 18px 0;font-size:20px;font-weight:800;color:#111827;">New Lead Details</h2>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;background:#fef7f6;border:1px solid #fee2e2;border-radius:18px;overflow:hidden;">
                          <tr>
                            <td style="width:140px;padding:16px 14px;font-weight:700;color:#374151;border-bottom:1px solid #fee2e2;font-size:14px;background:#fee2e2;">Name</td>
                            <td style="padding:16px 14px;border-bottom:1px solid #fee2e2;font-size:14px;color:#111827;font-weight:600;">{{name}}</td>
                          </tr>
                          <tr>
                            <td style="width:140px;padding:16px 14px;font-weight:700;color:#374151;border-bottom:1px solid #fee2e2;font-size:14px;background:#fee2e2;">Email</td>
                            <td style="padding:16px 14px;border-bottom:1px solid #fee2e2;font-size:14px;color:#111827;font-weight:500;">{{email}}</td>
                          </tr>
                          <tr>
                            <td style="width:140px;padding:16px 14px;font-weight:700;color:#374151;border-bottom:1px solid #fee2e2;font-size:14px;background:#fee2e2;">Phone</td>
                            <td style="padding:16px 14px;border-bottom:1px solid #fee2e2;font-size:14px;color:#111827;font-weight:500;">{{phone}}</td>
                          </tr>
                          <tr>
                            <td style="width:140px;padding:16px 14px;font-weight:700;color:#374151;border-bottom:1px solid #fee2e2;font-size:14px;background:#fee2e2;">Loan Type</td>
                            <td style="padding:16px 14px;border-bottom:1px solid #fee2e2;font-size:14px;color:#dc2626;font-weight:600;">{{loanType}}</td>
                          </tr>
                          <tr>
                            <td style="width:140px;padding:16px 14px;font-weight:700;color:#374151;font-size:14px;background:#fee2e2;">City</td>
                            <td style="padding:16px 14px;font-size:14px;color:#111827;font-weight:500;">{{city}}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 0 0 0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;background:#fef3c7;border:1px solid #fed7aa;border-radius:16px;padding:18px;">
                          <tr>
                            <td>
                              <div style="font-size:16px;font-weight:700;color:#92400e;margin-bottom:8px;">
                                Take Action Now
                              </div>
                              <div style="color:#92400e;font-size:14px;line-height:1.6;">
                                Login to your admin dashboard to view complete details and follow up with this lead.
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 20px 24px;">
                <div style="text-align:center;font-size:12px;color:#d97706;background:#fef3c7;border-radius:12px;padding:12px;border:1px solid #fed7aa;">
                  Admin notification from {{companyName}} • Please take action promptly
                </div>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,
    textBody: `🆕 New Lead Submitted

Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Loan Type: {{loanType}}
City: {{city}}

Login to admin dashboard to view full details and take action.`,
  },
];

module.exports = { defaultEmailTemplates };

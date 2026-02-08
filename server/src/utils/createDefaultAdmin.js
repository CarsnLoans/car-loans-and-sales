const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    // Check if any admin exists
    const adminExists = await Admin.findOne();

    if (!adminExists) {
      // Create default admin
      await Admin.create({
        name: 'Admin',
        email: process.env.ADMIN_DEFAULT_EMAIL,
        password: process.env.ADMIN_DEFAULT_PASSWORD,
        role: 'super_admin',
      });

      console.log('✅ Default admin created successfully');
      console.log('Email:', process.env.ADMIN_DEFAULT_EMAIL);
      console.log('Password:', process.env.ADMIN_DEFAULT_PASSWORD);
      console.log('⚠️  Please change the default password after first login!');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error.message);
  }
};

module.exports = createDefaultAdmin;

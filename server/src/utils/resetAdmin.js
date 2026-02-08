require('dotenv').config();
const connectDB = require('../config/database');
const Admin = require('../models/Admin');

const resetAdmin = async () => {
  try {
    await connectDB();

    await Admin.deleteMany({});

    const admin = await Admin.create({
      name: 'Admin',
      email: process.env.ADMIN_DEFAULT_EMAIL,
      password: process.env.ADMIN_DEFAULT_PASSWORD,
      role: 'super_admin',
    });

    console.log('✅ Admin reset successfully');
    console.log('Email:', admin.email);
    console.log('Password:', process.env.ADMIN_DEFAULT_PASSWORD);
    process.exit(0);
  } catch (error) {
    console.error('❌ Admin reset failed:', error.message);
    process.exit(1);
  }
};

resetAdmin();

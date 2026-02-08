import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import ApplyNow from './pages/public/ApplyNow';
import Benefits from './pages/public/Benefits';
import Eligibility from './pages/public/Eligibility';
import InterestRates from './pages/public/InterestRates';
import EMICalculator from './pages/public/EMICalculator';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Leads from './pages/admin/Leads';
import LeadDetail from './pages/admin/LeadDetail';
import AuditLogs from './pages/admin/AuditLogs';
import EmailTemplates from './pages/admin/EmailTemplates';
import AdminLayout from './components/admin/AdminLayout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="benefits" element={<Benefits />} />
        <Route path="eligibility" element={<Eligibility />} />
        <Route path="interest-rates" element={<InterestRates />} />
        <Route path="emi-calculator" element={<EMICalculator />} />
        <Route path="apply" element={<ApplyNow />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/:id" element={<LeadDetail />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="email-templates" element={<EmailTemplates />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

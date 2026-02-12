import { Link, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { LayoutDashboard, Users, FileText, Mail, LogOut, Menu, X, UserCog, KeyRound, Settings as SettingsIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
  const { logout, admin } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 flex">
      {/* Sidebar */}
      <aside className={`bg-dark text-white hidden md:flex flex-col shadow-xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
              <p className="text-sm text-gray-400 mt-1">{admin?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{admin?.email}</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-gray-300 hover:text-white transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            title="Dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive('/admin/dashboard') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            to="/admin/leads"
            title="Leads"
            className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive('/admin/leads') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <Users className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Leads</span>}
          </Link>
          {admin?.role === 'super_admin' && (
            <Link
              to="/admin/users"
              title="Manage Users"
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive('/admin/users') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <UserCog className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && <span>Manage Users</span>}
            </Link>
          )}
          {(admin?.role === 'admin' || admin?.role === 'manager' || admin?.role === 'super_admin') && (
            <Link
              to="/admin/audit-logs"
              title="Audit Logs"
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive('/admin/audit-logs') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && <span>Audit Logs</span>}
            </Link>
          )}
          {(admin?.role === 'admin' || admin?.role === 'super_admin') && (
            <Link
              to="/admin/email-templates"
              title="Email Templates"
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive('/admin/email-templates') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && <span>Email Templates</span>}
            </Link>
          )}
          {admin?.role === 'super_admin' && (
            <Link
              to="/admin/settings"
              title="Settings"
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive('/admin/settings') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <SettingsIcon className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && <span>Settings</span>}
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            title="Logout"
            className="w-full inline-flex items-center gap-2 text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-72 bg-dark text-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
                <p className="text-sm text-gray-400 mt-1">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{admin?.email}</p>
              </div>
              <button
                className="text-gray-300 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/dashboard') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/admin/leads"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/leads') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                <Users className="h-4 w-4" />
                Leads
              </Link>
              {admin?.role === 'super_admin' && (
                <Link
                  to="/admin/users"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/users') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <UserCog className="h-4 w-4" />
                  Manage Users
                </Link>
              )}
              {(admin?.role === 'admin' || admin?.role === 'manager' || admin?.role === 'super_admin') && (
                <Link
                  to="/admin/audit-logs"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/audit-logs') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <FileText className="h-4 w-4" />
                  Audit Logs
                </Link>
              )}
              {(admin?.role === 'admin' || admin?.role === 'super_admin') && (
                <Link
                  to="/admin/email-templates"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/email-templates') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <Mail className="h-4 w-4" />
                  Email Templates
                </Link>
              )}
              {admin?.role === 'super_admin' && (
                <Link
                  to="/admin/settings"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/settings') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              )}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={logout}
                className="w-full inline-flex items-center gap-2 text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/change-password"
              className="hidden md:inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-300"
            >
              <KeyRound className="h-4 w-4" />
              Change Password
            </Link>
            <button
              onClick={logout}
              className="md:hidden btn-outline text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

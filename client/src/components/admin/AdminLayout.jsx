import { Link, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { LayoutDashboard, Users, FileText, Mail, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const { logout, admin } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white hidden md:flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
          <p className="text-sm text-gray-400 mt-1">{admin?.name || 'Admin'}</p>
          <p className="text-xs text-gray-500 mt-1 truncate">{admin?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/dashboard') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/admin/leads"
            className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/leads') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <Users className="h-4 w-4" />
            Leads
          </Link>
          {(admin?.role === 'admin' || admin?.role === 'super_admin') && (
            <Link
              to="/admin/audit-logs"
              className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/audit-logs') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <FileText className="h-4 w-4" />
              Audit Logs
            </Link>
          )}
          {(admin?.role === 'admin' || admin?.role === 'super_admin') && (
            <Link
              to="/admin/email-templates"
              className={`flex items-center gap-3 px-4 py-2 rounded ${isActive('/admin/email-templates') ? 'bg-primary text-white shadow' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              <Mail className="h-4 w-4" />
              Email Templates
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
              {(admin?.role === 'admin' || admin?.role === 'super_admin') && (
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

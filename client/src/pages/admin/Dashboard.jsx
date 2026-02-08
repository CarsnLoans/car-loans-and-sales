import { useEffect, useMemo, useState } from 'react';
import { getStats } from '../../services/leadService';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import { Users, PhoneCall, TrendingUp, CalendarClock } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusData = useMemo(() => {
    return (stats?.leadsByStatus || []).map((item) => ({
      name: item._id,
      value: item.count,
    }));
  }, [stats]);

  const monthlyData = useMemo(() => {
    return (stats?.monthlyTrend || []).map((item) => ({
      name: `${item._id.month}/${item._id.year}`,
      leads: item.count,
    }));
  }, [stats]);

  const COLORS = ['#3b82f6', '#f59e0b', '#f97316', '#22c55e', '#ef4444'];

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <Skeleton className="h-4 w-28 mb-3" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skeleton className="h-5 w-40 mb-4" />
            <Skeleton className="h-64" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skeleton className="h-5 w-40 mb-4" />
            <Skeleton className="h-64" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Skeleton className="h-5 w-52 mb-4" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Track performance and lead flow at a glance.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <CalendarClock className="h-4 w-4 text-primary" />
          Updated just now
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border border-gray-100 shadow-md">
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-3xl bg-primary/10" />
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Total Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.totalLeads || 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className="relative overflow-hidden border border-gray-100 shadow-md">
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-3xl bg-blue-500/10" />
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Today's Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.todayLeads || 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className="relative overflow-hidden border border-gray-100 shadow-md">
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-3xl bg-emerald-500/10" />
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Recent Leads</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.recentLeads || 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className="relative overflow-hidden border border-gray-100 shadow-md">
          <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-3xl bg-amber-500/10" />
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Follow-ups</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats?.leadsByStatus?.find(s => s._id === 'Follow-up')?.count || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Leads by Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#dc3545" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Status Distribution</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#dc3545" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

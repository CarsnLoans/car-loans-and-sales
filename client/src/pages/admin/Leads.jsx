import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLeads, bulkUpdateLeads } from '../../services/leadService';
import { LEAD_STATUSES, LOAN_TYPES } from '../../constants/data';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import Skeleton from '../../components/common/Skeleton';
import { Users, Filter, Download, CheckSquare } from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasLoadedRef = useRef(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkFollowUpAt, setBulkFollowUpAt] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    loanType: '',
    followUp: '',
    sortBy: '-createdAt',
  });

  const fetchLeads = useCallback(async () => {
    if (!hasLoadedRef.current) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }
    try {
      const data = await getLeads({
        page,
        limit: 10,
        search: filters.search,
        status: filters.status,
        loanType: filters.loanType,
        followUp: filters.followUp,
        sortBy: filters.sortBy,
      });
      setLeads(data.leads || []);
      setPages(data.pages || 1);
      hasLoadedRef.current = true;
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const getStatusColor = (status) => {
    const statusMap = {
      New: 'bg-blue-100 text-blue-800',
      Contacted: 'bg-yellow-100 text-yellow-800',
      'Follow-up': 'bg-orange-100 text-orange-800',
      Interested: 'bg-green-100 text-green-800',
      'Not Interested': 'bg-red-100 text-red-800',
      Converted: 'bg-emerald-100 text-emerald-800',
      Rejected: 'bg-slate-100 text-slate-800',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  const isOverdue = (lead) => {
    if (!lead.nextFollowUpAt) return false;
    if (['Converted', 'Rejected'].includes(lead.status)) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(lead.nextFollowUpAt) < today;
  };

  const allSelected = useMemo(() => {
    return leads.length > 0 && selectedIds.length === leads.length;
  }, [leads, selectedIds]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((lead) => lead._id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkUpdate = async () => {
    if (selectedIds.length === 0) {
      toast.error('Select at least one lead');
      return;
    }
    try {
      await bulkUpdateLeads({
        ids: selectedIds,
        status: bulkStatus || undefined,
        nextFollowUpAt: bulkFollowUpAt || undefined,
      });
      toast.success('Leads updated');
      setSelectedIds([]);
      setBulkStatus('');
      setBulkFollowUpAt('');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update leads');
      console.error('Bulk update error:', error);
    }
  };

  const exportCsv = () => {
    if (leads.length === 0) {
      toast.error('No leads to export');
      return;
    }

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Loan Type',
      'Status',
      'Next Follow-up',
      'Created At',
    ];

    const rows = leads.map((lead) => [
      `${lead.firstName} ${lead.lastName}`,
      lead.email,
      lead.phone,
      lead.loanType,
      lead.status,
      lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleDateString() : '',
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Leads</h1>
            <p className="text-gray-600">Manage, segment, and follow up efficiently.</p>
          </div>
          {isRefreshing && (
            <span className="ml-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Updating
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            Total: <span className="font-semibold text-gray-900">{leads.length}</span>
          </div>
          <Button variant="secondary" onClick={exportCsv}>
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
          <Filter className="h-4 w-4 text-primary" /> Filters
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by name, email, phone"
            className="input-field"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <select
            className="input-field"
            value={filters.loanType}
            onChange={(e) => setFilters({ ...filters, loanType: e.target.value })}
          >
            <option value="">All Loan Types</option>
            {LOAN_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="input-field"
            value={filters.followUp}
            onChange={(e) => setFilters({ ...filters, followUp: e.target.value })}
          >
            <option value="">All Follow-ups</option>
            <option value="overdue">Overdue</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="none">No Follow-up</option>
          </select>
          <select
            className="input-field"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="status">Status (A-Z)</option>
            <option value="-status">Status (Z-A)</option>
            <option value="nextFollowUpAt">Follow-up Date</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {LEAD_STATUSES.map((status) => (
            <button
              key={status.value}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                filters.status === status.value
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'text-gray-700 border-gray-200 hover:border-primary'
              }`}
              onClick={() => setFilters({ ...filters, status: status.value })}
            >
              {status.label}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded-full text-sm border text-gray-700 border-gray-200 hover:border-primary"
            onClick={() => setFilters({ ...filters, status: '' })}
          >
            Clear Status
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <CheckSquare className="h-4 w-4 text-primary" /> Bulk actions
        </div>
        <select
          className="input-field max-w-xs"
          value={bulkStatus}
          onChange={(e) => setBulkStatus(e.target.value)}
        >
          <option value="">Bulk Status</option>
          {LEAD_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="input-field max-w-xs"
          value={bulkFollowUpAt}
          onChange={(e) => setBulkFollowUpAt(e.target.value)}
        />
        <Button onClick={handleBulkUpdate}>Apply to Selected</Button>
        <Button variant="outline" onClick={() => setSelectedIds([])}>Clear Selection</Button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100">
        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {leads.map((lead) => (
            <div key={lead._id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Lead</p>
                  <p className="text-base font-semibold text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(lead._id)}
                  onChange={() => toggleSelect(lead._id)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
                <span className="text-xs text-gray-500">
                  {lead.loanType}
                </span>
                {isOverdue(lead) && (
                  <span className="text-xs text-red-600 font-semibold">Overdue</span>
                )}
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{lead.email}</p>
                <p>{lead.phone}</p>
                <p>Next follow-up: {lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleDateString() : '—'}</p>
                <p>Created: {new Date(lead.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <Link
                  to={`/admin/leads/${lead._id}`}
                  className="text-primary font-semibold hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="text-center py-8 text-gray-500">No leads found</div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Next Follow-up</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50/70 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(lead._id)}
                      onChange={() => toggleSelect(lead._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.loanType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toLocaleDateString() : '—'}
                    {isOverdue(lead) && (
                      <span className="ml-2 text-xs text-red-600 font-semibold">Overdue</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/admin/leads/${lead._id}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="text-center py-8 text-gray-500">No leads found</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn-outline text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {page} of {pages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
            disabled={page === pages}
            className="btn-outline text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Leads;

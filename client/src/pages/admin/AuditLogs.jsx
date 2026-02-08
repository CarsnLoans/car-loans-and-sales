import { useCallback, useEffect, useState } from 'react';
import { getAuditLogs } from '../../services/auditLogService';
import Skeleton from '../../components/common/Skeleton';
import Button from '../../components/common/Button';
import { FileText, Filter, RotateCcw } from 'lucide-react';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({
    action: '',
    entityType: 'Lead',
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAuditLogs({
        page,
        limit: 15,
        action: filters.action,
        entityType: filters.entityType,
      });
      setLogs(data.logs || []);
      setPages(data.pages || 1);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-gray-600">Review administrative activity and system changes.</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
          <Filter className="h-4 w-4 text-primary" /> Filters
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="input-field"
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
          >
            <option value="">All Actions</option>
            <option value="lead_updated">Lead Updated</option>
            <option value="lead_bulk_updated">Bulk Updated</option>
            <option value="lead_deleted">Lead Deleted</option>
          </select>
          <select
            className="input-field"
            value={filters.entityType}
            onChange={(e) => setFilters({ ...filters, entityType: e.target.value })}
          >
            <option value="Lead">Lead</option>
          </select>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setFilters({ action: '', entityType: 'Lead' })}>
              <span className="inline-flex items-center gap-2">
                <RotateCcw className="h-4 w-4" /> Reset
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100">
        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {logs.map((log) => (
            <div key={log._id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">{log.action}</p>
                <span className="text-xs text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{log.performedBy?.name || 'System'}</p>
                <p className="text-xs text-gray-500">{log.performedBy?.email || '—'}</p>
              </div>
              <div className="text-xs text-gray-500">Entity: {log.entityType}</div>
              <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
                {JSON.stringify(log.metadata || {}, null, 2)}
              </pre>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center py-8 text-gray-500">No audit logs found.</div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Action</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Performed By</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Entity</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Metadata</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan="5">
                    No audit logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="border-t hover:bg-gray-50/70 transition">
                    <td className="px-4 py-3 text-gray-700 font-medium">{log.action}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="font-medium">{log.performedBy?.name || 'System'}</div>
                      <div className="text-xs text-gray-500">{log.performedBy?.email || '—'}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {log.entityType}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
                        {JSON.stringify(log.metadata || {}, null, 2)}
                      </pre>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {page} of {pages}
        </span>
        <Button
          variant="outline"
          disabled={page >= pages}
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AuditLogs;

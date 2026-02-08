import api from './api';

export const getAuditLogs = async (params) => {
  const response = await api.get('/admin/audit-logs', { params });
  return response.data;
};

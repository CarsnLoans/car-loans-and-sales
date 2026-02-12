import api from './api';

// Create lead (public)
export const createLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

// Get all leads (admin)
export const getLeads = async (params) => {
  const response = await api.get('/leads/admin/leads', { params });
  return response.data;
};

// Get single lead (admin)
export const getLead = async (id) => {
  const response = await api.get(`/leads/admin/leads/${id}`);
  return response.data;
};

// Update lead (admin)
export const updateLead = async (id, data) => {
  const response = await api.patch(`/leads/admin/leads/${id}`, data);
  return response.data;
};

// Bulk update leads (admin)
export const bulkUpdateLeads = async (payload) => {
  const response = await api.patch('/leads/admin/leads/bulk', payload);
  return response.data;
};

// Delete lead (admin)
export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/admin/leads/${id}`);
  return response.data;
};

// Bulk delete leads (super admin only)
export const bulkDeleteLeads = async (payload) => {
  const response = await api.delete('/leads/admin/leads/bulk', { data: payload });
  return response.data;
};

// Get dashboard stats (admin)
export const getStats = async () => {
  const response = await api.get('/leads/admin/stats');
  return response.data;
};

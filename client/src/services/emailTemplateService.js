import api from './api';

export const getEmailTemplates = async () => {
  const response = await api.get('/admin/email-templates');
  return response.data;
};

export const updateEmailTemplate = async (name, data) => {
  const response = await api.patch(`/admin/email-templates/${name}`, data);
  return response.data;
};

import api from './api';

export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data.settings;
  } catch (error) {
    console.error('Get settings error:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const response = await api.patch('/settings', settingsData);
    return response.data.settings;
  } catch (error) {
    console.error('Update settings error:', error);
    throw error;
  }
};

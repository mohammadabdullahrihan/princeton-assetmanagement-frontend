import apiClient from './api';

/**
 * Asset Service (Refactored for Creative Assets)
 * Handles multi-part/form-data for file uploads
 */

export const assetService = {
  getAssets: async (filters = {}) => {
    const response = await apiClient.get('/assets', { params: filters });
    return response.data;
  },

  getAssetById: async (id) => {
    const response = await apiClient.get(`/assets/${id}`);
    return response.data;
  },

  createAsset: async (formData) => {
    // apiClient should handle the boundary automatically if formData is passed
    const response = await apiClient.post('/assets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateAsset: async (id, formData) => {
    const response = await apiClient.put(`/assets/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteAsset: async (id) => {
    const response = await apiClient.delete(`/assets/${id}`);
    return response.data;
  },

  // Removed maintenance, transfer, depreciation as they are no longer part of the creative asset manager
};

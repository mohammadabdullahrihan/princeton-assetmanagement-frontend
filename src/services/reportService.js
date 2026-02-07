import apiClient from './api';

/**
 * Report Service
 * Handles all report and analytics API calls
 */

export const reportService = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async () => {
    const response = await apiClient.get('/reports/dashboard');
    return response.data;
  },

  /**
   * Get asset summary report
   */
  getAssetReport: async (filters = {}) => {
    const response = await apiClient.get('/reports/assets', { params: filters });
    return response.data;
  },

  /**
   * Get system audit logs
   */
  getAuditLogs: async () => {
    const response = await apiClient.get('/reports/logs');
    return response.data;
  },

  /**
   * Placeholders for removed reports
   */
  getDepreciationReport: async () => ({ data: { assets: [] } }),
  getMaintenanceReport: async () => ({ data: { maintenance: [] } }),
  getDisposalReport: async () => ({ data: { assets: [] } }),
};

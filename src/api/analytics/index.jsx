import { axiosPrivate } from "../axiosPrivate";

export async function fetchAnalyticsData(website_url, period) {
  const result = await axiosPrivate.get(`/analytics/get_analytics_data?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}

export async function fetchReportData(website_url, period) {
  const result = await axiosPrivate.get(`/analytics/get_report_data?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}
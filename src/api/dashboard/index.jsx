import { axiosPrivate } from "../axiosPrivate";

export async function fetchDashboardData(website_url, period) {
  const result = await axiosPrivate.get(`/dashboard/get_dashboard_data?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}

export async function fetchVisitorsLocationData(website_url, period) {
  const result = await axiosPrivate.get(`/dashboard/get_visitors_location_data?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}

export async function fetchVisitedPagesData(website_url, period) {
  const result = await axiosPrivate.get(`/dashboard/get_visited_pages_data?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}

export async function fetchVisitorSourceData(website_url, period) {
  const result = await axiosPrivate.get(`/dashboard/get_visitor_source_data?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}

export async function fetchLeadProfilesData(website_url, period, page_num, page_count) {
  const result = await axiosPrivate.get(`/dashboard/get_lead_profiles_data?weburl=${website_url.join(',')}&period=${period}&page_num=${page_num}&page_count=${page_count}`);
  return result.data;
}

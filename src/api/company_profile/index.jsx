import { axiosPrivate } from "../axiosPrivate";

export async function fetchCompanyProfilesData(website_url, period) {
  const result = await axiosPrivate.get(`/company_profile/get_company_profile?weburl=${website_url.join(',')}&period=${period}`);
  return result.data;
}

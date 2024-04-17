import { axiosPrivate } from "../axiosPrivate";

export async function fetchSearchResult(website_url, search_key) {
  const result = await axiosPrivate.get(`/search/get_search_result?weburl=${website_url.join(',')}&search_key=${search_key}`);
  return result.data;
}

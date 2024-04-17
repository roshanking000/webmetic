import { axiosPrivate } from "../axiosPrivate";

export async function fetchConnectedWebsites(accountId) {
  const result = await axiosPrivate.get(`${import.meta.env.VITE_SERVER_URL}/account/get_connected_websites/${accountId}`);
  return result.data;
}

export async function addWebsite(emailAddress, website) {
  const result = await axiosPrivate.post(`/account/add_website`, { email_address: emailAddress, website: website });
  return result.data;
}

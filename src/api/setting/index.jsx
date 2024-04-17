import { axiosPrivate } from "../axiosPrivate";

export async function fetchUserList(email) {
  const result = await axiosPrivate.get(`/setting/get_user_list?email=${email}`);
  return result.data;
}

export async function addNewUser(emailAddress, userName, userEmail) {
  const result = await axiosPrivate.post(`/setting/add_new_user`, { email_address: emailAddress, user_name: userName, user_email: userEmail });
  return result.data;
}

export async function editUser(adminEmail, oldUserName, oldUserEmail, userName, userEmail) {
  const result = await axiosPrivate.post(`/setting/edit_user`, { admin_email: adminEmail, old_user_name: oldUserName, old_user_email: oldUserEmail, user_name: userName, user_email: userEmail });
  return result.data;
}

export async function removeUser(userEmail, adminEmail) {
  const result = await axiosPrivate.post(`/setting/remove_user`, { user_email: userEmail, admin_email: adminEmail });
  return result.data;
}

export async function fetchAPIKey(userEmail) {
  const result = await axiosPrivate.get(`/setting/get_api_key?email=${userEmail}`);
  return result.data;
}

export async function generateAPIKey(userEmail) {
  const result = await axiosPrivate.post(`/setting/generate_api_key`, { user_email: userEmail });
  return result.data;
}

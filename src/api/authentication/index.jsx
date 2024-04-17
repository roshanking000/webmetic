import { axiosPublic } from "../axiosPublic";

export async function sendResetCode(emailAddress) {
  const result = await axiosPublic.post(`/auth/forgot_password`, JSON.stringify({ email_address: emailAddress }));
  return result.data;
}

export async function resetPassword(accessToken, password) {
  const result = await axiosPublic.post(`/auth/reset_password`, JSON.stringify({ access_token: accessToken, password: password }));
  return result.data;
}

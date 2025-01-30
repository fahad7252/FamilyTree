// services/profileService.js
import sendRequest from "./sendRequest";

const BASE_URL = "/api/profiles";

// Fetch the profile
export async function getProfile() {
  return sendRequest(BASE_URL);
}

// Update the profile
export async function updateProfile(profileData) {
  return sendRequest(BASE_URL, "PUT", profileData);
}
export async function updateMemberDetails(id, details) {
  const res = await fetch(`/api/families/members/${id}/details`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(details),
  });
  return handleResponse(res);
}

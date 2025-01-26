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

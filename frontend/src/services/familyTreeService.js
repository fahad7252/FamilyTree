import sendRequest from "./sendRequest";

const BASE_URL = "/api/familyTree";

// get all members
export function getAllMembers() {
  return sendRequest(BASE_URL);
}

// SINGLE member
export function getMember(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
//new member
export function createMember(memberData) {
  return sendRequest(BASE_URL, "POST", memberData);
}
// update  member
export function updateMember(id, memberData) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", memberData);
}

export function deleteMember(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}

export function updateMemberDetails(id, details) {
  return sendRequest(`${BASE_URL}/${id}/details`, "PUT", details);
}

export function updateMemberPosition(id, position) {
  return sendRequest(`${BASE_URL}/${id}`, "PUT", { position });
}

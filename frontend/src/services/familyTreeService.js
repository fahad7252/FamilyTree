async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: res.statusText }));
    throw new Error(`${res.status} ${res.statusText}: ${errorData.message}`);
  }
  return res.json();
}
//ss

export async function getFamilyMembers() {
  const res = await fetch("/api/families/members", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return handleResponse(res);
}

export async function addFamilyMember(memberData) {
  const res = await fetch("/api/families/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(memberData),
  });
  return handleResponse(res);
}

export async function updateFamilyMember(id, memberData) {
  const res = await fetch(`/api/families/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(memberData),
  });
  return handleResponse(res);
}

export async function deleteFamilyMember(id) {
  const res = await fetch(`/api/families/members/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return handleResponse(res);
}

export async function updateMemberPosition(id, position) {
  const res = await fetch(`/api/families/members/${id}/position`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(position),
  });
  return handleResponse(res);
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

// services/familyService.js
export async function addFamilyMember(memberData) {
  const res = await fetch("/api/families/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(memberData),
  });
  return res.json();
}

export async function getFamilyMembers() {
  const res = await fetch("/api/families/members", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
}

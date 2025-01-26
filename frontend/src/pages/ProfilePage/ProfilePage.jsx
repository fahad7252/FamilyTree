import React, { useState, useEffect } from 'react';
import FamilyMemberForm from '../../components/FamilyMemberForm/FamilyMemberForm';
import FamilyMemberList from '../../components/FamilyMemberList/FamilyMemberList';
import * as familyService from '../../services/familyService';

export default function ProfilePage({ user }) {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const members = await familyService.getFamilyMembers();
        setFamilyMembers(members);
      } catch (error) {
        setError('Failed to load family members');
        console.error('Error fetching family members:', error);
      }
    }
    fetchMembers();
  }, []);

  const handleAddMember = async (memberData) => {
    try {
      const newMember = await familyService.addFamilyMember(memberData);
      setFamilyMembers((prevMembers) => [...prevMembers, newMember]);
    } catch (error) {
      setError('Failed to add family member');
      console.error('Error adding family member:', error);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h2>Family Members</h2>
      <FamilyMemberForm onAddMember={handleAddMember} />
      {error && <p>{error}</p>}
      <FamilyMemberList members={familyMembers} />
    </div>
  );
}

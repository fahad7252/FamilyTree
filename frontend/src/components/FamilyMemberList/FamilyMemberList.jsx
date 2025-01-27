import React, { useEffect, useState } from 'react';
import * as familyService from '../../services/familyService';

export default function FamilyMemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await familyService.getFamilyMembers();
        console.log('Fetched members:', data); 
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError('Failed to load family members');
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Family Members</h3>
      <div className="members-container">
        {members.length === 0 ? (
          <p>No family members added yet</p>
        ) : (
          members.map((member, idx) => (
            <div key={idx} className="member-card">
              <h4>{member.name}</h4>
              <p>Relationship: {member.relationship}</p>
              {member.birthDate && (
                <p>Birth Date: {new Date(member.birthDate).toLocaleDateString()}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

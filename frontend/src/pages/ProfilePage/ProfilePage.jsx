import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as familyTreeService from '../../services/familyTreeService';
import './ProfilePage.css'
export default function ProfilePage({ user }) {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    async function loadSelfMember() {
      try {
        const members = await familyTreeService.getFamilyMembers();
        const selfMember = members.find(m => m.user === user._id && m.type === 'self');
        if (selfMember) {
          setMember(selfMember);
        }
      } catch (err) {
        console.error('Error loading self member:', err);
      }
    }
    loadSelfMember();
  }, [user._id]);

  const handleViewDetails = () => {
    if (member && member._id) {
      navigate(`/members/${member._id}`);
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="basic-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {member ? (
          <>
            <button onClick={handleViewDetails} className="details-button">
              View Member Details
            </button>
            <p className="info-message">
              The edit will only update and work in the details page from the family tree member card. 
              You can just view it from this details tab. Don't bother editing your details here - just 
              from the family tree member card you can edit yourself and also others thanks!!!
            </p>
          </>
        ) : (
          <p>Loading member details...</p>
        )}
      </div>
    </div>
  );
}
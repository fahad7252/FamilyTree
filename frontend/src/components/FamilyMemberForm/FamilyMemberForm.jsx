import { useState } from 'react';

export default function FamilyMemberForm({ onAddMember }) {
  const [memberData, setMemberData] = useState({
    name: '',
    relationship: '',
    birthDate: '',
  });

  const relationships = [
    'Parent', 'Child', 'Sibling', 'Spouse',
    'Grandparent', 'Grandchild', 'Uncle/Aunt',
    'Niece/Nephew', 'Cousin'
  ];

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting form data:', memberData); 
    onAddMember(memberData);
    setMemberData({
      name: '',
      relationship: '',
      birthDate: ''
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={memberData.name}
          onChange={(e) => setMemberData({...memberData, name: e.target.value})}
          required
        />
      </div>
      
      <div>
        <label>Relationship:</label>
        <select 
          value={memberData.relationship}
          onChange={(e) => setMemberData({...memberData, relationship: e.target.value})}
          required
        >
          <option value="">Select Relationship</option>
          {relationships.map(rel => (
            <option key={rel} value={rel}>{rel}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Birth Date:</label>
        <input
          type="date"
          value={memberData.birthDate}
          onChange={(e) => setMemberData({...memberData, birthDate: e.target.value})}
        />
      </div>

      <button type="submit">Add Family Member</button>
    </form>
  );
}

// src/pages/FamilyTreePage/FamilyTreePage.jsx
import React, { useState } from 'react';
import FamilyTree from '../../components/FamilyTree/FamilyTree';
import './FamilyTreePage.css';

export default function FamilyTreePage({ user }) {
  const [treeName, setTreeName] = useState('My Family Tree');

  return (
    <div className="familytree-page">
      <div className="familytree-container">
        <input
          type="text"
          value={treeName}
          onChange={(e) => setTreeName(e.target.value)}
          className="tree-name-input"
          placeholder="Enter Family Tree Name"
        />
       
      </div>
    </div>
  );
}

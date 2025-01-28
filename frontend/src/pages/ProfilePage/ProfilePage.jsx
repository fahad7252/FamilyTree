import React, { useState, useEffect } from 'react';

import * as familyService from '../../services/familyService';

export default function ProfilePage({ user }) {

  const [error, setError] = useState(null);

  

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      
    </div>
  );
}

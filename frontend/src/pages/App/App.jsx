import { useState } from 'react';
//import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import ProfilePage from '../ProfilePage/ProfilePage';
import FamilyTreePage from '../FamilyTreePage/FamilyTreePage';
import MemberDetailsPage from '../MemberDetailsPage/MemberDetailsPage';

import { Routes, Route } from 'react-router-dom';
//import ProfilePage from './pages/ProfilePage/ProfilePage';




export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
            <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/family-tree" element={<FamilyTreePage />} /> 
            <Route path="/members/:id" element={<MemberDetailsPage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
  </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}
//user={user} 
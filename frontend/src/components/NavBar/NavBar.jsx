import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="NavBar">
     
     
      {user ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/family-tree">Family Tree</NavLink> 
          &nbsp; | &nbsp;
          <NavLink to="/posts" end>
            Post List
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/posts/new">New Post</NavLink>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
          <>
            <NavLink to="/">Home</NavLink>
             &nbsp; | &nbsp;
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}

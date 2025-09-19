import './Navbar.css'
import { useAuth } from '../features/auth/AuthContext';
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav class='Navbar-Main'>
      <h1>RedSeam Clothing</h1>
      {isLoggedIn ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <div class='Navbar-Login-Container'>
          <IoPerson />
          <Link to="/login" class='Navbar-Login-Button'>Log in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import './Navbar.css'
import { useAuth } from '../features/auth/AuthContext';
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';
import navBarLogo from '../assets/images/Vector.png'
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

const Navbar = () => {
  const { user, isLoggedIn } = useAuth();


  return (
    <nav class='Navbar-Main'>
      <div class='Navbar-Logo-Container'>
        <Link to="/">
      <img class='Navbar-Logo' src={navBarLogo} alt="Logo" />
      </Link>
      <h1>RedSeam Clothing</h1>
      </div>
      {isLoggedIn ? (
        <>
        <div class="Navbar-User-Logo-Container">
        <FaShoppingCart style={{fontSize:'25px',marginRight:'10px'}}/>
          <img src={user?.user?.avatar} class="Navbar-User-Logo"/>
          <FaAngleDown />
          </div>
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
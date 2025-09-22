import './Navbar.css'
import { useAuth } from '../features/auth/AuthContext';
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';
import navBarLogo from '../assets/images/Vector.png'
import { FaCartShopping,FaAngleDown } from "react-icons/fa6";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';



const Navbar = () => {
  const { user, isLoggedIn } = useAuth();
const {  openCart } = useContext(AppContext);

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
        <FaCartShopping  class="Navbar-Shopping-Cart" onClick={openCart}/>
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
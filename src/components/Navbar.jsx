import './Navbar.css'
import { useAuth } from '../features/auth/AuthContext';
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';
import navBarLogo from '../assets/images/HandEye.png'
import { FaCartShopping,FaAngleDown } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import defaultAvatar from '../assets/images/default-avatar.jpg'


const Navbar = () => {
  const { user, isLoggedIn,logout } = useAuth();
  const {  openCart } = useContext(AppContext);

  const [logoutModal, setLogoutModal] = useState(false)

  

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
          <img src={user?.user?.avatar ||  defaultAvatar} class="Navbar-User-Logo"/>
          <FaAngleDown onClick={()=> setLogoutModal(!logoutModal)} class="Avatar-Angledown"/>
                {logoutModal && 
                        <div class='Avatar-Logout-Container'>
                                <button onClick={logout} class="Avatar-Logout-Button">Logout</button>
                        </div>
                        }
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
import './Navbar.css';
import { useAuth } from '../features/auth/AuthContext';
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';
import navBarLogo from '../assets/images/HandEye.png';
import { FaCartShopping, FaAngleDown } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import defaultAvatar from '../assets/images/default-avatar.jpg';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { openCart } = useContext(AppContext);

  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <nav className='Navbar-Main'>
      <div className='Navbar-Logo-Container'>
        <Link to="/">
          <img className='Navbar-Logo' src={navBarLogo} alt="Logo" />
        </Link>
        <h1>RedSeam Clothing</h1>
      </div>

      {isLoggedIn ? (
        <>
          <div className="Navbar-User-Logo-Container">
            <FaCartShopping className="Navbar-Shopping-Cart" onClick={openCart} />
            <img
              src={user?.user?.avatar || defaultAvatar}
              className="Navbar-User-Logo"
              alt="User Avatar"
            />
            <FaAngleDown
              onClick={() => setLogoutModal(!logoutModal)}
              className="Avatar-Angledown"
            />
            {logoutModal && (
              <div className='Avatar-Logout-Container'>
                <button onClick={logout} className="Avatar-Logout-Button">Logout</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='Navbar-Login-Container'>
          <IoPerson />
          <Link to="/login" className='Navbar-Login-Button'>Log in</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

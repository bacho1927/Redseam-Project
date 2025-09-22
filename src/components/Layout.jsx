import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; 

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavRoutes = ['/order-placed'];
  const showNavbar = !noNavRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
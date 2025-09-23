import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import ShoppingCartModal from '../components/ShoppingCartModal';
import ShoppingCart from '../components/ShoppingCart';
import Login from '../pages/Login';
import RegisterForm from '../pages/Register';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import OrderPlaced from '../pages/OrderPlaced';

function AppRoutes() {
  const { isCartOpen, closeCart, cartItems } = useContext(AppContext);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/' element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path='/order-placed' element={<OrderPlaced />} />
        </Routes>
      </Layout>
      
      <ShoppingCartModal isOpen={isCartOpen} onClose={closeCart} itemCount={totalItems} totalPrice={totalPrice} >
        <ShoppingCart />
      </ShoppingCartModal>
    </Router>
  );
}

export default AppRoutes;
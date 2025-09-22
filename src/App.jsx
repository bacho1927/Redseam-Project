import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AppProvider } from './context/AppContext'; 
import RegisterForm from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; 
import OrderPlaced from './pages/OrderPlaced';
import Layout from './components/Layout';
import ShoppingCartModal from './components/ShoppingCartModal';

function App() {
  
  return (
    <AppProvider>
      <Router>
       <Layout> 
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/' element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path='/order-placed' element={<OrderPlaced />}/>
          </Routes>
        </Layout>
        <ShoppingCartModal  />
      </Router>
    </AppProvider>
  );
}

export default App;
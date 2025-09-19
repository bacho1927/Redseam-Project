import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AppProvider } from './context/AppContext'; 
import RegisterForm from './pages/Register';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
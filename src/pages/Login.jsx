import Photo from '../assets/images/Login-Photo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Correct the import
import { AuthLogin } from '../features/auth/AuthLogin';
import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext'; // 1. Import useAuth

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 
  const { login } = useAuth();    // 3. Get the login function from your context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Email and password are required.');
      return;
    }

    try {
      
      const userData = await AuthLogin(form);
      
      // updates  global state with the user data
      login(userData); 
      
      //  navigates to the main page
      navigate('/'); 
      
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('Login failed!');
    }
  };

  return (
    <div className='Login-Main'>
      <img className='Login-Image' src={Photo} alt="Decorative" />
      <div className='Login-Form-Container'>
        <h1>Log in</h1>
        <div className='Login-Fields-Container'>
          <input 
            type='email' 
            name='email' 
            placeholder='Email' 
            className='Login-Fields-Input' 
            value={form.email}
            onChange={handleChange} 
          />
          <input 
            type='password' 
            name='password' 
            placeholder='Password' 
            className='Login-Fields-Input' 
            value={form.password}
            onChange={handleChange} 
          />
          <button className='Login-Button' onClick={handleLogin}>Log in</button>
        </div>
        <p className='Login-P'>Not a member? <Link to="/register" className='Login-Register'>Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
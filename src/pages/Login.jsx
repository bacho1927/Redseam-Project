import Photo from '../assets/images/Login-Photo.png'
import './Login.css'
import { Link } from 'react-router'
import {AuthLogin} from '../features/auth/AuthLogin'
import { useState } from 'react';


function Login() {
     const [form, setForm] = useState({
    email: '',
    password: '',
  });

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
  };


const handleLogin =async (e)=>{

    e.preventDefault();

    if (!form.email || !form.password) {
    alert('Email and password are required.');
    console.log(form)
    return;
  }

    try {
    const result = await AuthLogin(form);  
    console.log('Login successful:', result);
    alert('Logged in successfully!');
    
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    alert('Login failed!');
  }
    }
    
    return (
        <div class='Login-Main'>
            <img class='Login-Image' src={Photo} />
            <div class='Login-Form-Container'>
                <h1>Log in</h1>
                <div class='Login-Fields-Container'>
                    <input type='text' name='email' placeholder='Email ' class='Login-Fields-Input' value={form.email}
                    onChange={handleChange}></input>
                    <input type='text' name='password' placeholder='Password' class='Login-Fields-Input' value={form.password}
                    onChange={handleChange}></input>
                    <button class='Login-Button' onClick={handleLogin}>Log in</button>
                </div>
                <p class='Login-P'>Not a member? <Link to="/register" class='Login-Register'>Register</Link ></p>
            </div>
        </div>
    )
}

export default Login

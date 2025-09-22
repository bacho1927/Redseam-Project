import { useState,  useRef } from 'react';
import './Register.css'
import Photo from '../assets/images/Login-Photo.png'
import { Link, useNavigate } from 'react-router';
import { AuthRegister } from '../features/auth/AuthRegister'


const RegisterForm = () => {
  const [form, setForm] = useState({
    Username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState(null);
  const avatarInputRef = useRef(null);
  
  const existingUsername = [ 'admin', 'testuser'];

  const validate = () => {

  const newErrors = {};

  //this is form validation logic
    
   if (!form.Username || form.Username.length < 3) {
  newErrors.Username = 'Username must be at least 3 characters.';
} else if (existingUsername.includes(form.Username)) {
  newErrors.username = 'Username is already taken.';
}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.password || form.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters.';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //this are handle functions
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // form submition
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    // form data
    const formData = new FormData();
    formData.append('username', form.Username);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.confirmPassword); 
    // Append avatar only if uploaded

    if (avatarInputRef.current?.files[0]) {
      formData.append('avatar', avatarInputRef.current.files[0]);
    }
console.log(formData)
    try {
      const result = await AuthRegister(formData);
      console.log('Registration successful:', result);
      
     navigate('/')
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
    }
  }
};
//for avatar upload
  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];
    console.log(e)
    if (file) {
      const url = URL.createObjectURL(file); 
      setAvatar(url);
    }
  };

  const handleRemoveAvatar = () => {
    if (avatar) {
      URL.revokeObjectURL(avatar);
      setAvatar(null);
      if (avatarInputRef.current) {
        avatarInputRef.current.value = ''; // 
      }
    }
  };

  


  return (
    <div class='Register-Main'>
    <img class='Login-Image' src={Photo} />
    <form  onSubmit={handleSubmit}class='Register-Form-Container'>
      <h2>Registration</h2>

      <div class='Register-Fields-Container'>
        <div className='Avatar-Image-Container'>
          <img src={avatar}  style={{ width: 100, height: 100, borderRadius: '50%' }} />
          <label htmlFor="avatarInput" class="Upload-Label">Upload new</label>
          <label onClick={handleRemoveAvatar} class="Remove-Label">Remove</label>
          <input ref={avatarInputRef} type="file" id="avatarInput" name="avatar" accept="image/*" hidden onChange={handleUploadAvatar}></input>
        </div>
        <input
          type="text"
          name="Username"
          value={form.uniqueEmail}
          onChange={handleChange}
          placeholder='Username'
        />
        {errors.Username && <p class='Form-Error-Message'>{errors.Username}</p>}
      
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder='Email'
        />
        {errors.email && <p class='Form-Error-Message'>{errors.email}</p>}
 
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder='Password'
        />
        {errors.password && <p class='Form-Error-Message'>{errors.password}</p>}
  
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm password'
        />
        {errors.confirmPassword && <p class='Form-Error-Message'>{errors.confirmPassword}</p>}
      </div>

      <button class='Register-Button'>Register</button>
      <p class='Login-P'>Already a member? <Link to="/login" class='Register-Login'>Log in</Link ></p>
    </form>
    </div>
  );
};

export default RegisterForm;
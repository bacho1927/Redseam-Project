import Photo from '../assets/images/Login-Photo.png'
import './Login.css'
import { Link } from 'react-router'



function Login() {



    
    return (
        <div class='Login-Main'>
            <img class='Login-Image' src={Photo} />
            <div class='Login-Form-Container'>
                <h1>Log in</h1>
                <div class='Login-Fields-Container'>
                    <input type='text' name='Email' placeholder='Email ' class='Login-Fields-Input'></input>
                    <input type='text' name='Password' placeholder='Password' class='Login-Fields-Input'></input>
                    <button class='Login-Button'>Log in</button>
                </div>
                <p class='Login-P'>Not a member? <Link to="/register" class='Login-Register'>Register</Link ></p>
            </div>
        </div>
    )
}

export default Login

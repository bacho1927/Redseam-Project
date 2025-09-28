import { Link } from 'react-router';
import './OrderPlaced.css'
import { IoCheckmarkSharp } from "react-icons/io5";


function UserRegistered() {
    return (
        <div className='Ordered-Main-Container'>
            <div className="Ordered-Check-Logo-Background">
                <IoCheckmarkSharp className="Ordered-Check-Logo"/>

            </div>
            <h1 className="Ordered-Congrats">Congrats!</h1>
            <p className="Ordered-text">Your order is placed successfully!</p>
            <Link to="/" className="Ordered-Button">Continue Shopping</Link>
        </div>
    )
}

export default UserRegistered

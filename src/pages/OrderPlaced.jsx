import { Link } from 'react-router';
import './OrderPlaced.css'
import { IoCheckmarkSharp } from "react-icons/io5";


function UserRegistered() {
    return (
        <div class='Ordered-Main-Container'>
            <div class="Ordered-Check-Logo-Background">
                <IoCheckmarkSharp class="Ordered-Check-Logo"/>

            </div>
            <h1 class="Ordered-Congrats">Congrats!</h1>
            <p class="Ordered-text">Your order is placed successfully!</p>
            <Link to="/" class="Ordered-Button">Continue Shopping</Link>
        </div>
    )
}

export default UserRegistered

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ShoppingCart from '../components/ShoppingCart';
import './CheckoutPage.css'
import { Link } from "react-router";
const CheckoutPage = () => {
  
  const { cartItems } = useContext(AppContext);

  
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

 
  return (
    <div className="checkout-page-container">
      <h1>Checkout</h1>
      
      <div className="order-summary-section">
        <section className="checkout-form-container">
            <h2>Order details</h2>
            <form className="user-info-grid">
                
                <div className="form-field">
                   
                    <input type="text" id="firstName" name="firstName" placeholder="Name" />
                </div>
                <div className="form-field">
                    
                    <input type="text" id="lastName" name="lastName" placeholder="Surname" />
                </div>

                
                <div className="form-field full-width">
                    
                    <input type="email" id="email" name="email" placeholder="Email" />
                </div>

                    
                <div className="form-field">
                    
                    <input type="text" id="address" name="address" placeholder="Address" />
                </div>
                <div className="form-field">
                    
                    <input type="text" id="zipCode" name="zipCode" placeholder="Zip code" />
                </div>
            </form>
        </section>

        <section className="checkout-items-container">
  {/* This new div will handle the scrolling */}
  <div className="cart-items-scroll-area">
    <ShoppingCart isCheckoutPage={true} />
  </div>

  {/* The footer is now a sibling to the scrollable area, not inside it */}
  {cartItems.length > 0 && (
    <>
      <div className="checkout-footer">
        <div className="checkout-footer-texts">
          <p>Items subtotal</p>
          <p>Delivery</p>
          <strong>Total</strong>
        </div>

        <div className="checkout-footer-prices">
          <p>${totalPrice}</p>
          <p>$5</p>
          <strong>${totalPrice + 5}</strong>
        </div>
      </div>
      <button className="checkout-pay-button">Pay</button>
    </>
  )}
</section>
      </div>

      
      
    </div>
  );
};

export default CheckoutPage;
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import ShoppingCart from '../components/ShoppingCart';
import './CheckoutPage.css';
import { useNavigate } from "react-router";
import { PostRequest } from "../features/auth/fetch/PostRequest";
import { useAuth } from "../features/auth/AuthContext";

const CheckoutPage = () => {
  const { cartItems,clearCart } = useContext(AppContext);
  const { AuthUser } = useAuth();
 const [zipError, setZipError] = useState(''); 
 

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const navigate = useNavigate();

  const handlePay = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const zipCode = formData.get('zipCode');

    
    const isNumeric = /^\d+$/.test(zipCode); // this  checks if the string contains only digits

    if (!isNumeric) {
      setZipError("Zip code must only contain numbers.");
      return; 
    }

    setZipError(''); 

    const orderPayload = {
      name: formData.get('firstName'),
      surname: formData.get('lastName'),
      address: formData.get('address'),
      zip_code: zipCode, 
      email: formData.get('email'),
      items: cartItems.map(item => ({
        id: item.id,
        color: item.selectedColor,
        size: item.selectedSize,
      })),
    };
   
    
    try {
      
       const result = await PostRequest('cart/checkout', AuthUser.token, orderPayload);

       ~

      console.log('Order successful:', result);
       clearCart();  
      navigate('/order-placed');
    } catch (err) {
      console.error('Order failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="checkout-page-container">
      <h1>Checkout</h1>
      
      
      <form className="order-summary-section" onSubmit={handlePay}>
        <section className="checkout-form-container">
          <h2>Order details</h2>
          
          <div className="user-info-grid">
            <div className="form-field">
              <input type="text" id="firstName" name="firstName" placeholder="Name" required />
            </div>
            <div className="form-field">
              <input type="text" id="lastName" name="lastName" placeholder="Surname" required />
            </div>
            <div className="form-field full-width">
              <input type="email" id="email" name="email" placeholder="Email" required  defaultValue={AuthUser?.user?.email}/>
            </div>
            <div className="form-field">
              <input type="text" id="address" name="address" placeholder="Address" required />
            </div>
            <div className="form-field">
              <input type="text" id="zipCode" name="zipCode" placeholder="Zip code" required />
               {zipError && <p className="error-message">{zipError}</p>}
            </div>
            
          </div>
        </section>

        <section className="checkout-items-container">
          <div className="cart-items-scroll-area">
            <ShoppingCart isCheckoutPage={true} />
          </div>

          {cartItems.length > 0 && (
            <div className="checkout-footer">
              <div className="checkout-summary">
                <div className="summary-row">
                  <p>Items subtotal</p>
                  <p>${totalPrice}</p>
                </div>
                <div className="summary-row">
                  <p>Delivery</p>
                  <p>$5</p>
                </div>
                <div className="summary-row total">
                  <strong>Total</strong>
                  <strong>${totalPrice + 5}</strong>
                </div>
              </div>

              
              <button type="submit" className="checkout-pay-button">Pay</button>
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default CheckoutPage;
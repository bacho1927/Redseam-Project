import  { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './ShoppingCart.css'; 
import cartLogo from '../assets/images/cart-logo.png'
const ShoppingCart = () => {

  const { cartItems,increaseQuantity, decreaseQuantity, removeItem,closeCart } = useContext(AppContext);

  
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-content">
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img class="cart-image" src={item.selectedImage}/>
                
                <div class="item-info-container">
                    <div class="item-name-price-container"> 
                        <span class="item-name">{item.name}</span>
                        <span class="item-price">$ {item.price.toFixed(2)}</span>
                    </div>
                   
                    <span>{item.selectedColor}</span>
                    <span>{item.selectedSize}</span>
                    <div class="quantity-control-container">
                      <div className="quantity-control">
                          <button class="decrease-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button class="increase-button" onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                      <button class="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  
                </div>
              </div>
            ))}
          </div>
          
        </>
      ) : (
        <div class="empty-cart-container">
              <div class="empty-cart-header">
                <img src={cartLogo} />
                <h1>Ooops!</h1>
                <p>You've got nothing in your cart just yet...</p>
                <button onClick={closeCart}>Start shopping</button>
              </div>
              

        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
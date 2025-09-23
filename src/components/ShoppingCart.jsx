import  { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './ShoppingCart.css'; 

const ShoppingCart = () => {
  const { cartItems,increaseQuantity, decreaseQuantity } = useContext(AppContext);

  
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
                     <div className="quantity-control">
                    <button class="decrease-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button class="increase-button" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </>
      ) : (
        <p className="empty-cart-message">Your cart is empty. 🛒</p>
      )}
    </div>
  );
};

export default ShoppingCart;
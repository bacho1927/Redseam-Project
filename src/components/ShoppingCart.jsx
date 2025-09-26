import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './ShoppingCart.css';
import cartLogo from '../assets/images/cart-logo.png';

const ShoppingCart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem, closeCart } = useContext(AppContext);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="cart-content">
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img className="cart-image" src={item.selectedImage} />

                <div className="item-info-container">
                  <div className="item-name-price-container">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">$ {item.price.toFixed(2)}</span>
                  </div>

                  <span>{item.selectedColor}</span>
                  <span>{item.selectedSize}</span>
                  <div className="quantity-control-container">
                    <div className="quantity-control">
                      <button className="decrease-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="increase-button" onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-cart-container">
          <div className="empty-cart-header">
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
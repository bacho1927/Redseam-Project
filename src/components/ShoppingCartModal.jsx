import React from 'react';
import './ShoppingCartModal.css';

const ShoppingCartModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="shopping-cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children} {/* This will be where your cart items go */}
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Continue Shopping</button>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
import { Link } from 'react-router';
import './ShoppingCartModal.css';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
const ShoppingCartModal = ({ isOpen, onClose, children,itemCount,totalPrice = 0  }) => {


  const { handleCheckout } = useContext(AppContext);

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="shopping-cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <p>Shopping cart({ itemCount})</p>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {itemCount && 
          ( <><div className="modal-footer">
              <div className="modal-footer-texts">
                <p>Items subtotal</p>
                <p>Delivery</p>
                <strong>Total</strong>
              </div>
              
              <div className="modal-footer-prices">
                <p>${totalPrice}</p>
                <p>$5</p>
                <strong>${totalPrice+5}</strong>
              </div>
              
          </div>
          <div className="modal-checkout-button-container">

          <Link onClick={handleCheckout} to="/checkout" className="modal-checkout-button">Go to checkout</Link>
          </div>
          </>) 
        }
       
      </div>
    </div>
  );
};

export default ShoppingCartModal;
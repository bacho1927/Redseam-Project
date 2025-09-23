import './ShoppingCartModal.css';

const ShoppingCartModal = ({ isOpen, onClose, children,itemCount,totalPrice = 0  }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="shopping-cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Shopping cart({ itemCount})</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
            <div className="footer-total">
            
            <strong>Total ${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
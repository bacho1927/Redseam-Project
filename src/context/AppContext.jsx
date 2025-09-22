import React, { createContext, useState } from 'react';
import ShoppingCartModal from '../components/ShoppingCartModal'; // Make sure the path is correct

export const AppContext = createContext();

export function AppProvider({ children }) {
  
  const [user, setUser] = useState(null);

  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const addToCart = (product) => {
    
    setCartItems(prevItems => [...prevItems, product]);
    console.log(`${product.name} added to cart!`);
  };

  
  const value = {
    user,
    setUser,
    isCartOpen,
    openCart,
    closeCart,
    cartItems,
    addToCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      
      
      <ShoppingCartModal isOpen={isCartOpen} onClose={closeCart}>
        <h3>Your Cart</h3>
       
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ShoppingCartModal>
    </AppContext.Provider>
  );
}
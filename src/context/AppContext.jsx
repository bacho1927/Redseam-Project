import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  //this code adds items to cart
  const addToCart = (productToAdd) => {
    setCartItems(prevItems => {

      //if products matches eachother, only increase quantity 
      const existingItem = prevItems.find(item => item.id === productToAdd.id);

      if (existingItem) {
        
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        );
      }
      return [...prevItems, productToAdd];
    });
    
  };

  //this code is to increase quantity of item in cart
const increaseQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
//this code is to decrease quantity of item in cart
  const decreaseQuantity = (itemId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);

      
      if (existingItem?.quantity === 1) {
        return prevItems.filter(item => item.id !== itemId);
      }
      
      
      return prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeItem = (itemId) => {
  setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
};


  //this provides all the values to components
  const value = {
    user,
    setUser,
    isCartOpen,
    openCart,
    closeCart,
    cartItems,
    addToCart,
    increaseQuantity, 
    decreaseQuantity,
    removeItem,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
import { createContext, useCallback, useState } from "react";
import { useAuth } from "../features/auth/AuthContext";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const { AuthUser } = useAuth();


  // logout function
  const logout = useCallback(() => {
    setUser(null);
    setCartItems([]); // Clears the cart for the next user
  }, []);
  
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

  //this code posts all the cart items to api

  const handleCheckout = async () => {
    
    if (!AuthUser || !AuthUser.token) {
      alert("Authentication error: Please log in again.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await Promise.all(
        cartItems.map(async (item) => {
          const url = `https://api.redseam.redberryinternship.ge/api/cart/products/${item.id}`;
           
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
              'Authorization': `Bearer ${AuthUser.token}`, 
            },
           
            body: JSON.stringify({
              quantity: item.quantity,
              color:item.selectedColor,
              size:item.selectedSize
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to process item ${item.name}. Status: ${response.status}`);
          }
        })
        
      );

      closeCart(); 

    } catch (error) {
      console.error("Checkout failed:", error);
      alert(`Checkout failed: ${error.message}`);
    }
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
    logout,
    handleCheckout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
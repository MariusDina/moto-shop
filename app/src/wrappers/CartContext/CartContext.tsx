// CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface CartItem {
  brand: string;
  model: string;
  price: number;
  color: string;
  quickShifter: boolean;
  tire: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = 'cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart data from localStorage on component mount
    if (localStorage.getItem(CART_STORAGE_KEY)) {
      const storedCart = JSON.parse(
        localStorage.getItem(CART_STORAGE_KEY) || ''
      );
      console.log('Stored Cart:', storedCart); // Log stored cart data
      if (storedCart) {
        setCart(storedCart);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart data to localStorage whenever it changes
    if (cart.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      console.log('Updated Cart:', cart);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    setCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

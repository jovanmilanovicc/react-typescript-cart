import React, { ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShopingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  quantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShopingCartContext = React.createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShopingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shoping-cart',[]);
  const [isOpened, setIsOpened] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpened(true);
  const closeCart = () => setIsOpened(false);

  const quantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShopingCartContext.Provider
      value={{
        quantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpened}/>
    </ShopingCartContext.Provider>
  );
}

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Product } from "../models/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  productsAmount: number;
  addProductToCart: Function;
  removeProductFromCart: Function;
}
interface ProviderProps {
  children?: React.ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: ProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const productsAmount = useMemo(() => cart.length, [cart]);

  const addProductToCart = (newProduct: CartItem) => {
    const productIndexInCart = cart.findIndex(
      ({ product }) =>
        product.defaultPriceId === newProduct.product.defaultPriceId
    );
    if (productIndexInCart > -1) {
      const newCartItems = [...cart];
      newCartItems[productIndexInCart].quantity =
        newCartItems[productIndexInCart].quantity + 1;
      setCart(newCartItems);
    } else {
      setCart((previous) => [...previous, newProduct]);
    }
  };

  const removeProductFromCart = (removedProductId: string) => {
    const productIndexInCart = cart.findIndex(
      ({ product }) => product.id === removedProductId
    );
    if (cart[productIndexInCart].quantity === 1) {
      setCart((previous) =>
        previous.filter(({ product }) => product.id !== removedProductId)
      );
    } else {
      const newCart = [...cart];
      newCart[productIndexInCart].quantity =
        newCart[productIndexInCart].quantity - 1;
      setCart(newCart);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        productsAmount,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

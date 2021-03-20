import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      const storaged = JSON.parse(storagedCart);
      return storaged;
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const responseProducts = await api.get<Product[]>("/products");
      const responseStock = await api.get<Stock[]>("/stock");
      const addProductConst = responseProducts.data[productId];
      const finalData = {
        ...addProductConst,
        ...responseStock.data[productId],
      };

      if (finalData.amount <= 0 || finalData.amount < 1) {
        toast.error("Quantidade solicitada fora de estoque");
      }

      setCart([...cart, finalData]);

      localStorage.setItem(
        "@RocketShoes:cart",
        JSON.stringify([...cart, finalData])
      );
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {}
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const updateProduct = cart[productId];
      if (updateProduct.amount <= 0) {
        return;
      }
      if (updateProduct.amount < amount) {
        toast.error("Quantidade solicitada fora de estoque");
      }
      updateProduct.amount = amount;
      setCart([...cart]);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}

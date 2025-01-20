import React, { createContext, useState, useContext, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  profitMargin: number;
  sellingPrice: number;
  sold: boolean; // Novo campo para indicar se foi vendido
}

interface ProductContextData {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "sellingPrice" | "sold">) => void;
  toggleProductSold: (id: number) => void; // Função para alternar o estado "vendido"
}

const ProductContext = createContext<ProductContextData | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct(product: Omit<Product, "id" | "sellingPrice" | "sold">) {
    const sellingPrice = product.price + (product.price * product.profitMargin) / 100;

    const newProduct: Product = {
      ...product,
      id: Date.now(),
      sellingPrice,
      sold: false, // Definindo o produto como não vendido inicialmente
    };

    setProducts((prev) => [...prev, newProduct]);
  }

  // Função para alternar o estado "vendido"
  function toggleProductSold(id: number) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, sold: !product.sold } : product
      )
    );
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, toggleProductSold }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

import React, { createContext, useState, useContext, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
}

interface ProductContextData {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextData | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  function addProduct(product: Product) {
    const newProduct = {
      ...product,
      id: product.id ?? Date.now(), // Gera um ID único
    };
    setProducts((prev) => [...prev, newProduct]);
  }

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
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

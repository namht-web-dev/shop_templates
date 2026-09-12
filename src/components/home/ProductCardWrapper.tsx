"use client";

import { ProductCard } from "@/components/cards";
import { useAddToCart } from "@/hooks/useAddToCart";
import { Product } from "@/types"; // Giả định kiểu dữ liệu của bạn

interface Props {
  product: Product;
  link: string;
}

export function ProductCardWrapper({ product, link }: Props) {
  const addToCart = useAddToCart();

  return <ProductCard product={product} link={link} onAddToCart={addToCart} />;
}

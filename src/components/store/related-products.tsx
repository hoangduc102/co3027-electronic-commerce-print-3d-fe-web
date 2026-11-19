"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { productService } from "@/services/product.api";
import type { Product } from "@/schemas/product.schema";
import { formatPrice } from "@/lib/utils";

/** Dùng chung cache ["products"] với trang cửa hàng */
function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });
}

const productImage = (product: Product) =>
  product.images[0]?.url || "/placeholder.svg";

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
  maxItems?: number;
}

export function RelatedProducts({
  currentProductId,
  category,
  maxItems = 4,
}: Readonly<RelatedProductsProps>) {
  const { data: products = [] } = useProducts();

  const others = products.filter((p) => p.id !== currentProductId);
  const sameCategory = category
    ? others.filter((p) => p.tags.some((t) => t.name === category))
    : [];
  // Ưu tiên cùng danh mục, thiếu thì bù bằng sản phẩm khác
  const relatedProducts = [
    ...sameCategory,
    ...others.filter((p) => !sameCategory.includes(p)),
  ].slice(0, maxItems);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-12 border-t-2 border-foreground pt-8">
      <h2 className="text-2xl font-bold mb-6">Có thể bạn cũng thích</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/store/${product.id}`}
            className="group border-2 border-foreground bg-card hover:bg-secondary transition-colors"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={productImage(product)}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-primary font-bold">
                {formatPrice(product.basePrice)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Component cho "Sản phẩm thường mua cùng"
export function FrequentlyBoughtTogether({
  currentProductId,
  maxItems = 3,
}: Readonly<{
  currentProductId: string;
  maxItems?: number;
}>) {
  const { data: allProducts = [] } = useProducts();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Chỉ gợi ý sản phẩm có variant để có thể thêm vào giỏ
  const products = allProducts
    .filter((p) => p.id !== currentProductId && p.variants.length > 0)
    .slice(0, maxItems);

  const totalPrice = products.reduce((sum, p) => sum + p.basePrice, 0);

  const handleAddAll = () => {
    products.forEach((product) => {
      const variant = product.variants[0];
      addToCart({
        variantId: variant.id,
        name: product.name,
        image: productImage(product),
        price: variant.price ?? product.basePrice,
        quantity: 1,
        specs: {
          material: variant.material?.name ?? variant.name,
          color: variant.material?.color || "Theo vật liệu",
          size: "100%",
        },
      });
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (products.length === 0) return null;

  return (
    <section className="mt-8 border-2 border-foreground p-4 bg-secondary">
      <h3 className="font-bold mb-4">Thường mua cùng</h3>
      <div className="flex flex-wrap items-center gap-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-2xl text-muted-foreground">+</span>
            )}
            <Link
              href={`/store/${product.id}`}
              className="flex items-center gap-2 group"
            >
              <div className="w-16 h-16 relative border-2 border-foreground overflow-hidden">
                <Image
                  src={productImage(product)}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {product.name}
                </p>
                <p className="text-sm text-primary">
                  {formatPrice(product.basePrice)}
                </p>
              </div>
            </Link>
          </div>
        ))}
        <div className="flex items-center gap-3 ml-auto">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tổng cộng:</p>
            <p className="font-bold text-lg text-primary">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 border-2 border-foreground"
            onClick={handleAddAll}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Đã thêm!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Thêm tất cả
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

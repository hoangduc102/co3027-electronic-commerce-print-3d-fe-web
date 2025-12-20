"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MATERIALS } from "@/lib/constants";
import { Product } from "@/schemas/product.schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  const materialNames = product.variants
    .map((id) => MATERIALS.find((m) => m.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Link href={`/store/${product.id}`} className="group block">
      <div className="border-2 border-foreground bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-secondary">
          <Image
            src={product.images[0]?.url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
            In theo yêu cầu
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 border-t-2 border-foreground">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Từ</p>
              <p className="text-xl font-bold text-primary">
                {formatPrice(product.basePrice)}
              </p>
            </div>
            <div className="flex gap-1">
              {materialNames.map((name) => (
                <span
                  key={name}
                  className="text-xs px-2 py-1 bg-secondary border border-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

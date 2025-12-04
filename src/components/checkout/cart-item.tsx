"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  specs: {
    material: string;
    color: string;
    size: string;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({
  name,
  image,
  price,
  quantity,
  specs,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  return (
    <div className="flex gap-4 p-4 border-2 border-foreground bg-card">
      {/* Image */}
      <div className="w-24 h-24 border-2 border-foreground bg-secondary flex-shrink-0 relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold truncate">{name}</h3>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-1 mb-3">
          <span className="text-xs px-2 py-0.5 bg-secondary border border-foreground">
            {specs.material}
          </span>
          <span className="text-xs px-2 py-0.5 bg-secondary border border-foreground">
            {specs.size}
          </span>
          <span className="text-xs px-2 py-0.5 border border-foreground flex items-center gap-1">
            <span
              className="w-3 h-3 border border-foreground"
              style={{ backgroundColor: specs.color }}
            />
            Màu
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 border-foreground bg-transparent"
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 border-foreground bg-transparent"
              onClick={() => onUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <p className="font-bold text-primary">
            {formatPrice(price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query"; // Added
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  RotateCw,
  Check,
  Loader2,
} from "lucide-react";
import { MATERIALS } from "@/lib/constants";
import { ModelViewer } from "@/components/quote/model-viewer";
import {
  RelatedProducts,
  FrequentlyBoughtTogether,
} from "@/components/store/related-products";
import { WarrantyInfo } from "@/components/store/warranty-info";
import { useCart } from "@/contexts/CartContext";
import { productService } from "@/services/product.api";

export default function ProductDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = use(params);
  const { addToCart } = useCart();

  // 1. Fetching real data using the ID
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
  });

  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [customScale, setCustomScale] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [useCustomScale, setUseCustomScale] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // 3. Derived values based on the backend schema relations
  const materialInfo = useMemo(() => {
    // If you have a list of materials in your constants to match backend names
    return MATERIALS.find(
      (m) => m.name.toLowerCase() === selectedMaterial.toLowerCase()
    );
  }, [selectedMaterial]);

  // Handle price calculation (keeping your scale logic as requested)
  const calculatedPrice = product
    ? Math.round(product.basePrice * (customScale / 100) * quantity)
    : 0;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  // 4. Loading & Error States
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
        <Button
          asChild
          variant="outline"
          className="border-2 border-foreground"
        >
          <Link href="/store">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại cửa hàng
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Breadcrumb />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Images & 3D Viewer */}
            <div className="space-y-4">
              <div className="aspect-square border-2 border-foreground bg-secondary relative overflow-hidden">
                <Image
                  // FIXED: accessing .url property
                  src={product.images[0]?.url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="border-2 border-foreground">
                <div className="p-3 border-b-2 border-foreground bg-secondary flex items-center gap-2">
                  <RotateCw className="h-4 w-4" />
                  <span className="text-sm font-medium">Xem 360°</span>
                </div>
                <div className="aspect-video bg-background">
                  <ModelViewer />
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground border-0">
                In theo yêu cầu
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-8 p-4 bg-secondary border-2 border-foreground">
                <p className="text-sm text-muted-foreground mb-1">
                  Giá tính toán
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(calculatedPrice)}
                </p>
              </div>

              <div className="space-y-6">
                {/* Scale (since you don't have sizes yet) */}
                <div>
                  <Label className="font-bold mb-3 block">Tỉ lệ in (%)</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={customScale}
                      onChange={(e) =>
                        setCustomScale(Math.max(10, Number(e.target.value)))
                      }
                      className="w-24 border-2 border-foreground"
                    />
                  </div>
                </div>

                {/* Material Selection from Backend Variants */}
                <div>
                  <Label className="font-bold mb-3 block">
                    Vật liệu khả dụng
                  </Label>
                  <RadioGroup
                    value={selectedMaterial}
                    onValueChange={setSelectedMaterial}
                    className="flex flex-wrap gap-3"
                  >
                    {/* Extracting materials from your backend variants relation */}
                    {product.variants.map((v, idx) => (
                      <div key={idx}>
                        <RadioGroupItem
                          value={v.material?.name || ""}
                          id={`mat-${idx}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`mat-${idx}`}
                          className="flex items-center justify-center px-4 py-3 border-2 border-foreground cursor-pointer peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background hover:bg-secondary transition-colors"
                        >
                          {v.material?.name || "Tiêu chuẩn"}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Quantity */}
                <div>
                  <Label className="font-bold mb-3 block">Số lượng</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-10 w-10 border-2 border-foreground bg-transparent"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                      className="w-20 text-center border-2 border-foreground"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-10 w-10 border-2 border-foreground bg-transparent"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold gap-2 text-base"
                  onClick={() => {
                    addToCart({
                      productId: product.id,
                      name: product.name,
                      image: product.images[0]?.url || "/placeholder.svg",
                      price: calculatedPrice,
                      quantity: quantity,
                      specs: {
                        material: selectedMaterial || "Mặc định",
                        color: "Theo vật liệu",
                        size: `${customScale}%`,
                      },
                    });
                    setIsAdded(true);
                    setTimeout(() => setIsAdded(false), 2000);
                  }}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5" /> Đã thêm!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" /> Thêm vào giỏ hàng
                    </>
                  )}
                </Button>
              </div>

              {/* Material Info (from local constants) */}
              {materialInfo && (
                <div className="mt-8 p-4 border-2 border-foreground bg-card">
                  <h3 className="font-bold mb-2">Về {materialInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {materialInfo.description}
                  </p>
                </div>
              )}

              <div className="mt-8">
                <WarrantyInfo />
              </div>
            </div>
          </div>

          <FrequentlyBoughtTogether currentProductId={id} />

          {/* Mapping Category from Tags for Related Products */}
          <RelatedProducts
            currentProductId={id}
            category={product.tags[0]?.tag.name || "General"}
          />
        </div>
      </main>
    </div>
  );
}

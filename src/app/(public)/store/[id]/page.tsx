"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/lib/data";
import { MATERIALS } from "@/lib/constants";
import { ModelViewer } from "@/components/quote/model-viewer";
import {
  RelatedProducts,
  FrequentlyBoughtTogether,
} from "@/components/store/related-products";
import { WarrantyInfo } from "@/components/store/warranty-info";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = use(params);
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[1] || product?.sizes[0]
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    product?.materials[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [customScale, setCustomScale] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [useCustomScale, setUseCustomScale] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
            <Button
              asChild
              variant="outline"
              className="border-2 border-foreground bg-transparent"
            >
              <Link href="/store">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại cửa hàng
              </Link>
            </Button>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }

  const material = MATERIALS.find((m) => m.id === selectedMaterial);
  const scale = useCustomScale ? customScale : selectedSize?.scale || 100;
  const calculatedPrice = Math.round(
    product.basePrice * (scale / 100) * quantity
  );

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Images & 3D Viewer */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square border-2 border-foreground bg-secondary relative overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 3D Viewer */}
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

              {/* Price */}
              <div className="mb-8 p-4 bg-secondary border-2 border-foreground">
                <p className="text-sm text-muted-foreground mb-1">Giá từ</p>
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(calculatedPrice)}
                </p>
              </div>

              {/* Configuration */}
              <div className="space-y-6">
                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-bold">Kích thước</Label>
                    <button
                      onClick={() => setUseCustomScale(!useCustomScale)}
                      className="text-sm text-primary hover:underline"
                    >
                      {useCustomScale
                        ? "Chọn kích thước có sẵn"
                        : "Nhập kích thước tùy chỉnh"}
                    </button>
                  </div>

                  {useCustomScale ? (
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={customScale}
                        onChange={(e) =>
                          setCustomScale(Math.max(10, Number(e.target.value)))
                        }
                        className="w-24 border-2 border-foreground"
                        min={10}
                        max={300}
                      />
                      <span className="text-sm text-muted-foreground">
                        % so với kích thước gốc
                      </span>
                    </div>
                  ) : (
                    <RadioGroup
                      value={selectedSize?.name}
                      onValueChange={(value) => {
                        const size = product.sizes.find(
                          (s) => s.name === value
                        );
                        if (size) setSelectedSize(size);
                      }}
                      className="flex flex-wrap gap-3"
                    >
                      {product.sizes.map((size) => (
                        <div key={size.name}>
                          <RadioGroupItem
                            value={size.name}
                            id={size.name}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={size.name}
                            className="flex items-center justify-center px-4 py-3 border-2 border-foreground cursor-pointer peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background hover:bg-secondary transition-colors"
                          >
                            {size.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>

                {/* Material Selection */}
                <div>
                  <Label className="font-bold mb-3 block">Vật liệu</Label>
                  <RadioGroup
                    value={selectedMaterial}
                    onValueChange={setSelectedMaterial}
                    className="flex flex-wrap gap-3"
                  >
                    {product.materials.map((matId) => {
                      const mat = MATERIALS.find((m) => m.id === matId);
                      if (!mat) return null;
                      return (
                        <div key={matId}>
                          <RadioGroupItem
                            value={matId}
                            id={matId}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={matId}
                            className="flex flex-col items-center justify-center px-4 py-3 border-2 border-foreground cursor-pointer peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background hover:bg-secondary transition-colors min-w-20"
                          >
                            <span className="font-medium">{mat.name}</span>
                            <span className="text-xs opacity-70">
                              {formatPrice(mat.pricePerGram)}/g
                            </span>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                {/* Color Selection */}
                <div>
                  <Label className="font-bold mb-3 block">Màu sắc</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 border-2 transition-all ${
                          selectedColor === color
                            ? "border-primary ring-2 ring-primary/30 scale-110"
                            : "border-foreground hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
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
                      min={1}
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
                <div className="flex gap-4 pt-4">
                  <Button
                    className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-foreground font-semibold gap-2 text-base"
                    onClick={() => {
                      const materialName =
                        MATERIALS.find((m) => m.id === selectedMaterial)
                          ?.name || selectedMaterial;
                      const sizeName = useCustomScale
                        ? `${customScale}%`
                        : selectedSize?.name || "Mặc định";

                      addToCart({
                        productId: product.id,
                        name: product.name,
                        image: product.images[0] || "/placeholder.svg",
                        price: calculatedPrice,
                        quantity: quantity,
                        specs: {
                          material: materialName,
                          color: selectedColor,
                          size: sizeName,
                        },
                      });

                      // Hiển thị trạng thái đã thêm
                      setIsAdded(true);
                      setTimeout(() => setIsAdded(false), 2000);
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-5 w-5" />
                        Đã thêm vào giỏ!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Thêm vào giỏ hàng
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Material Info */}
              {material && (
                <div className="mt-8 p-4 border-2 border-foreground bg-card">
                  <h3 className="font-bold mb-2">
                    Về vật liệu {material.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {material.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {material.recommended.map((rec) => (
                      <span
                        key={rec}
                        className="text-xs px-2 py-1 bg-secondary border border-foreground"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Warranty Info */}
              <div className="mt-8">
                <WarrantyInfo />
              </div>
            </div>
          </div>

          {/* Frequently Bought Together */}
          <FrequentlyBoughtTogether currentProductId={id} />

          {/* Related Products */}
          <RelatedProducts currentProductId={id} category={product.category} />
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

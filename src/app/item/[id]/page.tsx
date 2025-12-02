// src/app/item/[id]/page.tsx – ĐÃ KẾT NỐI API THẬT
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, Package, Truck, Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { productService, Product } from "@/services/product.service";
import type { Review } from "@/services/product.service";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "materials">("specs");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, reviewData] = await Promise.all([
          productService.getById(params.id),
          productService.getReviews(params.id),
        ]);
        setProduct(productData);
        setReviews(reviewData);
      } catch (err: any) {
        setError("Không tải được sản phẩm. Vui lòng thử lại.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const prevImage = () => setSelectedImageIndex(prev => prev === 0 ? (product?.images.length || 1) - 1 : prev - 1);
  const nextImage = () => setSelectedImageIndex(prev => prev === (product?.images.length || 1) - 1 ? 0 : prev + 1);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      material: product.material || "PLA+",
      image: product.images[0],
    });
    alert("Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-xl">{error || "Sản phẩm không tồn tại"}</p>
        <Link href="/templates" className="text-green-600 underline mt-4 inline-block">
          ← Quay lại danh sách mẫu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-green-700">Trang chủ</Link> →
        <Link href="/templates" className="hover:text-green-700"> Mẫu thiết kế</Link> →
        <span className="text-green-700"> {product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden group">
            <Image
              src={product.images[selectedImageIndex] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-4 transition-all ${selectedImageIndex === i ? "border-green-600 shadow-lg" : "border-transparent hover:border-gray-300"}`}
                >
                  <Image src={img} alt="" width={150} height={150} className="object-contain p-4 bg-white" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating || "Chưa có"}</span>
                <span className="text-gray-600">({reviews.length} đánh giá)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-gray-600">Giá hiện tại:</span>
                <p className="font-semibold text-lg">{product.material || "PLA+"}</p>
              </div>
              <span className="text-3xl font-bold text-green-700">
                {product.price.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <p className="text-green-600 font-medium flex items-center gap-2">
              <Package className="w-5 h-5" /> Còn hàng
            </p>
          </div>

          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 border-2 border-green-600 text-green-600 font-bold py-4 rounded-full hover:bg-green-50 transition">
              Thêm vào giỏ
            </button>
            <button onClick={handleBuyNow} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full transition shadow-lg">
              Đặt in ngay
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="border-b border-gray-300">
          <div className="flex gap-10 text-lg font-medium">
            <button onClick={() => setActiveTab("specs")} className={activeTab === "specs" ? "py-4 border-b-4 border-green-600 text-green-600" : "py-4 text-gray-600 hover:text-green-600"}>
              Thông số
            </button>
            <button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "py-4 border-b-4 border-green-600 text-green-600" : "py-4 text-gray-600 hover:text-green-600"}>
              Đánh giá ({reviews.length})
            </button>
            <button onClick={() => setActiveTab("materials")} className={activeTab === "materials" ? "py-4 border-b-4 border-green-600 text-green-600" : "py-4 text-gray-600 hover:text-green-600"}>
              Vật liệu hỗ trợ
            </button>
          </div>
        </div>

        <div className="py-12">
          {activeTab === "specs" && (
            <div className="bg-white rounded-2xl p-10 shadow text-gray-700 whitespace-pre-line">
              {product.description || "Đang cập nhật thông số kỹ thuật..."}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
              ) : (
                reviews.map((r: any) => (
                  <div key={r.id} className="bg-white rounded-2xl p-8 shadow border">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                          {r.user?.username[0] || "A"}
                        </div>
                        <div>
                          <p className="font-semibold">{r.user?.username || "Khách"}</p>
                          <p className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString("vi-VN")}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{r.content}</p>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === "materials" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {product.variants && product.variants.length > 0 ? (
                product.variants.map((v) => (
                  <div key={v.id || v.material} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-700">
                      {v.material}
                    </div>
                    <h4 className="font-bold text-lg">{v.material}</h4>
                    <p className="text-green-600 font-medium mt-3">
                      {v.additionalPrice === 0 ? "Miễn phí" : `+${v.additionalPrice.toLocaleString()}đ`}
                    </p>
                    {v.inStock ? (
                      <div className="mt-4 flex justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                    ) : (
                      <p className="text-red-500 text-sm mt-2">Hết hàng</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  Chưa có thông tin vật liệu hỗ trợ.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
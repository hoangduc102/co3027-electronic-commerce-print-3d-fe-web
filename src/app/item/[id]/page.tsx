"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, Package, Truck, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "materials">("specs");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = {
    name: "Ốp điện thoại iPhone 15 Pro Max",
    price: 150000,
    rating: 4.8,
    reviewsCount: 128,
    material: "PLA+ Xanh nhạt",
    inStock: true,
  };

  const images = [
    "/61-4yFqPBDL._AC_SL1500_.jpg",
    "/61XnwtpYazL._AC_SL1500_.jpg",
    "/61KH2DdzhBL._AC_SL1500_.jpg",
    "/61PNwgoA+dL._AC_SL1500_.jpg",
  ];

  const reviews = [
    { name: "Nguyễn Đăng Anh", rating: 5, date: "15/03/2025", comment: "In cực đẹp, vừa khít iPhone 15, màu chuẩn như hình!" },
    { name: "Trần Nguyễn Ngọc Bích", rating: 4, date: "10/03/2025", comment: "Chất lượng tốt, giao hơi chậm." },
  ];

  const materials = [
    { name: "PLA", desc: "Thân thiện môi trường", price: 0 },
    { name: "PLA+", desc: "Độ bền cao hơn", price: 30000 },
    { name: "PETG", desc: "Chống nước, chịu lực", price: 50000 },
    { name: "ABS", desc: "Chịu nhiệt cao", price: 60000 },
    { name: "TPU", desc: "Dẻo, chống sốc", price: 80000 },
    { name: "ASA", desc: "Chống UV, ngoài trời", price: 90000 },
  ];

  const prevImage = () => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleAddToCart = () => {
    addToCart({
      id: params.id,
      name: product.name,
      price: product.price,
      material: product.material,
      image: images[0],
    });
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-green-700">Trang chủ</Link> →{" "}
        <Link href="/templates" className="hover:text-green-700">Mẫu thiết kế</Link> →{" "}
        <span className="text-green-700">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden group">
            <Image
              src={images[selectedImageIndex]}
              alt={`${product.name} - ảnh ${selectedImageIndex + 1}`}
              fill
              className="object-contain p-8"
              priority
            />

            {/* Nút chuyển ảnh */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`aspect-square rounded-xl overflow-hidden border-4 transition-all ${
                    selectedImageIndex === i
                      ? "border-green-600 shadow-lg"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    width={150}
                    height={150}
                    className="object-contain p-5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info + CTA */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviewsCount} đánh giá)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-gray-600">Chất liệu hiện tại:</span>
                <p className="font-semibold text-lg">{product.material}</p>
              </div>
              <span className="text-3xl font-bold text-green-700">
                {product.price.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <p className="text-green-600 font-medium flex items-center gap-2">
              <Package className="w-5 h-5" /> Còn hàng – Giao trong 2–4 ngày
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-green-600 text-green-600 font-bold py-4 rounded-full hover:bg-green-50 transition"
            >
              Thêm vào giỏ
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full transition shadow-lg"
            >
              Đặt in ngay
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Truck className="w-10 h-10 text-green-600" />
            <div>
              <p className="font-medium">Giao hàng toàn quốc</p>
              <p>Miễn phí đơn từ 500.000đ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Các Tab */}
      <div className="mt-20">
        <div className="border-b border-gray-300">
          <div className="flex gap-10 text-lg font-medium">
            <button
              onClick={() => setActiveTab("specs")}
              className={`py-4 px-1 border-b-4 transition ${activeTab === "specs" ? "border-green-600 text-green-600" : "border-transparent text-gray-600 hover:text-green-600"}`}
            >
              Thông số
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-4 transition ${activeTab === "reviews" ? "border-green-600 text-green-600" : "border-transparent text-gray-600 hover:text-green-600"}`}
            >
              Đánh giá ({product.reviewsCount})
            </button>
            <button
              onClick={() => setActiveTab("materials")}
              className={`py-4 px-1 border-b-4 transition ${activeTab === "materials" ? "border-green-600 text-green-600" : "border-transparent text-gray-600 hover:text-green-600"}`}
            >
              Vật liệu hỗ trợ
            </button>
          </div>
        </div>

        <div className="py-12">
          {activeTab === "specs" && (
            <div className="bg-white rounded-2xl p-10 shadow text-gray-500">
              <p>Đây là ốp lưng iPhone 15.</p>
              <p>Chỉ tương thích với iPhone 15 6.1 inch.</p>
              <p>Có các màu sắc: Light Blue, Light Pink, Black và Beige.</p>
              <p>Vật liệu hỗ trợ bao gồm: PLA, PLA+, PETG, ABS, TPU, ASA.</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow border">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-gray-500">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-5 h-5 ${j < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "materials" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {materials.map((m) => (
                <div key={m.name} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-700">
                    {m.name}
                  </div>
                  <h4 className="font-bold text-lg">{m.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{m.desc}</p>
                  <p className="text-green-600 font-medium mt-3">
                    {m.price === 0 ? "Miễn phí" : `+${m.price.toLocaleString()}đ`}
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
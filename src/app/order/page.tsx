"use client";

import { useState, useEffect, ChangeEvent, DragEvent } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

// --- Interface cho 1 sản phẩm (Dùng chung) ---
interface Product {
  name: string;
  image: string;
  material: string;
  color: string;
  quantity: number;
  price: number; // TỔNG GIÁ (đơn giá * số lượng)
}

// --- STYLING (Dùng chung) ---
const inputStyles =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";
const errorInputStyles =
  "w-full border border-red-500 rounded-md px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent";
const selectStyles = `${inputStyles} appearance-none`;
const buttonBaseStyles =
  "px-6 py-2 text-base rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
const primaryButtonStyles = `bg-green-600 hover:bg-green-700 text-white focus:ring-green-500`;
const outlineButtonStyles = `border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-green-500`;

// --- COMPONENT CHÍNH ĐIỀU HƯỚNG ỨNG DỤNG ---
export default function App() {
  // Chỉ quản lý 2 trang nội bộ này trong file hiện tại
  const [currentPage, setCurrentPage] = useState<"book-print" | "order">(
    "book-print"
  );

  const navigateTo = (page: string) => {
    setCurrentPage(page as "book-print" | "order");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hiển thị component con dựa trên state */}
      {currentPage === "book-print" && (
        <BookPrintView navigateTo={navigateTo} />
      )}
      {currentPage === "order" && <OrderView navigateTo={navigateTo} />}

      <Footer />
    </div>
  );
}

// =================================================================
// COMPONENT 1: TRANG ĐẶT IN (BookPrintView)
// =================================================================
function BookPrintView({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [material, setMaterial] = useState("PETG");
  const [color, setColor] = useState("Xanh lam");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [price, setPrice] = useState(200000);

  useEffect(() => {
    const basePrice = 100000;
    setPrice(basePrice * quantity);
  }, [quantity]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0)
      setFile(e.dataTransfer.files[0]);
  };

  const createProductData = async (): Promise<Product> => {
    let imageUrl = "https://placehold.co/100x100?text=3D+Model"; // Ảnh mặc định nếu không tải ảnh

    // Nếu có file và là file ảnh, chuyển sang Base64 để lưu trữ được
    if (file && file.type.startsWith("image/")) {
      try {
        imageUrl = await fileToBase64(file);
      } catch (err) {
        console.error("Lỗi chuyển đổi ảnh:", err);
      }
    } else if (file) {
      // Nếu là file 3D (stl, obj), dùng icon file làm ảnh đại diện
      imageUrl = "https://placehold.co/100x100?text=STL/OBJ";
    }

    return {
      name: file?.name || "Đặt in theo mẫu",
      image: imageUrl, // Sử dụng ảnh đã xử lý
      material: material,
      color: color,
      quantity: quantity,
      price: price,
    };
  };

  const handleAddToCart = async () => {
    const product = await createProductData();
    const cartString = localStorage.getItem("shoppingCart");
    let cart = cartString ? JSON.parse(cartString) : [];
    cart.push(product);
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  const handleGoToPayment = async () => {
    try {
      const product = await createProductData();
      const checkoutData = {
        products: [product],
        shippingFee: 50000,
        tax: 15000,
      };
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      navigateTo("order");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <main className="w-full grow p-4 flex justify-center">
      <div className="w-full max-w-3xl py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Đặt in theo mẫu của bạn
        </h1>
        {/* <p className="text-lg text-gray-600 mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit at cupiditate consectetur incidunt eius.
        </p> */}

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            3D model file (.stl, .obj) or Image (.png, .jpg)
          </h2>
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer
                        ${isDragging ? "bg-green-50 border-green-500" : "bg-gray-50 hover:bg-gray-100"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileUploadInput")?.click()}
          >
            <input
              type="file"
              id="fileUploadInput"
              className="hidden"
              accept=".stl,.obj,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 24l-4.172-4.172a4 4 0 00-5.656 0L18 24m14 0l-4 4m-10-4l-4-4"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 32h12M30 20h4v4h-4z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#34D399"
              />
              <path
                d="M24 12l-4 4h8l-4-4zM20 16h8v4h-8z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#34D399"
              />
            </svg>
            <span className="mt-2 block font-semibold text-gray-700">
              {file ? file.name : "Nhấn để tải lên"}
            </span>
            <p className="text-sm text-gray-500">hoặc kéo và thả file</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Tùy chọn in
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chất liệu
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className={selectStyles}
              >
                <option value="PETG">PETG</option>
                <option value="PLA">PLA</option>
                <option value="ABS">ABS</option>
                <option value="Resin">Resin</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Màu sắc
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={selectStyles}
              >
                <option value="Xanh lam">Xanh lam</option>
                <option value="Đỏ">Đỏ</option>
                <option value="Đen">Đen</option>
                <option value="Trắng">Trắng</option>
                <option value="Trong suốt">Trong suốt</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số lượng
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className={inputStyles}
                min="1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputStyles} h-32`}
              placeholder="Ghi chú thêm (ví dụ: in rỗng 20%,...)"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-6">
          <div>
            <p className="text-sm text-gray-600">Giá tiền</p>
            <p className="text-2xl font-bold text-green-600">
              {price.toLocaleString("vi-VN")} đ
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`${buttonBaseStyles} ${outlineButtonStyles}`}
          >
            Thêm vào giỏ
          </button>
          <button
            type="button"
            onClick={handleGoToPayment}
            className={`${buttonBaseStyles} ${primaryButtonStyles}`}
          >
            Đến trang thanh toán
          </button>
        </div>
      </div>
    </main>
  );
}

// =================================================================
// COMPONENT 2: TRANG HOÀN TẤT ĐƠN HÀNG (OrderView)
// =================================================================
function OrderView({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [productsTotal, setProductsTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState("Nhập email của bạn");
  const [phone, setPhone] = useState("Nhập số điện thoại của bạn");
  const [paymentMethod, setPaymentMethod] = useState("Chuyển khoản ngân hàng");
  const [city, setCity] = useState("Tp Hồ Chí Minh");
  const [address, setAddress] = useState("Trường Đại học Bách Khoa");
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    address?: string;
  }>({});

  useEffect(() => {
    const checkoutDataString = localStorage.getItem("checkoutData");
    if (checkoutDataString) {
      try {
        const checkoutData = JSON.parse(checkoutDataString);
        if (
          checkoutData.products &&
          Array.isArray(checkoutData.products) &&
          checkoutData.products.length > 0
        ) {
          setProducts(checkoutData.products);
          setShippingFee(checkoutData.shippingFee || 50000);
          setTax(checkoutData.tax || 15000);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Không thể đọc dữ liệu checkout:", error);
      }
    } else {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    if (products) {
      const newProductsTotal = products.reduce(
        (sum, product) => sum + (product.price || 0),
        0
      );
      const newTotal = newProductsTotal + shippingFee + tax;
      setProductsTotal(newProductsTotal);
      setTotal(newTotal);
    }
  }, [products, shippingFee, tax]);

  const handleOrder = () => {
    const newErrors: { email?: string; phone?: string; address?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = "Email là bắt buộc";
    else if (!emailRegex.test(email)) newErrors.email = "Email không hợp lệ";
    if (!phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc";
    if (!address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // -----------------------------------------------------
      // LOGIC ĐIỀU HƯỚNG MỚI THEO YÊU CẦU
      // -----------------------------------------------------

      // Xóa dữ liệu checkout sau khi đặt thành công (tuỳ chọn, có thể để trang đích xoá)
      localStorage.removeItem("checkoutData");

      if (paymentMethod === "Thanh toán khi nhận hàng") {
        // Điều hướng sang trang Result (file riêng)
        window.location.href = "/result";
      } else {
        // Điều hướng sang trang Shipment (file riêng)
        window.location.href = "/shipment";
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
  };

  if (products === null) {
    return (
      <main className="w-full grow p-4 flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Đang tải dữ liệu đơn hàng...
        </h1>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="w-full grow p-4 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            Không có sản phẩm nào để thanh toán.
          </h1>
          <button
            onClick={() => navigateTo("book-print")}
            className={`${buttonBaseStyles} ${primaryButtonStyles} mt-4`}
          >
            Quay lại trang Đặt in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full grow p-4 flex justify-center">
      <div className="w-full max-w-3xl py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          Hoàn tất đơn hàng
        </h1>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Đơn hàng</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {products.map((product, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-5 ${index < products.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded border border-gray-200"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Chất liệu: {product.material}
                  </p>
                  <p className="text-sm text-gray-600">
                    Màu sắc: {product.color}
                  </p>
                  <p className="text-sm text-gray-600">
                    Số lượng: {product.quantity}
                  </p>
                </div>
                <p className="font-semibold text-lg text-gray-900 whitespace-nowrap">
                  {product.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
            ))}
            <div className="p-5 space-y-2 text-gray-700 bg-gray-50">
              <div className="flex justify-between">
                <span>Tổng giá sản phẩm</span>
                <span className="text-gray-900 font-medium">
                  {productsTotal.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span className="text-gray-900 font-medium">
                  {shippingFee.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="flex justify-between pb-3">
                <span>Thuế</span>
                <span className="text-gray-900 font-medium">
                  {tax.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-xl">
                <span>Tổng cộng</span>
                <span className="text-green-600">
                  {total.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Thông tin thanh toán
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className={errors.email ? errorInputStyles : inputStyles}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={phone}
                onChange={handlePhoneChange}
                className={errors.phone ? errorInputStyles : inputStyles}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hình thức thanh toán
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className={selectStyles}
              >
                <option value="Chuyển khoản ngân hàng">
                  Chuyển khoản ngân hàng
                </option>
                <option value="Thanh toán khi nhận hàng">
                  Thanh toán khi nhận hàng
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thành phố
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={selectStyles}
              >
                <option value="Tp Hồ Chí Minh">Tp Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={handleAddressChange}
                className={errors.address ? errorInputStyles : inputStyles}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-8 gap-4">
            <button
              type="button"
              onClick={() => navigateTo("book-print")}
              className={`${buttonBaseStyles} ${outlineButtonStyles}`}
            >
              Trở lại
            </button>
            <button
              type="button"
              onClick={handleOrder}
              className={`${buttonBaseStyles} ${primaryButtonStyles}`}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

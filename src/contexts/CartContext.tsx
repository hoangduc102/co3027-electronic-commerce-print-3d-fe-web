"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

// Định nghĩa interface cho item trong giỏ hàng
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  specs: {
    material: string;
    color: string;
    size: string;
  };
}

// Interface cho context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Key để lưu giỏ hàng vào localStorage
const CART_STORAGE_KEY = "print3d-cart";

// Hàm helper để lưu giỏ hàng vào localStorage
const saveCartToStorage = (cart: CartItem[]): void => {
  if (globalThis.window === undefined) return;
  try {
    globalThis.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Lỗi khi lưu giỏ hàng vào localStorage:", error);
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Khởi tạo state rỗng để tránh hydration mismatch
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load giỏ hàng từ localStorage sau khi hydration hoàn tất
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Lỗi khi đọc giỏ hàng từ localStorage:", error);
      }
      setIsHydrated(true);
    };

    // Sử dụng requestAnimationFrame để tránh cascading renders
    const frameId = requestAnimationFrame(loadCart);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Lưu giỏ hàng vào localStorage khi thay đổi (chỉ sau khi hydrated)
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(cart);
    }
  }, [cart, isHydrated]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = useCallback((item: Omit<CartItem, "id">) => {
    setCart((prevCart) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa (cùng productId và specs)
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.specs.material === item.specs.material &&
          cartItem.specs.color === item.specs.color &&
          cartItem.specs.size === item.specs.size
      );

      if (existingItemIndex > -1) {
        // Nếu đã có, cập nhật số lượng
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + item.quantity,
        };
        return updatedCart;
      } else {
        // Nếu chưa có, thêm mới với id unique
        const newItem: CartItem = {
          ...item,
          id: `${item.productId}`,
        };
        return [...prevCart, newItem];
      }
    });
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  // Cập nhật số lượng sản phẩm
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  // Xóa toàn bộ giỏ hàng
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Tính tổng tiền giỏ hàng
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  // Lấy tổng số lượng sản phẩm trong giỏ hàng
  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook để sử dụng CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return context;
};

import type { Product } from "./types";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Tượng Rồng Phong Thủy",
    description:
      "Tượng rồng trang trí phong thủy, chi tiết cao, in bằng Resin. Phù hợp để bàn làm việc hoặc trang trí phòng khách.",
    category: "decor",
    images: ["/dragon-statue-3d-printed-gold.jpg"],
    basePrice: 350000,
    sizes: [
      { name: "Nhỏ (10cm)", scale: 50 },
      { name: "Vừa (15cm)", scale: 75 },
      { name: "Lớn (20cm)", scale: 100 },
    ],
    materials: ["resin-standard", "pla"],
    colors: ["#FFD700", "#C0C0C0", "#000000"],
  },
  {
    id: "2",
    name: "Núm vặn tủ bếp Hexagon",
    description:
      "Bộ núm vặn tủ bếp hình lục giác hiện đại. In bằng PETG chịu lực tốt, có thể tùy chỉnh màu sắc.",
    category: "parts",
    images: ["/hexagon-cabinet-knobs-modern-3d-printed.jpg"],
    basePrice: 25000,
    sizes: [
      { name: "25mm", scale: 80 },
      { name: "30mm", scale: 100 },
      { name: "35mm", scale: 120 },
    ],
    materials: ["petg", "pla"],
    colors: ["#000000", "#FFFFFF", "#808080", "#FFD700"],
  },
  {
    id: "3",
    name: "Figure Chibi Anime",
    description:
      "Figure chibi nhân vật anime phong cách dễ thương. In Resin siêu mịn, sơn màu theo yêu cầu.",
    category: "figures",
    images: ["/chibi-anime-figure-3d-printed-colorful.jpg"],
    basePrice: 180000,
    sizes: [
      { name: "5cm", scale: 50 },
      { name: "8cm", scale: 80 },
      { name: "12cm", scale: 100 },
    ],
    materials: ["resin-standard"],
    colors: ["#FFFFFF"],
  },
  {
    id: "4",
    name: "Hộp đựng bút Minimalist",
    description:
      "Hộp đựng bút thiết kế tối giản, nhiều ngăn tiện dụng. In PLA thân thiện môi trường.",
    category: "decor",
    images: ["/minimalist-pen-holder-3d-printed-white.jpg"],
    basePrice: 85000,
    sizes: [
      { name: "Nhỏ", scale: 70 },
      { name: "Vừa", scale: 100 },
      { name: "Lớn", scale: 130 },
    ],
    materials: ["pla", "petg"],
    colors: ["#FFFFFF", "#000000", "#F5F5DC", "#87CEEB"],
  },
  {
    id: "5",
    name: "Móc khóa Robot",
    description:
      "Móc khóa hình robot dễ thương, có thể cử động khớp. In TPU dẻo, không sợ rơi vỡ.",
    category: "toys",
    images: ["/robot-keychain-3d-printed-colorful-flexible.jpg"],
    basePrice: 45000,
    sizes: [
      { name: "4cm", scale: 80 },
      { name: "5cm", scale: 100 },
    ],
    materials: ["tpu", "pla"],
    colors: ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"],
  },
  {
    id: "6",
    name: "Chậu cây Geometric",
    description:
      "Chậu cây hình học đa diện, thiết kế độc đáo. In PETG chịu nước, có lỗ thoát nước.",
    category: "decor",
    images: ["/geometric-planter-pot-3d-printed-terracotta.jpg"],
    basePrice: 120000,
    sizes: [
      { name: "8cm", scale: 70 },
      { name: "12cm", scale: 100 },
      { name: "15cm", scale: 130 },
    ],
    materials: ["petg", "pla"],
    colors: ["#D2691E", "#FFFFFF", "#000000", "#808080"],
  },
  {
    id: "7",
    name: "Giá đỡ điện thoại",
    description:
      "Giá đỡ điện thoại đa năng, có thể điều chỉnh góc nghiêng. Thiết kế chắc chắn, phù hợp mọi loại điện thoại.",
    category: "tools",
    images: ["/phone-stand-holder-3d-printed-adjustable.jpg"],
    basePrice: 65000,
    sizes: [
      { name: "Tiêu chuẩn", scale: 100 },
      { name: "Lớn (Tablet)", scale: 150 },
    ],
    materials: ["petg", "pla", "abs"],
    colors: ["#000000", "#FFFFFF", "#808080"],
  },
  {
    id: "8",
    name: "Mask Samurai",
    description:
      "Mặt nạ Samurai trang trí tường, chi tiết cao. In PLA sau đó xử lý bề mặt và sơn.",
    category: "decor",
    images: ["/samurai-mask-wall-decor-3d-printed-gold-black.jpg"],
    basePrice: 450000,
    sizes: [
      { name: "15cm", scale: 60 },
      { name: "20cm", scale: 80 },
      { name: "30cm", scale: 100 },
    ],
    materials: ["pla", "resin-standard"],
    colors: ["#000000", "#FFD700", "#8B0000"],
  },
];

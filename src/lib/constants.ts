import type { Material } from "./types";

export const SUPPORTED_FILE_TYPES = [".stl", ".obj", ".step", ".3mf"];

export const TECHNOLOGIES = [
  { id: "FDM", name: "FDM (Nhựa dây)", description: "Phổ biến, giá rẻ" },
  { id: "SLA", name: "SLA (Resin lỏng)", description: "Chi tiết cao, mịn" },
  { id: "SLS", name: "SLS (Bột)", description: "Bền, không cần support" },
] as const;

export const MATERIALS: Material[] = [
  {
    id: "pla",
    name: "PLA",
    technology: "FDM",
    colors: [
      "#FFFFFF",
      "#000000",
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF6B00",
      "#808080",
    ],
    pricePerGram: 500,
    properties: { strength: 3, flexibility: 1, heatResistance: 2, detail: 3 },
    description:
      "Nhựa sinh học, dễ in, bề mặt đẹp. Phù hợp cho mô hình trưng bày.",
    recommended: ["Mô hình", "Prototype", "Decor"],
  },
  {
    id: "petg",
    name: "PETG",
    technology: "FDM",
    colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#00FF00"],
    pricePerGram: 600,
    properties: { strength: 4, flexibility: 2, heatResistance: 3, detail: 3 },
    description: "Bền, chịu nước, chịu va đập. Phù hợp cho sản phẩm chức năng.",
    recommended: ["Phụ tùng", "Hộp đựng", "Đồ dùng ngoài trời"],
  },
  {
    id: "abs",
    name: "ABS",
    technology: "FDM",
    colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF"],
    pricePerGram: 550,
    properties: { strength: 4, flexibility: 2, heatResistance: 5, detail: 2 },
    description:
      "Chịu nhiệt cao, bền. Phù hợp cho phụ tùng ô tô, thiết bị điện.",
    recommended: ["Phụ tùng ô tô", "Thiết bị điện", "Đồ chịu nhiệt"],
  },
  {
    id: "tpu",
    name: "TPU",
    technology: "FDM",
    colors: ["#FFFFFF", "#000000", "#FF0000"],
    pricePerGram: 800,
    properties: { strength: 3, flexibility: 5, heatResistance: 3, detail: 2 },
    description:
      "Dẻo, đàn hồi như cao su. Phù hợp cho vỏ bảo vệ, đế giảm chấn.",
    recommended: ["Vỏ điện thoại", "Đế chống rung", "Bánh xe"],
  },
  {
    id: "resin-standard",
    name: "Resin Standard",
    technology: "SLA",
    colors: ["#F5F5F5", "#808080", "#000000"],
    pricePerGram: 1200,
    properties: { strength: 3, flexibility: 1, heatResistance: 2, detail: 5 },
    description:
      "Độ chi tiết cực cao, bề mặt mịn. Phù hợp cho figure, trang sức.",
    recommended: ["Figure", "Trang sức", "Nha khoa"],
  },
];

export const INFILL_OPTIONS = [
  { value: 20, label: "20% - Tiêu chuẩn", description: "Nhẹ, tiết kiệm" },
  { value: 50, label: "50% - Bền", description: "Cân bằng" },
  { value: 100, label: "100% - Đặc", description: "Chắc nhất" },
];

export const LAYER_HEIGHT_OPTIONS = [
  { value: 0.1, label: "0.1mm - Mịn", description: "Chi tiết cao, in lâu" },
  { value: 0.2, label: "0.2mm - Thường", description: "Cân bằng" },
  { value: 0.3, label: "0.3mm - Thô", description: "In nhanh" },
];

export const ORDER_STATUSES = {
  received: { label: "Đã tiếp nhận", description: "File đã lên hệ thống" },
  reviewing: {
    label: "Đang kiểm tra",
    description: "Kỹ thuật viên đang check lỗi file",
  },
  printing: { label: "Đang in", description: "File đang chạy trên máy" },
  "post-processing": {
    label: "Xử lý nguội",
    description: "Gỡ support, đánh nhám",
  },
  shipping: {
    label: "Đang giao hàng",
    description: "Đã bàn giao cho đơn vị vận chuyển",
  },
  delivered: { label: "Đã giao", description: "Hoàn thành" },
};

export const PRODUCT_CATEGORIES = [
  { id: "decor", name: "Decor & Trang trí", icon: "🏠" },
  { id: "parts", name: "Phụ tùng thay thế", icon: "🔧" },
  { id: "figures", name: "Figure & Mô hình", icon: "🎨" },
  { id: "toys", name: "Đồ chơi", icon: "🎮" },
  { id: "tools", name: "Dụng cụ", icon: "🛠️" },
];

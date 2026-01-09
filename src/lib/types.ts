export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  dimensions?: {
    x: number;
    y: number;
    z: number;
  };
  volume?: number;
  isManifold?: boolean;
  thumbnail?: string;
}

export interface PrintConfig {
  technology: "FDM" | "SLA" | "SLS";
  material: string;
  color: string;
  infill: number;
  layerHeight: number;
  quantity: number;
  scale: number;
}

export interface PriceBreakdown {
  setupFee: number;
  materialCost: number;
  printTimeCost: number;
  total: number;
  estimatedTime: string;
}

export interface Material {
  id: string;
  name: string;
  technology: "FDM" | "SLA" | "SLS";
  colors: string[];
  pricePerGram: number;
  properties: {
    strength: number;
    flexibility: number;
    heatResistance: number;
    detail: number;
  };
  description: string;
  recommended: string[];
}

export interface OrderStatus {
  id: string;
  status:
    | "received"
    | "reviewing"
    | "printing"
    | "post-processing"
    | "shipping"
    | "delivered";
  updatedAt: Date;
  message?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  shippingAddress: string;
  technicalNotes?: string;
}

export interface OrderItem {
  file: UploadedFile;
  config: PrintConfig;
  price: PriceBreakdown;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  basePrice: number;
  sizes: { name: string; scale: number }[];
  materials: string[];
  colors: string[];
}

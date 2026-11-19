export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  /** Object URL để xem trước mô hình 3D */
  url: string;
  /** File gốc — upload lên server khi đặt in */
  file: File;
  /** Kích thước bao (mm) do backend đọc từ file */
  dimensions?: {
    x: number;
    y: number;
    z: number;
  };
  /** Thể tích (cm³) */
  volume?: number;
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

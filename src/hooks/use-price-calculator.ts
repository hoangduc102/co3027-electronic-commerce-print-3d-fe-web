"use client";

import { useMemo } from "react";
import type { PrintConfig, PriceBreakdown, UploadedFile } from "@/lib/types";
import { MATERIALS } from "@/lib/constants";

const SETUP_FEE = 20000; // VND
const PRINT_TIME_RATE = 5000; // VND per hour
const DENSITY = 1.25; // g/cm³ (xấp xỉ PLA)

const EMPTY_PRICE: PriceBreakdown = {
  setupFee: 0,
  materialCost: 0,
  printTimeCost: 0,
  total: 0,
  estimatedTime: "0 giờ",
};

/**
 * Tính giá in cho 1 file với cấu hình cho trước.
 * Hàm thuần — dùng được cả trong component lẫn khi tính tổng nhiều file.
 */
export function calculatePrice(
  file: UploadedFile | null,
  config: PrintConfig
): PriceBreakdown {
  if (!file?.volume) return EMPTY_PRICE;

  const material = MATERIALS.find((m) => m.id === config.material);
  if (!material) {
    return {
      ...EMPTY_PRICE,
      setupFee: SETUP_FEE,
      total: SETUP_FEE * config.quantity,
      estimatedTime: "N/A",
    };
  }

  const scaleFactor = config.scale / 100;
  const scaledVolume = file.volume * Math.pow(scaleFactor, 3);

  const weight = scaledVolume * DENSITY * (config.infill / 100);
  const materialCost = weight * material.pricePerGram;

  const layerHeightFactor = 0.2 / config.layerHeight;
  const printTime = scaledVolume * 0.5 * layerHeightFactor; // giờ
  const printTimeCost = printTime * PRINT_TIME_RATE;

  const total = (SETUP_FEE + materialCost + printTimeCost) * config.quantity;

  return {
    setupFee: SETUP_FEE,
    materialCost: Math.round(materialCost),
    printTimeCost: Math.round(printTimeCost),
    total: Math.round(total),
    estimatedTime: printTime < 1 ? "< 1 giờ" : `${Math.ceil(printTime)} giờ`,
  };
}

export function usePriceCalculator(
  file: UploadedFile | null,
  config: PrintConfig
): PriceBreakdown {
  return useMemo(() => calculatePrice(file, config), [file, config]);
}

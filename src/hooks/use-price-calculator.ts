"use client";

import { useMemo } from "react";
import type { PrintConfig, PriceBreakdown, UploadedFile } from "@/lib/types";
import { MATERIALS } from "@/lib/constants";

const SETUP_FEE = 20000; // VND
const PRINT_TIME_RATE = 5000; // VND per hour

export function usePriceCalculator(
  file: UploadedFile | null,
  config: PrintConfig
): PriceBreakdown {
  return useMemo(() => {
    if (!file || !file.volume) {
      return {
        setupFee: 0,
        materialCost: 0,
        printTimeCost: 0,
        total: 0,
        estimatedTime: "0 giờ",
      };
    }

    const material = MATERIALS.find((m) => m.id === config.material);
    if (!material) {
      return {
        setupFee: SETUP_FEE,
        materialCost: 0,
        printTimeCost: 0,
        total: SETUP_FEE,
        estimatedTime: "N/A",
      };
    }

    // Calculate scaled volume
    const scaleFactor = config.scale / 100;
    const scaledVolume = file.volume * Math.pow(scaleFactor, 3);

    // Calculate material weight (approximate density)
    const density = 1.25; // g/cm³ for PLA-like materials
    const weight = scaledVolume * density * (config.infill / 100);

    // Material cost
    const materialCost = weight * material.pricePerGram;

    // Print time estimation (rough)
    const layerHeightFactor = 0.2 / config.layerHeight;
    const baseTime = scaledVolume * 0.5; // base hours per cm³
    const printTime = baseTime * layerHeightFactor;
    const printTimeCost = printTime * PRINT_TIME_RATE;

    // Total
    const subtotal = SETUP_FEE + materialCost + printTimeCost;
    const total = subtotal * config.quantity;

    // Format time
    const hours = Math.ceil(printTime);
    const estimatedTime = hours < 1 ? "< 1 giờ" : `${hours} giờ`;

    return {
      setupFee: SETUP_FEE,
      materialCost: Math.round(materialCost),
      printTimeCost: Math.round(printTimeCost),
      total: Math.round(total),
      estimatedTime,
    };
  }, [file, config]);
}

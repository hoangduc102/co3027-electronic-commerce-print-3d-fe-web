import type { PrintFile } from "@/types/print-file.types";
import { httpClient } from "./httpClient";

/** Kích thước mô hình do backend đọc từ file STL (mm, mm³) */
export type ModelSize = {
  volume: number;
  width: number;
  depth: number;
  height: number;
  unit: "mm";
};

function toFormData(file: File) {
  const form = new FormData();
  form.append("file", file);
  return form;
}

/** Tính kích thước/thể tích, backend không lưu file */
export async function calculateModelSize(file: File): Promise<ModelSize> {
  const res = await httpClient.post<{ data: ModelSize }>(
    "/print-files/calculate-size",
    toFormData(file)
  );
  return res.data;
}

/** Upload và lưu file in lên server */
export async function uploadPrintFile(file: File): Promise<PrintFile> {
  const res = await httpClient.post<{ data: PrintFile }>(
    "/print-files",
    toFormData(file)
  );
  return res.data;
}

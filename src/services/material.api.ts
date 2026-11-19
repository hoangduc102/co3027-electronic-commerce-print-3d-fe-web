import { httpClient } from "./httpClient";

/** Vật liệu trong DB backend (khác MATERIALS hiển thị ở FE) */
export type BackendMaterial = {
  id: string;
  name: string;
  color: string | null;
  density: number | null;
  pricePerMm3: number | null;
  priceFactor: number | null;
};

export async function getMaterials(): Promise<BackendMaterial[]> {
  const res = await httpClient.get<{ data: BackendMaterial[] }>("/materials");
  return res.data;
}

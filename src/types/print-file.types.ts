export type PrintFile = {
  id: string;
  productId: string | null;
  url: string;
  type: string;
  volume: number | null;
  height: number | null;
  width: number | null;
  depth: number | null;
  createdAt: string;
  product?: ProductMinimal | null;
};
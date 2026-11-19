"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { productService } from "@/services/product.api";

const printFileKeys = {
  mine: (userId?: string) => ["print-files", userId] as const,
};

/**
 * "Thư viện file" = các sản phẩm in theo yêu cầu mà người dùng tạo từ trang báo giá
 * (backend lưu PrintFile gắn với Product của chính người dùng).
 */
export function useMyPrintFiles() {
  const { user } = useAuth();
  return useQuery({
    queryKey: printFileKeys.mine(user?.id),
    queryFn: async () => {
      const products = await productService.getByUser(user!.id);
      return products.filter((p) => !!p.printFile);
    },
    enabled: !!user,
  });
}

export function useDeletePrintFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => productService.remove(productId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["print-files"] });
    },
  });
}

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, getMyOrders, getOrder } from "@/services/order.api";
import { useAuth } from "@/contexts/AuthContext";

export const orderKeys = {
  all: (userId?: string) => ["orders", userId] as const,
  detail: (id: string) => ["order", id] as const,
};

export function useMyOrders() {
  const { user } = useAuth();
  return useQuery({
    queryKey: orderKeys.all(user?.id),
    queryFn: () => getMyOrders(),
    enabled: !!user,
  });
}

export function useOrder(id: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrder(id),
    enabled: !!user && !!id,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (order) => {
      queryClient.setQueryData(orderKeys.detail(order.id), order);
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

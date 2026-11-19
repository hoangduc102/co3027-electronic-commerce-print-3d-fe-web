"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import {
  verifyVnPayReturn,
  type VnPayReturnResult,
} from "@/services/payment.api";

type State =
  | { status: "verifying" }
  | { status: "done"; result: VnPayReturnResult }
  | { status: "error"; message: string };

/** VNPay chuyển trình duyệt về đây kèm query string có chữ ký */
function VnPayReturnContent() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { clearCart } = useCart();

  const query = searchParams.toString();
  const hasSignature = query.includes("vnp_SecureHash");

  // Xác thực đúng 1 lần cho mỗi query string (không retry, không refetch)
  const verify = useQuery({
    queryKey: ["vnpay-return", query],
    queryFn: () => verifyVnPayReturn(query),
    enabled: hasSignature,
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const result = verify.data;
    if (!result) return;
    if (result.success) clearCart();
    void queryClient.invalidateQueries({ queryKey: ["orders"] });
    if (result.orderId) {
      void queryClient.invalidateQueries({
        queryKey: ["order", result.orderId],
      });
    }
  }, [verify.data, clearCart, queryClient]);

  const state: State = !hasSignature
    ? { status: "error", message: "Thiếu thông tin giao dịch" }
    : verify.isError
      ? {
          status: "error",
          message:
            (verify.error as Error)?.message || "Không xác thực được giao dịch",
        }
      : verify.data
        ? { status: "done", result: verify.data }
        : { status: "verifying" };

  if (state.status === "verifying") {
    return (
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <p className="mt-4 text-muted-foreground">
          Đang xác nhận thanh toán...
        </p>
      </div>
    );
  }

  const success = state.status === "done" && state.result.success;
  const orderId = state.status === "done" ? state.result.orderId : null;

  return (
    <div className="w-full max-w-md border-2 border-foreground bg-card p-8 text-center">
      {success ? (
        <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto mb-4" />
      ) : (
        <XCircle className="h-14 w-14 text-red-600 mx-auto mb-4" />
      )}
      <h1 className="text-2xl font-bold mb-2">
        {success ? "Thanh toán thành công" : "Thanh toán chưa hoàn tất"}
      </h1>
      <p className="text-muted-foreground mb-6">
        {state.status === "error"
          ? state.message
          : success
            ? "Đơn hàng của bạn đã được xác nhận và sẽ sớm được đưa vào sản xuất."
            : `Giao dịch không thành công (mã ${state.result.responseCode}). Bạn có thể thanh toán lại trong trang chi tiết đơn hàng.`}
      </p>
      <div className="flex flex-col gap-2">
        {orderId && (
          <Button asChild className="border-2 border-foreground">
            <Link href={`/dashboard/orders/${orderId}`}>Xem đơn hàng</Link>
          </Button>
        )}
        <Button
          asChild
          variant="outline"
          className="border-2 border-foreground bg-transparent"
        >
          <Link href="/dashboard/orders">Tất cả đơn hàng</Link>
        </Button>
      </div>
    </div>
  );
}

export default function VnPayReturnPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <Suspense
        fallback={<Loader2 className="h-10 w-10 animate-spin text-primary" />}
      >
        <VnPayReturnContent />
      </Suspense>
    </div>
  );
}

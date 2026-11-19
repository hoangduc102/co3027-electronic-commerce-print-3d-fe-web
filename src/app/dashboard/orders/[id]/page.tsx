"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderTimeline } from "@/components/dashboard/order-timeline";
import { ORDER_STATUS_COLORS } from "@/components/dashboard/order-card";
import {
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Loader2,
  MessageSquare,
  Printer,
  XCircle,
} from "lucide-react";
import { useCancelOrder, useOrder } from "@/hooks/use-orders";
import { createPayment, getVnPayUrl } from "@/services/payment.api";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import {
  orderItemImage,
  orderSubtotal,
  shortOrderId,
  toNumber,
} from "@/lib/order-utils";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH_ON_DELIVERY: "Thanh toán khi nhận hàng (COD)",
  BANK_TRANSFER: "VNPay",
  CREDIT_CARD: "Thẻ tín dụng",
  PAYPAL: "PayPal",
};

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  FAILED: "Thanh toán thất bại",
  REFUNDED: "Đã hoàn tiền",
};

export default function OrderDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = use(params);
  const { data: order, isLoading, isError, error } = useOrder(id);
  const cancel = useCancelOrder();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center py-24 gap-4">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-lg font-medium">Không tìm thấy đơn hàng</p>
        <p className="text-sm text-muted-foreground">
          {(error as Error | null)?.message}
        </p>
        <Button
          asChild
          variant="outline"
          className="border-2 border-foreground"
        >
          <Link href="/dashboard/orders">Về danh sách đơn hàng</Link>
        </Button>
      </div>
    );
  }

  const subtotal = orderSubtotal(order);
  const total = toNumber(order.totalAmount);
  const shippingFee = Math.max(0, total - subtotal);
  const payment = order.payment;

  // Có thể thanh toán online lại nếu đơn còn chờ và chưa trả bằng COD / chưa trả xong
  const canPayOnline =
    order.status === "PENDING" &&
    payment?.status !== "PAID" &&
    payment?.method !== "CASH_ON_DELIVERY";

  const handlePayOnline = async () => {
    setIsPaying(true);
    setPayError(null);
    try {
      const paymentId =
        payment?.id ??
        (await createPayment({ orderId: order.id, method: "BANK_TRANSFER" }))
          .data.id;
      const { data } = await getVnPayUrl(paymentId);
      window.location.href = data.url;
    } catch (err) {
      setPayError(
        err instanceof Error ? err.message : "Không tạo được link thanh toán"
      );
      setIsPaying(false);
    }
  };

  const handleCancel = () => {
    cancel.mutate(order.id, { onSuccess: () => setShowCancelDialog(false) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="print:hidden">
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách đơn hàng
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
              Đơn hàng #{shortOrderId(order.id)}
            </h1>
            <Badge className={`border ${ORDER_STATUS_COLORS[order.status]}`}>
              {ORDER_STATUSES[order.status].label}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Đặt ngày {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          {canPayOnline && (
            <Button
              className="gap-2 border-2 border-foreground"
              onClick={handlePayOnline}
              disabled={isPaying}
            >
              {isPaying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
              Thanh toán VNPay
            </Button>
          )}
          <Button
            variant="outline"
            className="border-2 border-foreground gap-2 bg-transparent"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            In hoá đơn
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-foreground gap-2 bg-transparent"
          >
            <Link href="/contact">
              <MessageSquare className="h-4 w-4" />
              Liên hệ hỗ trợ
            </Link>
          </Button>
          {order.status === "PENDING" && (
            <Button
              variant="outline"
              className="border-2 border-red-500 text-red-600 gap-2 bg-transparent hover:bg-red-50"
              onClick={() => {
                cancel.reset();
                setShowCancelDialog(true);
              }}
            >
              <XCircle className="h-4 w-4" />
              Huỷ đơn
            </Button>
          )}
        </div>
      </div>

      {payError && (
        <p className="text-sm text-red-600" role="alert">
          {payError}
        </p>
      )}

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-6">
          {/* Items */}
          <div className="border-2 border-foreground">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">
                Sản phẩm ({order.items.length})
              </h2>
            </div>
            <div className="divide-y-2 divide-foreground">
              {order.items.map((item) => {
                const price = toNumber(item.price);
                const { product, material } = item.variant;
                return (
                  <div key={item.id} className="p-4 flex gap-4">
                    <div className="w-24 h-24 border-2 border-foreground bg-secondary relative overflow-hidden flex-shrink-0">
                      <Image
                        src={orderItemImage(item)}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between gap-2 mb-2">
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="font-bold text-primary whitespace-nowrap">
                          {formatPrice(price * item.quantity)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Số lượng: {item.quantity} × {formatPrice(price)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-secondary border border-foreground">
                          {item.variant.name}
                        </span>
                        {material && (
                          <span className="text-xs px-2 py-1 bg-secondary border border-foreground">
                            {[material.name, material.color]
                              .filter(Boolean)
                              .join(" ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shipping */}
          {order.address && (
            <div className="border-2 border-foreground">
              <div className="p-4 border-b-2 border-foreground bg-secondary">
                <h2 className="font-bold text-lg">Thông tin giao hàng</h2>
              </div>
              <div className="p-4">
                <p className="font-medium">{order.address.recipient}</p>
                <p className="text-muted-foreground">{order.address.phone}</p>
                <p className="text-muted-foreground whitespace-pre-line">
                  {order.address.address1}
                </p>
                {order.shipment?.trackingNo && (
                  <p className="text-sm mt-2">
                    Mã vận đơn: <strong>{order.shipment.trackingNo}</strong>
                    {order.shipment.carrier && ` (${order.shipment.carrier})`}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Payment */}
          <div className="border-2 border-foreground">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">Thanh toán</h2>
            </div>
            <div className="p-4 space-y-2">
              {payment && (
                <div className="flex justify-between text-sm pb-2">
                  <span className="text-muted-foreground">
                    {PAYMENT_METHOD_LABELS[payment.method] ?? payment.method}
                  </span>
                  <span className="font-medium">
                    {PAYMENT_STATUS_LABELS[payment.status] ?? payment.status}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-foreground">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:self-start">
          <div className="border-2 border-foreground bg-card sticky top-32">
            <div className="p-4 border-b-2 border-foreground bg-secondary">
              <h2 className="font-bold text-lg">Tiến độ đơn hàng</h2>
            </div>
            <div className="p-4">
              <OrderTimeline
                currentStatus={order.status}
                updatedAt={new Date(order.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Huỷ đơn hàng?</DialogTitle>
            <DialogDescription>
              Đơn #{shortOrderId(order.id)} sẽ bị huỷ. Bạn không thể khôi phục
              lại đơn này.
            </DialogDescription>
          </DialogHeader>
          {cancel.isError && (
            <p className="text-sm text-red-600">
              {(cancel.error as Error).message}
            </p>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Giữ đơn
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancel.isPending}
            >
              {cancel.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Huỷ đơn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

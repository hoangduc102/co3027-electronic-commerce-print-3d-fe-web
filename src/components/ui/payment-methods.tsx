"use client";

const paymentMethods = [
  { name: "Visa", logo: "/payments/visa.svg" },
  { name: "MasterCard", logo: "/payments/mastercard.svg" },
  { name: "MoMo", logo: "/payments/momo.svg" },
  { name: "ZaloPay", logo: "/payments/zalopay.svg" },
  { name: "VNPAY", logo: "/payments/vnpay.svg" },
  { name: "COD", logo: "/payments/cod.svg" },
];

interface PaymentMethodsProps {
  variant?: "icons" | "text" | "full";
  className?: string;
}

export function PaymentMethods({
  variant = "icons",
  className = "",
}: Readonly<PaymentMethodsProps>) {
  if (variant === "text") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground">Thanh toán:</span>
        {paymentMethods.map((method) => (
          <span
            key={method.name}
            className="text-xs px-2 py-1 border border-muted-foreground/30 rounded"
          >
            {method.name}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`space-y-3 ${className}`}>
        <p className="text-sm font-medium">Phương thức thanh toán</p>
        <div className="flex flex-wrap gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="flex items-center gap-2 px-3 py-2 border-2 border-foreground bg-white rounded"
            >
              <div className="w-8 h-5 relative bg-gray-100 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-600">
                  {method.name}
                </span>
              </div>
              <span className="text-sm">{method.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: icons only
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {paymentMethods.map((method) => (
        <div
          key={method.name}
          className="w-12 h-8 border border-muted-foreground/20 rounded bg-white flex items-center justify-center"
          title={method.name}
        >
          <span className="text-[9px] font-bold text-gray-500">
            {method.name}
          </span>
        </div>
      ))}
    </div>
  );
}

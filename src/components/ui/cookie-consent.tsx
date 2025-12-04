"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Luôn bật
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Kiểm tra nếu đã có consent trong localStorage
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Đợi một chút để trang load xong
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const customPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(customPreferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto">
        <div className="bg-card border-2 border-foreground shadow-lg p-4 md:p-6">
          {showPreferences ? (
            // Preferences view
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Tùy chỉnh Cookie</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreferences(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {/* Necessary */}
                <div className="flex items-start justify-between p-3 border-2 border-foreground bg-secondary">
                  <div>
                    <p className="font-medium">Cookie thiết yếu</p>
                    <p className="text-sm text-muted-foreground">
                      Cần thiết để website hoạt động. Không thể tắt.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="h-5 w-5 mt-1"
                  />
                </div>
                {/* Analytics */}
                <div className="flex items-start justify-between p-3 border-2 border-foreground">
                  <div>
                    <p className="font-medium">Cookie phân tích</p>
                    <p className="text-sm text-muted-foreground">
                      Giúp chúng tôi hiểu cách bạn sử dụng website.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 mt-1 accent-primary"
                  />
                </div>
                {/* Marketing */}
                <div className="flex items-start justify-between p-3 border-2 border-foreground">
                  <div>
                    <p className="font-medium">Cookie marketing</p>
                    <p className="text-sm text-muted-foreground">
                      Được sử dụng để hiển thị quảng cáo phù hợp.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        marketing: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 mt-1 accent-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(false)}
                  className="border-2 border-foreground"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="bg-primary hover:bg-primary/90 border-2 border-foreground"
                >
                  Lưu tùy chọn
                </Button>
              </div>
            </div>
          ) : (
            // Main consent view
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Chúng tôi sử dụng Cookie 🍪
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Website sử dụng cookies để cải thiện trải nghiệm của bạn,
                    phân tích lưu lượng truy cập và cá nhân hóa nội dung. Bằng
                    việc tiếp tục sử dụng, bạn đồng ý với{" "}
                    <Link
                      href="/privacy"
                      className="text-primary underline hover:no-underline"
                    >
                      Chính sách Bảo mật
                    </Link>{" "}
                    của chúng tôi.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreferences(true)}
                  className="border-2 border-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Tùy chỉnh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptNecessary}
                  className="border-2 border-foreground"
                >
                  Chỉ thiết yếu
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-primary hover:bg-primary/90 border-2 border-foreground"
                >
                  Chấp nhận tất cả
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Câu hỏi gợi ý theo chủ đề
const SUGGESTIONS: Record<string, string[]> = {
  default: [
    "Giá in 3D?",
    "Vật liệu nào tốt?",
    "Thời gian in?",
    "Cách đặt hàng?",
  ],
  price: ["So sánh giá vật liệu", "Có giảm giá không?", "Phí vận chuyển?"],
  material: [
    "PLA hay ABS tốt hơn?",
    "In figure dùng gì?",
    "Vật liệu bền nhất?",
  ],
  time: ["Giao hàng mấy ngày?", "Có in gấp không?", "Theo dõi đơn hàng"],
  order: ["Thanh toán thế nào?", "Đổi trả ra sao?", "Liên hệ hỗ trợ"],
};

// Detect topic từ tin nhắn
function detectTopic(msg: string): string {
  const lower = msg.toLowerCase();
  if (/(giá|tiền|phí|cost|price|bao nhiêu)/.test(lower)) return "price";
  if (/(vật liệu|pla|abs|resin|petg|chất liệu)/.test(lower)) return "material";
  if (/(thời gian|bao lâu|mấy ngày|nhanh|gấp)/.test(lower)) return "time";
  if (/(đặt hàng|order|thanh toán|đổi trả|giao hàng)/.test(lower))
    return "order";
  return "default";
}

// Welcome message
const WELCOME_MESSAGE = `Xin chào! 👋 Tôi là trợ lý của Print3D.vn.

Tôi có thể giúp bạn về:
• Báo giá in 3D
• Tư vấn vật liệu  
• Theo dõi đơn hàng
• Hướng dẫn sử dụng

Chọn câu hỏi bên dưới hoặc nhập câu hỏi của bạn!`;

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(
    SUGGESTIONS.default
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: WELCOME_MESSAGE,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, messages.length]);

  // Send message
  const handleSend = useCallback(
    async (directMessage?: string) => {
      const messageToSend = directMessage || inputValue.trim();
      if (!messageToSend || isLoading) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        content: messageToSend,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: messageToSend,
            history: messages.slice(-8).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            content: data.response || "Xin lỗi, có lỗi xảy ra.",
            role: "assistant",
            timestamp: new Date(),
          },
        ]);

        // Cập nhật gợi ý dựa trên chủ đề của câu hỏi
        const topic = detectTopic(messageToSend);
        setCurrentSuggestions(SUGGESTIONS[topic]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            content: "Lỗi kết nối. Vui lòng thử lại!",
            role: "assistant",
            timestamp: new Date(),
          },
        ]);
        setCurrentSuggestions(SUGGESTIONS.default);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages]
  );

  return (
    <>
      {/* Float Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105",
          isOpen ? "bg-gray-500" : "bg-emerald-600"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <MessageCircle className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 rounded-lg bg-white shadow-xl border overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 px-4 py-3 text-white flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium text-sm">Print3D Hỗ trợ</span>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <Bot className="h-6 w-6 text-emerald-600 shrink-0 mt-1" />
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-white border shadow-sm"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <User className="h-6 w-6 text-gray-400 shrink-0 mt-1" />
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <Bot className="h-6 w-6 text-emerald-600 shrink-0" />
                <div className="bg-white border rounded-lg px-3 py-2 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Luôn hiển thị gợi ý */}
          {!isLoading && (
            <div className="px-3 py-2 border-t bg-gray-50">
              <div className="flex flex-wrap gap-1.5">
                {currentSuggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-white border rounded-full px-2.5 py-1 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Nhập câu hỏi..."
                className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                className="h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center disabled:opacity-50 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

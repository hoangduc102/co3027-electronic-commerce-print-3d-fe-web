"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircle,
  Mail,
  Phone,
  Search,
  Send,
  HelpCircle,
  FileQuestion,
  Package,
  CreditCard,
} from "lucide-react";
import { FAQJsonLd } from "@/components/seo/JsonLd";

const faqs = [
  {
    category: "Đặt hàng",
    icon: Package,
    questions: [
      {
        q: "Thời gian sản xuất mất bao lâu?",
        a: "Thời gian sản xuất trung bình là 3-5 ngày làm việc, tùy thuộc vào kích thước và độ phức tạp của mô hình. Đơn hàng lớn hoặc yêu cầu xử lý đặc biệt có thể mất 7-10 ngày.",
      },
      {
        q: "Kích thước tối đa có thể in là bao nhiêu?",
        a: "Máy FDM: 300x300x400mm. Máy SLA: 200x200x250mm. Nếu mô hình lớn hơn, chúng tôi có thể chia nhỏ và lắp ghép.",
      },
      {
        q: "File 3D cần định dạng gì?",
        a: "Chúng tôi chấp nhận các định dạng: STL, OBJ, STEP, 3MF. STL là định dạng phổ biến và khuyến khích nhất.",
      },
    ],
  },
  {
    category: "Thanh toán",
    icon: CreditCard,
    questions: [
      {
        q: "Các phương thức thanh toán được chấp nhận?",
        a: "Chuyển khoản ngân hàng, thẻ Visa/MasterCard, ví MoMo, ZaloPay, và COD (thu tiền khi nhận hàng) cho đơn dưới 2 triệu đồng.",
      },
      {
        q: "Có cần đặt cọc trước không?",
        a: "Đơn hàng dưới 500.000đ không cần đặt cọc. Đơn từ 500.000đ - 2.000.000đ cần đặt cọc 50%. Đơn trên 2.000.000đ cần đặt cọc 70%.",
      },
    ],
  },
  {
    category: "Kỹ thuật",
    icon: FileQuestion,
    questions: [
      {
        q: "Sự khác biệt giữa FDM và SLA?",
        a: "FDM (Fused Deposition Modeling) dùng nhựa dây, giá rẻ hơn nhưng có đường vân layer. SLA (Stereolithography) dùng resin lỏng, cho bề mặt mịn và chi tiết cao hơn, phù hợp cho figure và trang sức.",
      },
      {
        q: "Tại sao file của tôi bị báo lỗi?",
        a: "Các lỗi thường gặp: lưới không kín (non-manifold), mặt đảo ngược, các phần rời không liên kết. Hệ thống sẽ cố gắng tự sửa, hoặc bạn có thể liên hệ kỹ thuật viên để được hỗ trợ.",
      },
      {
        q: "Infill là gì? Nên chọn bao nhiêu %?",
        a: "Infill là độ đặc bên trong mô hình. 20% phù hợp cho mô hình trưng bày nhẹ. 50% cho đồ chịu lực vừa. 100% cho các chi tiết cần độ bền cao như khớp nối, bánh răng.",
      },
    ],
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi trong 24 giờ.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-16 h-16 bg-primary mx-auto mb-4 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Trung tâm Hỗ trợ
            </h1>
            <p className="text-muted-foreground text-lg">
              Tìm câu trả lời nhanh hoặc liên hệ đội ngũ hỗ trợ của chúng tôi
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="border-2 border-foreground p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-bold mb-1">Hotline</h3>
              <p className="text-lg font-semibold">1900 xxxx</p>
              <p className="text-sm text-muted-foreground">
                8:00 - 18:00 hàng ngày
              </p>
            </div>
            <div className="border-2 border-foreground p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-bold mb-1">Email</h3>
              <p className="text-lg font-semibold">support@print3d.vn</p>
              <p className="text-sm text-muted-foreground">
                Phản hồi trong 24 giờ
              </p>
            </div>
            <div className="border-2 border-foreground p-6 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-bold mb-1">Live Chat</h3>
              <p className="text-lg font-semibold">Zalo / Messenger</p>
              <p className="text-sm text-muted-foreground">Hỗ trợ trực tuyến</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Tìm câu hỏi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-2 border-foreground"
                />
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6">
                {(searchQuery ? filteredFaqs : faqs).map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.category}
                    </h3>
                    <Accordion
                      type="single"
                      collapsible
                      className="border-2 border-foreground"
                    >
                      {category.questions.map((item, idx) => (
                        <AccordionItem
                          key={idx}
                          value={`${category.category}-${idx}`}
                          className="border-foreground"
                        >
                          <AccordionTrigger className="px-4 hover:bg-secondary text-left">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 text-muted-foreground">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="border-2 border-foreground p-6 sticky top-32">
                <h2 className="text-xl font-bold mb-4">Gửi tin nhắn</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Họ tên</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="border-2 border-foreground"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="border-2 border-foreground"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Tiêu đề</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          subject: e.target.value,
                        })
                      }
                      className="border-2 border-foreground"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Nội dung</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="border-2 border-foreground resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 border-2 border-foreground"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

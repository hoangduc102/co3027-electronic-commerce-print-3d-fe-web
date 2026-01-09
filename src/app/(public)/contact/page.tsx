"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-muted-foreground text-lg">
              Có câu hỏi hoặc cần tư vấn? Đội ngũ của chúng tôi sẵn sàng hỗ trợ
              bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 border-2 border-foreground">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Địa chỉ</h3>
                    <p className="text-muted-foreground">
                      123 Nguyễn Văn Linh, Quận 7<br />
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border-2 border-foreground">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Điện thoại</h3>
                    <p className="text-muted-foreground">
                      Hotline:{" "}
                      <span className="font-semibold text-foreground">
                        1900 xxxx
                      </span>
                      <br />
                      Zalo: 0901 234 567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border-2 border-foreground">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      Hỗ trợ: support@print3d.vn
                      <br />
                      Hợp tác: business@print3d.vn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border-2 border-foreground">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Giờ làm việc</h3>
                    <p className="text-muted-foreground">
                      Thứ 2 - Thứ 6: 8:00 - 18:00
                      <br />
                      Thứ 7: 8:00 - 12:00
                      <br />
                      Chủ nhật: Nghỉ
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 border-2 border-foreground bg-muted h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Google Maps sẽ hiển thị tại đây</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="border-2 border-foreground p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 mx-auto mb-4 flex items-center justify-center border-2 border-foreground">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Cảm ơn bạn!</h2>
                    <p className="text-muted-foreground mb-6">
                      Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi
                      trong vòng 24 giờ.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                      className="border-2 border-foreground"
                    >
                      Gửi tin nhắn khác
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Họ và tên *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="border-2 border-foreground"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="border-2 border-foreground"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="border-2 border-foreground"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Chủ đề *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            setFormData({ ...formData, subject: value })
                          }
                        >
                          <SelectTrigger className="border-2 border-foreground">
                            <SelectValue placeholder="Chọn chủ đề" />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-foreground">
                            <SelectItem value="quote">
                              Yêu cầu báo giá
                            </SelectItem>
                            <SelectItem value="order">
                              Hỏi về đơn hàng
                            </SelectItem>
                            <SelectItem value="technical">
                              Hỗ trợ kỹ thuật
                            </SelectItem>
                            <SelectItem value="business">
                              Hợp tác kinh doanh
                            </SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Nội dung tin nhắn *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Mô tả chi tiết yêu cầu của bạn..."
                          className="border-2 border-foreground resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 border-2 border-foreground font-semibold"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Gửi tin nhắn
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

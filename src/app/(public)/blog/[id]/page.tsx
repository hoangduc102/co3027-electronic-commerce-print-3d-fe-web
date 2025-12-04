import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const blogPosts = [
  {
    id: "1",
    title: "So sánh PLA vs PETG: Chọn loại nào cho dự án của bạn?",
    excerpt:
      "Tìm hiểu sự khác biệt giữa hai loại nhựa in 3D phổ biến nhất và khi nào nên sử dụng loại nào.",
    category: "Vật liệu",
    date: "2024-12-01",
    readTime: "5 phút",
    author: "Nguyễn Văn A",
    content: `
## Giới thiệu

PLA và PETG là hai loại nhựa in 3D FDM phổ biến nhất. Mỗi loại có những ưu nhược điểm riêng, phù hợp với các ứng dụng khác nhau. Bài viết này sẽ giúp bạn hiểu rõ và chọn đúng loại cho dự án của mình.

## PLA (Polylactic Acid)

### Ưu điểm
- **Dễ in nhất**: Không cần heated bed, ít warping
- **Thân thiện môi trường**: Làm từ nguyên liệu sinh học (ngô, mía)
- **Bề mặt đẹp**: Có thể in ở nhiệt độ thấp, ít stringing
- **Giá rẻ**: Phổ biến và có nhiều màu sắc

### Nhược điểm
- **Chịu nhiệt kém**: Biến dạng ở ~50-60°C
- **Giòn**: Dễ gãy khi chịu lực đột ngột
- **Không chống nước**: Hút ẩm theo thời gian

### Ứng dụng phù hợp
- Mô hình trưng bày, prototype
- Đồ trang trí, decor
- Sản phẩm sử dụng trong nhà

## PETG (Polyethylene Terephthalate Glycol)

### Ưu điểm
- **Bền hơn PLA**: Chịu va đập tốt
- **Chịu nhiệt tốt hơn**: Ổn định đến ~70-80°C
- **Chống nước**: Phù hợp sử dụng ngoài trời
- **Food-safe**: An toàn khi tiếp xúc thực phẩm

### Nhược điểm
- **Khó in hơn**: Cần heated bed, dễ stringing
- **Khó xử lý hậu kỳ**: Khó đánh nhám, sơn
- **Giá cao hơn**: Đắt hơn PLA khoảng 20%

### Ứng dụng phù hợp
- Phụ kiện chịu lực
- Hộp đựng thực phẩm
- Sản phẩm sử dụng ngoài trời

## Kết luận

**Chọn PLA khi:**
- Bạn mới bắt đầu với in 3D
- Cần in nhanh, đẹp, không quan trọng độ bền
- Sản phẩm sử dụng trong nhà, không chịu nhiệt

**Chọn PETG khi:**
- Cần sản phẩm bền, chịu lực
- Sử dụng ngoài trời hoặc môi trường ẩm
- Tiếp xúc với thực phẩm

Nếu còn phân vân, hãy liên hệ đội ngũ Print3D.vn để được tư vấn chi tiết!
    `,
  },
];

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <article className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Blog
          </Link>

          {/* Header */}
          <header className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b-2 border-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("vi-VN")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime} đọc
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-neutral max-w-none">
              {post.content.split("\n").map((paragraph, idx) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xl font-bold mt-6 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- **")) {
                  const match = paragraph.match(/- \*\*(.+?)\*\*: (.+)/);
                  if (match) {
                    return (
                      <li key={idx} className="mb-2">
                        <strong>{match[1]}:</strong> {match[2]}
                      </li>
                    );
                  }
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={idx} className="mb-2 text-muted-foreground">
                      {paragraph.replace("- ", "")}
                    </li>
                  );
                }
                if (paragraph.startsWith("**")) {
                  return (
                    <p key={idx} className="font-semibold my-4">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p
                      key={idx}
                      className="text-muted-foreground leading-relaxed my-4"
                    >
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-6 border-t-2 border-foreground">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Chia sẻ bài viết:</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-2 border-foreground bg-transparent"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 border-2 border-foreground bg-secondary text-center">
              <h3 className="text-xl font-bold mb-2">
                Sẵn sàng bắt đầu dự án in 3D?
              </h3>
              <p className="text-muted-foreground mb-4">
                Upload file và nhận báo giá tức thì từ Print3D.vn
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 border-2 border-foreground"
              >
                <Link href="/quote">Báo giá ngay</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

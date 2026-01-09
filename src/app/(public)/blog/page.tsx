import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import type { Metadata } from "next";
import { generatePageMetadata, pagesSEO } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: pagesSEO.blog.title,
  description: pagesSEO.blog.description,
  path: "/blog",
});

const blogPosts = [
  {
    id: "1",
    title: "So sánh PLA vs PETG: Chọn loại nào cho dự án của bạn?",
    excerpt:
      "Tìm hiểu sự khác biệt giữa hai loại nhựa in 3D phổ biến nhất và khi nào nên sử dụng loại nào.",
    category: "Vật liệu",
    date: "2024-12-01",
    readTime: "5 phút",
    image: "/3d-printing-materials.png",
  },
  {
    id: "2",
    title: "Hướng dẫn thiết kế file 3D tối ưu cho in FDM",
    excerpt:
      "Các mẹo và quy tắc vàng để thiết kế mô hình in 3D với chất lượng cao nhất và tiết kiệm chi phí.",
    category: "Hướng dẫn",
    date: "2024-11-25",
    readTime: "8 phút",
    image: "/3d-design-tutorial-cad.jpg",
  },
  {
    id: "3",
    title: "Ứng dụng in 3D trong ngành sản xuất phụ tùng ô tô",
    excerpt:
      "Cách các xưởng sửa chữa ô tô tại Việt Nam đang tận dụng công nghệ in 3D để tạo phụ tùng thay thế.",
    category: "Case Study",
    date: "2024-11-18",
    readTime: "6 phút",
    image: "/3d-printed-car-parts-automotive.jpg",
  },
  {
    id: "4",
    title: "Resin vs FDM: Khi nào cần độ chi tiết cao?",
    excerpt:
      "Phân tích chi tiết về công nghệ SLA/Resin và những ứng dụng đòi hỏi độ mịn cao như figure, trang sức.",
    category: "Công nghệ",
    date: "2024-11-10",
    readTime: "7 phút",
    image: "/sla-resin-3d-printing-detailed-miniatures.jpg",
  },
  {
    id: "5",
    title: "Xử lý hậu kỳ sản phẩm in 3D: Từ thô đến hoàn hảo",
    excerpt:
      "Các kỹ thuật đánh nhám, sơn, và xử lý bề mặt để biến sản phẩm in 3D thô trở nên chuyên nghiệp.",
    category: "Hướng dẫn",
    date: "2024-11-05",
    readTime: "10 phút",
    image: "/3d-print-post-processing-sanding-painting.jpg",
  },
  {
    id: "6",
    title: "In 3D cho người mới bắt đầu: Những điều cần biết",
    excerpt:
      "Hướng dẫn toàn diện cho những ai lần đầu tiếp cận dịch vụ in 3D, từ chuẩn bị file đến nhận hàng.",
    category: "Cơ bản",
    date: "2024-10-28",
    readTime: "12 phút",
    image: "/3d-printing-beginner-guide-introduction.jpg",
  },
];

const categories = [
  "Tất cả",
  "Vật liệu",
  "Hướng dẫn",
  "Công nghệ",
  "Case Study",
  "Cơ bản",
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Blog & Kiến thức
            </h1>
            <p className="text-muted-foreground text-lg">
              Cập nhật tin tức, hướng dẫn và kiến thức về công nghệ in 3D từ đội
              ngũ Print3D.vn
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 text-sm font-medium border-2 border-foreground transition-colors ${
                  idx === 0
                    ? "bg-foreground text-background"
                    : "bg-card hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="border-2 border-foreground mb-12 grid md:grid-cols-2 overflow-hidden">
            <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-foreground relative">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold">
                  {blogPosts[0].category}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {blogPosts[0].excerpt}
              </p>
              <Link
                href={`/blog/${blogPosts[0].id}`}
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                Đọc thêm
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="border-2 border-foreground bg-card overflow-hidden group"
              >
                <div className="aspect-video bg-muted border-b-2 border-foreground overflow-hidden relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("vi-VN")}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Đọc
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-foreground font-semibold hover:bg-secondary transition-colors">
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

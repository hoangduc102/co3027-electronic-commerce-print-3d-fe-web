# 🖨️ 3D Print Service

> Nền tảng cung cấp dịch vụ đặt in 3D trực tuyến - cho phép người dùng tải mô hình 3D, cấu hình thông số in, báo giá tức thì và đặt hàng online.

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Authentication](#-authentication)
- [Scripts](#-scripts)
- [Triển khai Docker](#-triển-khai-docker)
- [Giấy phép](#-giấy-phép)

---

## 🎯 Tổng quan

**3D Print Service** là một ứng dụng web hiện đại được xây dựng trên **Next.js App Router**, cung cấp trải nghiệm đặt in 3D hoàn chỉnh từ upload file đến thanh toán và theo dõi đơn hàng.

### Điểm nổi bật:

- 🚀 **Next.js 16** với App Router và React 19
- 🎨 **Radix UI** + **TailwindCSS** cho giao diện đẹp, responsive
- 🔐 **JWT Authentication** với auto token refresh
- 📦 **Three.js** cho xem trước mô hình 3D
- 🐳 **Docker ready** với multi-stage build

---

## ✨ Tính năng

### Người dùng

| Tính năng | Mô tả |
|-----------|-------|
| 📤 **Upload mô hình 3D** | Hỗ trợ định dạng STL/OBJ với xem trước 3D |
| ⚙️ **Cấu hình in** | Chọn công nghệ (FDM/SLA/SLS), vật liệu, màu sắc, infill |
| 💰 **Báo giá tự động** | Tính giá theo thể tích, thời gian in và vật liệu |
| 🛒 **Giỏ hàng & Thanh toán** | Quản lý đơn hàng, checkout online |
| 📊 **Dashboard** | Theo dõi trạng thái đơn hàng, lịch sử in |
| 🔍 **Tìm kiếm & Lọc** | Tìm sản phẩm, bộ lọc nâng cao |

### Trang công khai

- 🏠 Trang chủ với banner khuyến mãi
- 🏪 Cửa hàng sản phẩm mẫu
- 📖 Blog & Tin tức
- 📚 Hướng dẫn in 3D
- 🧪 Thư viện vật liệu
- 📞 Liên hệ & Hỗ trợ
- 📜 Chính sách (Điều khoản, Bảo mật, Hoàn tiền, Vận chuyển)

---

## 🛠 Công nghệ sử dụng

### Frontend

| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| **Next.js** | 16.0.1 | React framework với App Router |
| **React** | 19.2.0 | UI library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **TailwindCSS** | 4.x | Utility-first CSS |
| **Radix UI** | Latest | Accessible UI components |
| **Three.js** | 0.181 | 3D visualization |
| **Lucide React** | 0.552 | Icon library |

### Development

| Tool | Mô tả |
|------|-------|
| **pnpm** | Package manager (khuyến nghị) |
| **ESLint** | Linting |
| **Prettier** | Code formatting |
| **Docker** | Containerization |

---

## 🚀 Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 18
- **pnpm** (khuyến nghị) hoặc npm/yarn
- **Backend API** đang chạy (mặc định: `http://localhost:8000`)

### Bước 1: Clone repository

```bash
git clone https://github.com/hoangduc102/co3027-electronic-commerce-print-3d.git
cd co3027-electronic-commerce-print-3d
```

### Bước 2: Cài đặt dependencies

```bash
pnpm install
```

### Bước 3: Cấu hình môi trường

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Bước 4: Chạy development server

```bash
pnpm dev
```

Mở trình duyệt: **http://localhost:3000**

---

## 📁 Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/           # Các trang công khai
│   │   ├── about/          # Giới thiệu
│   │   ├── blog/           # Blog & tin tức
│   │   ├── checkout/       # Thanh toán
│   │   ├── materials/      # Thư viện vật liệu
│   │   ├── quote/          # Báo giá
│   │   ├── store/          # Cửa hàng
│   │   └── ...
│   ├── dashboard/          # Dashboard người dùng
│   ├── login/              # Đăng nhập
│   ├── register/           # Đăng ký
│   └── user/               # Hồ sơ người dùng
│
├── components/             # React components
│   ├── auth/               # Components xác thực
│   ├── checkout/           # Components thanh toán
│   ├── dashboard/          # Components dashboard
│   ├── layout/             # Header, Footer
│   ├── quote/              # Components báo giá
│   ├── store/              # Components cửa hàng
│   └── ui/                 # UI primitives (shadcn/ui)
│
├── config/                 # Cấu hình
│   └── api.config.ts       # API endpoints
│
├── contexts/               # React Contexts
│   └── AuthContext.tsx     # Quản lý authentication
│
├── hooks/                  # Custom hooks
│   ├── use-file-upload.ts  # Upload file
│   └── use-price-calculator.ts
│
├── lib/                    # Utilities
│   ├── constants.ts        # Hằng số
│   ├── data.ts             # Mock data
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
│
├── services/               # API services
│   ├── auth.service.ts     # Authentication API
│   ├── httpClient.ts       # HTTP client với interceptors
│   └── user-profile.service.ts
│
└── utils/                  # Tiện ích
    ├── tokenRefresh.ts     # Auto refresh token
    └── tokenStorage.ts     # Quản lý localStorage
```

---

## 🔐 Authentication

Hệ thống xác thực sử dụng **JWT (JSON Web Tokens)**:

| Token | Thời hạn | Mô tả |
|-------|----------|-------|
| **Access Token** | 15 phút | Xác thực API requests |
| **Refresh Token** | 7 ngày | Làm mới access token |

### Tính năng:

- ✅ Tự động refresh token khi hết hạn
- ✅ Tokens lưu trong localStorage
- ✅ Protected routes với `ProtectedRoute` component
- ✅ Global auth state với React Context

### Cấu trúc files:

```
src/
├── config/api.config.ts        # API endpoints
├── contexts/AuthContext.tsx    # Auth state management
├── services/
│   ├── auth.service.ts         # Auth API calls
│   └── httpClient.ts           # HTTP client với interceptors
├── utils/
│   ├── tokenStorage.ts         # Token CRUD
│   └── tokenRefresh.ts         # Auto refresh logic
└── components/auth/
    └── ProtectedRoute.tsx      # Route protection
```

---

## 📜 Scripts

| Script | Lệnh | Mô tả |
|--------|------|-------|
| **dev** | `pnpm dev` | Chạy development server |
| **build** | `pnpm build` | Build production |
| **start** | `pnpm start` | Chạy production build |
| **lint** | `pnpm lint` | Kiểm tra ESLint |
| **lint:fix** | `pnpm lint:fix` | Sửa lỗi ESLint + format |
| **format** | `pnpm format` | Format code với Prettier |

---

## 🐳 Triển khai Docker

### Yêu cầu

- **Docker** >= 20.10
- **Docker Compose** >= 2.0

### Quick Start

```bash
# 1. Tạo file môi trường
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.production

# 2. Build và chạy
docker-compose up -d --build

# 3. Truy cập http://localhost:3000
```

### Kiến trúc Docker

Dockerfile sử dụng **multi-stage build** để tối ưu:

```
Stage 1 (deps)     → Cài đặt dependencies với pnpm
Stage 2 (builder)  → Build Next.js standalone
Stage 3 (runner)   → Production image (~200-300MB)
```

**Lợi ích:**
- 📦 Image nhỏ gọn
- 🔒 Chạy với non-root user
- ⚡ Layer caching tăng tốc build

### Các lệnh thường dùng

```bash
# Xem logs
docker-compose logs -f print-3d

# Dừng container
docker-compose down

# Rebuild không cache
docker-compose build --no-cache && docker-compose up -d

# Vào container debug
docker exec -it print-3d-app sh
```

### Health Check

Container tự động kiểm tra sức khỏe:

| Cấu hình | Giá trị |
|----------|---------|
| Interval | 30s |
| Timeout | 10s |
| Start period | 40s |
| Retries | 3 |

---

## 📄 Giấy phép

Dự án được phát hành theo giấy phép **MIT**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<div align="center">

**Made with ❤️ by HCMUT Students**

*CO3027 - Electronic Commerce*

</div>

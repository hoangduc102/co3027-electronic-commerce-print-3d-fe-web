# 3D Print Service

> Nen tang cung cap dich vu dat in 3D truc tuyen - cho phep nguoi dung tai mo hinh 3D, cau hinh thong so in, bao gia tuc thi va dat hang online.

| Cong nghe | Phien ban |
|-----------|-----------|
| Next.js | 16.0.7 |
| React | 19.2.0 |
| TypeScript | 5.x |
| TailwindCSS | 4.x |
| License | MIT |

---

## Muc luc

- [Tong quan](#tong-quan)
- [Tinh nang](#tinh-nang)
- [Cong nghe su dung](#cong-nghe-su-dung)
- [Cai dat](#cai-dat)
- [Cau truc du an](#cau-truc-du-an)
- [Authentication](#authentication)
- [Scripts](#scripts)
- [Trien khai Docker](#trien-khai-docker)
- [Giay phep](#giay-phep)

---

## Tong quan

**3D Print Service** la mot ung dung web hien dai duoc xay dung tren **Next.js App Router**, cung cap trai nghiem dat in 3D hoan chinh tu upload file den thanh toan va theo doi don hang.

### Diem noi bat

- **Next.js 16** voi App Router va React 19
- **Radix UI** + **TailwindCSS** cho giao dien dep, responsive
- **JWT Authentication** voi auto token refresh
- **Three.js** cho xem truoc mo hinh 3D
- **React Hook Form** + **Zod** cho form validation
- **TanStack React Query** cho server state management
- **Docker ready** voi multi-stage build
- **SEO** voi robots.ts va sitemap.ts tich hop san

---

## Tinh nang

### Nguoi dung

| Tinh nang | Mo ta |
|-----------|-------|
| Upload mo hinh 3D | Ho tro dinh dang STL/OBJ voi xem truoc 3D |
| Cau hinh in | Chon cong nghe (FDM/SLA/SLS), vat lieu, mau sac, infill |
| Bao gia tu dong | Tinh gia theo the tich, thoi gian in va vat lieu |
| Gio hang va Thanh toan | Quan ly don hang, checkout online |
| Dashboard | Theo doi trang thai don hang, lich su in |
| Tim kiem va Loc | Tim san pham, bo loc nang cao |
| Chatbot ho tro | Tro chuyen truc tuyen voi he thong |

### Trang cong khai

- Trang chu voi banner khuyen mai
- Cua hang san pham mau
- Blog va Tin tuc
- Huong dan in 3D
- Thu vien vat lieu
- Showcase (trung bay san pham)
- Lien he va Ho tro
- Tim kiem san pham
- Doi tac
- Tuyen dung
- Chinh sach (Dieu khoan, Bao mat, Hoan tien, Van chuyen)

---

## Cong nghe su dung

### Frontend

| Cong nghe | Phien ban | Mo ta |
|-----------|-----------|-------|
| Next.js | 16.0.7 | React framework voi App Router |
| React | 19.2.0 | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| TailwindCSS | 4.x | Utility-first CSS |
| Radix UI | Latest | Accessible UI components |
| Three.js | 0.181 | 3D visualization |
| React Three Fiber | 9.4 | React renderer cho Three.js |
| React Three Drei | 10.7 | Helpers cho React Three Fiber |
| TanStack React Query | 5.90 | Server state management |
| React Hook Form | 7.69 | Form management |
| Zod | 4.2 | Schema validation |
| Lucide React | 0.552 | Icon library |
| class-variance-authority | 0.7 | Component variant management |

### Development

| Tool | Mo ta |
|------|-------|
| pnpm | Package manager (khuyen nghi) |
| ESLint | Linting |
| Prettier | Code formatting |
| Docker | Containerization |
| React Compiler (babel-plugin) | Tu dong toi uu component |

---

## Cai dat

### Yeu cau he thong

- **Node.js** >= 18
- **pnpm** (khuyen nghi) hoac npm/yarn
- **Backend API** dang chay (mac dinh: `http://localhost:8000`)

### Buoc 1: Clone repository

```bash
git clone https://github.com/hoangduc102/co3027-electronic-commerce-print-3d.git
cd co3027-electronic-commerce-print-3d
```

### Buoc 2: Cai dat dependencies

```bash
pnpm install
```

### Buoc 3: Cau hinh moi truong

Tao file `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Buoc 4: Chay development server

```bash
pnpm dev
```

Mo trinh duyet: **http://localhost:3000**

---

## Cau truc du an

```
src/
|-- app/                          # Next.js App Router
|   |-- (public)/                 # Cac trang cong khai
|   |   |-- about/                # Gioi thieu
|   |   |-- blog/                 # Blog & tin tuc
|   |   |-- careers/              # Tuyen dung
|   |   |-- checkout/             # Thanh toan
|   |   |-- contact/              # Lien he
|   |   |-- guidelines/           # Huong dan
|   |   |-- materials/            # Thu vien vat lieu
|   |   |-- partners/             # Doi tac
|   |   |-- privacy/              # Chinh sach bao mat
|   |   |-- quote/                # Bao gia
|   |   |-- refund/               # Chinh sach hoan tien
|   |   |-- search/               # Tim kiem
|   |   |-- shipping/             # Chinh sach van chuyen
|   |   |-- showcase/             # Trung bay san pham
|   |   |-- store/                # Cua hang
|   |   |-- support/              # Ho tro
|   |   +-- terms/                # Dieu khoan
|   |-- api/chat/                 # API route cho chatbot
|   |-- dashboard/                # Dashboard nguoi dung
|   |-- login/                    # Dang nhap
|   |-- register/                 # Dang ky
|   |-- user/                     # Ho so nguoi dung
|   |-- layout.tsx                # Root layout
|   |-- page.tsx                  # Trang chu
|   |-- globals.css               # Global styles
|   |-- robots.ts                 # SEO robots config
|   +-- sitemap.ts                # SEO sitemap config
|
|-- components/                   # React components
|   |-- auth/                     # Components xac thuc
|   |-- chatbot/                  # Components chatbot
|   |-- checkout/                 # Components thanh toan
|   |-- dashboard/                # Components dashboard
|   |-- home/                     # Components trang chu
|   |-- layout/                   # Header, Footer
|   |-- navigation/               # Components dieu huong
|   |-- provider/                 # Context providers
|   |-- quote/                    # Components bao gia
|   |-- seo/                      # Components SEO
|   |-- store/                    # Components cua hang
|   +-- ui/                       # UI primitives (shadcn/ui)
|
|-- config/                       # Cau hinh
|   +-- api.config.ts             # API endpoints & auth endpoints
|
|-- contexts/                     # React Contexts
|   |-- AuthContext.tsx            # Quan ly authentication
|   +-- CartContext.tsx            # Quan ly gio hang
|
|-- hooks/                        # Custom hooks
|   |-- use-file-upload.ts        # Upload file
|   +-- use-price-calculator.ts   # Tinh gia
|
|-- lib/                          # Utilities
|   |-- constants.ts              # Hang so
|   |-- data.ts                   # Mock data
|   |-- seo.config.ts             # SEO configuration
|   |-- types.ts                  # TypeScript types
|   +-- utils.ts                  # Helper functions
|
|-- schemas/                      # Zod validation schemas
|   |-- checkout.schema.ts        # Schema thanh toan
|   |-- order.schema.ts           # Schema don hang
|   |-- payment.schema.ts         # Schema thanh toan
|   |-- print-files.schema.ts     # Schema file in
|   +-- product.schema.ts         # Schema san pham
|
|-- services/                     # API services
|   |-- auth.service.ts           # Authentication API
|   |-- httpClient.ts             # HTTP client voi interceptors
|   |-- order.api.ts              # Order API
|   |-- payment.api.ts            # Payment API
|   |-- product.api.ts            # Product API
|   +-- user-profile.service.ts   # User profile API
|
|-- types/                        # TypeScript type definitions
|   |-- order.ts                  # Order types
|   |-- payment.type.ts           # Payment types
|   |-- print-file.types.ts       # Print file types
|   |-- product.types.ts          # Product types
|   +-- user.types.ts             # User types
|
+-- utils/                        # Tien ich
    |-- tokenRefresh.ts           # Auto refresh token
    +-- tokenStorage.ts           # Quan ly localStorage
```

---

## Authentication

He thong xac thuc su dung **JWT (JSON Web Tokens)**:

| Token | Thoi han | Mo ta |
|-------|----------|-------|
| Access Token | 15 phut | Xac thuc API requests |
| Refresh Token | 7 ngay | Lam moi access token |

### Tinh nang

- Tu dong refresh token khi het han
- Tu dong retry request khi token het han (HTTP interceptor)
- Tokens luu trong localStorage
- Protected routes voi `ProtectedRoute` component
- Global auth state voi React Context (`AuthContext`)
- Cart state persist vao localStorage (`CartContext`)

### API Endpoints

| Endpoint | Mo ta |
|----------|-------|
| `/auth/register` | Dang ky tai khoan |
| `/auth/login` | Dang nhap |
| `/auth/refresh` | Lam moi token |
| `/auth/logout` | Dang xuat |
| `/auth/me` | Lay thong tin user hien tai |

### Cau truc files

```
src/
|-- config/api.config.ts          # API endpoints
|-- contexts/
|   |-- AuthContext.tsx            # Auth state management
|   +-- CartContext.tsx            # Cart state management
|-- services/
|   |-- auth.service.ts           # Auth API calls
|   +-- httpClient.ts             # HTTP client voi interceptors
|-- utils/
|   |-- tokenStorage.ts           # Token CRUD
|   +-- tokenRefresh.ts           # Auto refresh logic
+-- components/auth/
    +-- ProtectedRoute.tsx        # Route protection
```

---

## Scripts

| Script | Lenh | Mo ta |
|--------|------|-------|
| dev | `pnpm dev` | Chay development server |
| build | `pnpm build` | Build production |
| start | `pnpm start` | Chay production build |
| lint | `pnpm lint` | Kiem tra ESLint |
| lint:fix | `pnpm lint:fix` | Sua loi ESLint + format |
| format | `pnpm format` | Format code voi Prettier |

---

## Trien khai Docker

### Yeu cau

- **Docker** >= 20.10
- **Docker Compose** >= 2.0

### Quick Start

```bash
# 1. Tao file moi truong
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.production

# 2. Build va chay
docker-compose up -d --build

# 3. Truy cap http://localhost:3000
```

### Kien truc Docker

Dockerfile su dung **multi-stage build** de toi uu:

| Stage | Mo ta |
|-------|-------|
| Stage 1 (deps) | Cai dat dependencies voi pnpm |
| Stage 2 (builder) | Build Next.js standalone |
| Stage 3 (runner) | Production image (~200-300MB) |

**Loi ich:**

- Image nho gon
- Chay voi non-root user (bao mat)
- Layer caching tang toc build
- Standalone output tu dong bundle dependencies

### Cac lenh thuong dung

```bash
# Xem logs
docker-compose logs -f print-3d

# Dung container
docker-compose down

# Rebuild khong cache
docker-compose build --no-cache && docker-compose up -d

# Vao container debug
docker exec -it print-3d-app sh
```

### Health Check

Container tu dong kiem tra suc khoe:

| Cau hinh | Gia tri |
|----------|---------|
| Interval | 30s |
| Timeout | 10s |
| Start period | 40s |
| Retries | 3 |

### Docker Compose Configuration

- Container name: `print-3d-app`
- Port mapping: `3000:3000`
- Network: `print-3d-network` (bridge)
- Restart policy: `unless-stopped`
- Environment variables duoc inject tu `.env.production`

---

## Giay phep

Du an duoc phat hanh theo giay phep **MIT**. Xem file [LICENSE](LICENSE) de biet them chi tiet.

---

**Made with love by HCMUT Students**

*CO3027 - Electronic Commerce*

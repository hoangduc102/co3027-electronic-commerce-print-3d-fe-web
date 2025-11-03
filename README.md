## Cung cấp dịch vụ đặt in 3D trực tuyến

Dự án web cho phép người dùng tải mô hình 3D, cấu hình vật liệu/kích thước/chất lượng, báo giá tức thì và đặt in trực tuyến. Xây dựng trên Next.js App Router.

### Yêu cầu hệ thống

- Node.js >= 18
- pnpm (khuyến nghị) hoặc npm/yarn
- Backend API chạy tại `http://localhost:3000` (hoặc cấu hình trong `.env.local`)

### Cài đặt và chạy

1. Cài đặt dependencies:

```bash
pnpm install
```

2. Tạo file `.env.local` (xem `.env.example` nếu có):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Chạy development server:

```bash
pnpm dev
# mở http://localhost:3001 (hoặc port Next.js hiển thị)
```

### Authentication

Dự án sử dụng JWT-based authentication tích hợp với backend:

- **Access Token**: Hết hạn sau 15 phút
- **Refresh Token**: Hết hạn sau 7 ngày
- Tokens được lưu trong localStorage
- Tự động refresh token khi access token hết hạn

#### Cấu trúc Authentication:

- `src/config/api.config.ts`: Cấu hình API endpoints
- `src/utils/tokenStorage.ts`: Quản lý lưu trữ tokens
- `src/services/auth.service.ts`: Service gọi API authentication
- `src/services/httpClient.ts`: HTTP client với auto token refresh
- `src/contexts/AuthContext.tsx`: React Context quản lý auth state
- `src/components/auth/ProtectedRoute.tsx`: Component bảo vệ routes

### Scripts

- `dev`: chạy máy chủ phát triển
- `build`: build sản phẩm
- `start`: chạy sản phẩm sau build
- `lint`: chạy ESLint

### Docker Deployment

Dự án đã được cấu hình sẵn để chạy trong Docker với Next.js standalone mode. Dockerfile sử dụng multi-stage build để tối ưu kích thước image và tăng tốc độ build.

#### Yêu cầu hệ thống:

- **Docker** >= 20.10 ([Download Docker](https://www.docker.com/get-started))
- **Docker Compose** >= 2.0 (khuyến nghị) ([Download Docker Compose](https://docs.docker.com/compose/install/))

Kiểm tra cài đặt:
```bash
docker --version
docker-compose --version
```

#### Kiến trúc Docker Image

Dockerfile sử dụng **multi-stage build** gồm 3 giai đoạn:

1. **Stage 1 (deps)**: Cài đặt dependencies với pnpm
2. **Stage 2 (builder)**: Build ứng dụng Next.js với standalone output
3. **Stage 3 (runner)**: Image production nhẹ, chỉ chứa code đã build và dependencies cần thiết

Lợi ích:
- Image cuối cùng nhỏ gọn (~200-300MB)
- Không chứa source code, node_modules gốc, và dev dependencies
- Tăng tốc độ build nhờ layer caching
- Bảo mật tốt hơn (chạy với non-root user)

---

#### Phương pháp 1: Sử dụng Docker Compose (Khuyến nghị)

Docker Compose giúp quản lý container dễ dàng hơn với cấu hình tập trung.

##### Bước 1: Tạo file môi trường

Tạo file `.env.production` trong thư mục gốc của dự án:

```bash
# Windows (PowerShell)
New-Item -Path .env.production -ItemType File

# Linux/Mac
touch .env.production
```

Thêm nội dung vào file `.env.production`:

```env
# URL của Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Môi trường
NODE_ENV=production

# Tắt telemetry của Next.js
NEXT_TELEMETRY_DISABLED=1
```

**Lưu ý**: 
- Thay đổi `NEXT_PUBLIC_API_URL` theo URL thực tế của backend API
- Nếu backend chạy trong Docker network, có thể dùng tên service thay vì `localhost`

##### Bước 2: Build và khởi chạy container

```bash
# Build image và chạy container ở chế độ background
docker-compose up -d --build
```

Lệnh này sẽ:
- Build Docker image từ Dockerfile
- Tạo network `print-3d-network`
- Chạy container `print-3d-app` ở chế độ detached (background)
- Map port 3000 của container ra port 3000 của host

##### Bước 3: Kiểm tra trạng thái

```bash
# Xem trạng thái các container
docker-compose ps

# Kiểm tra health check
docker-compose ps | grep print-3d
```

Bạn sẽ thấy trạng thái `healthy` nếu container đã sẵn sàng.

##### Bước 4: Truy cập ứng dụng

Mở trình duyệt và truy cập: **http://localhost:3000**

##### Xem logs (quan trọng để debug)

```bash
# Xem logs real-time của tất cả services
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f print-3d

# Xem 100 dòng logs gần nhất
docker-compose logs --tail=100 print-3d
```

##### Dừng và xóa container

```bash
# Dừng container (giữ lại data và network)
docker-compose stop

# Dừng và xóa container, network (không xóa image)
docker-compose down

# Dừng và xóa tất cả bao gồm volumes (nếu có)
docker-compose down -v
```

##### Rebuild sau khi thay đổi code

```bash
# Rebuild image và restart container
docker-compose up -d --build

# Hoặc rebuild không cache (nếu gặp vấn đề với cache)
docker-compose build --no-cache
docker-compose up -d
```

---

#### Phương pháp 2: Sử dụng Docker trực tiếp

Phù hợp khi bạn muốn kiểm soát chi tiết hơn hoặc tích hợp vào CI/CD pipeline.

##### Bước 1: Build Docker image

```bash
# Build image với tag
docker build -t print-3d:latest .

# Build với tag và version
docker build -t print-3d:1.0.0 -t print-3d:latest .
```

**Lưu ý**: Quá trình build có thể mất 3-5 phút lần đầu tiên.

##### Bước 2: Kiểm tra image đã build

```bash
# Liệt kê các images
docker images | grep print-3d

# Xem chi tiết image
docker inspect print-3d:latest
```

##### Bước 3: Chạy container

**Cách 1: Sử dụng biến môi trường trực tiếp**

```bash
docker run -d \
  --name print-3d-app \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  --restart unless-stopped \
  print-3d:latest
```

**Cách 2: Sử dụng file .env.production**

```bash
docker run -d \
  --name print-3d-app \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  print-3d:latest
```

**Giải thích các tham số:**
- `-d`: Chạy ở chế độ detached (background)
- `--name print-3d-app`: Tên container
- `-p 3000:3000`: Map port (host:container)
- `-e`: Thiết lập biến môi trường
- `--env-file`: Load biến môi trường từ file
- `--restart unless-stopped`: Tự động restart khi container bị dừng

##### Bước 4: Kiểm tra container đang chạy

```bash
# Xem danh sách containers
docker ps

# Xem thông tin chi tiết
docker ps | grep print-3d-app

# Kiểm tra health status
docker inspect print-3d-app | grep -A 10 Health
```

##### Bước 5: Xem logs

```bash
# Xem logs real-time
docker logs -f print-3d-app

# Xem 50 dòng logs gần nhất
docker logs --tail=50 print-3d-app

# Xem logs với timestamp
docker logs -f -t print-3d-app
```

##### Dừng và xóa container

```bash
# Dừng container
docker stop print-3d-app

# Khởi động lại container đã dừng
docker start print-3d-app

# Dừng và xóa container
docker rm -f print-3d-app
```

##### Xóa image

```bash
# Xóa image (phải dừng và xóa container trước)
docker rmi print-3d:latest

# Xóa image không cần xác nhận
docker rmi -f print-3d:latest
```

---

#### Kiểm tra và Debug

##### Kiểm tra ứng dụng hoạt động

```bash
# Kiểm tra bằng curl (nếu có cài curl)
curl http://localhost:3000

# Kiểm tra response status
curl -I http://localhost:3000

# Trên Windows PowerShell
Invoke-WebRequest -Uri http://localhost:3000 -Method Head
```

##### Kiểm tra health check

Container tự động có health check được cấu hình:
- Kiểm tra mỗi 30 giây
- Timeout: 10 giây
- Start period: 40 giây (thời gian để ứng dụng khởi động)
- Retries: 3 lần

```bash
# Với docker-compose
docker-compose ps

# Với docker
docker ps --format "table {{.Names}}\t{{.Status}}"
```

##### Vào bên trong container (debug)

```bash
# Vào container đang chạy
docker exec -it print-3d-app sh

# Kiểm tra các file và thư mục
ls -la
cat package.json

# Kiểm tra process đang chạy
ps aux

# Thoát container
exit
```

##### Kiểm tra network (nếu dùng docker-compose)

```bash
# Xem networks
docker network ls

# Inspect network
docker network inspect print-3d_print-3d-network

# Kiểm tra container trong network
docker network inspect print-3d_print-3d-network | grep -A 5 Containers
```

---

#### Troubleshooting (Xử lý sự cố)

##### Container không start hoặc crash ngay

```bash
# Xem logs để tìm lỗi
docker-compose logs print-3d
# hoặc
docker logs print-3d-app

# Kiểm tra xem port 3000 đã bị sử dụng chưa
# Windows
netstat -ano | findstr :3000
# Linux/Mac
lsof -i :3000
```

**Giải pháp**: Đổi port trong docker-compose.yml hoặc dừng service đang dùng port 3000.

##### Container chạy nhưng không truy cập được

1. Kiểm tra firewall/antivirus có chặn port 3000
2. Kiểm tra container có expose đúng port:
   ```bash
   docker ps | grep print-3d
   ```
3. Thử truy cập bằng IP thay vì localhost:
   ```bash
   # Windows (PowerShell)
   (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}).IPAddress
   
   # Linux/Mac
   ifconfig | grep "inet "
   ```

##### Build bị lỗi hoặc chậm

```bash
# Xóa cache và build lại
docker-compose build --no-cache

# Hoặc với docker
docker build --no-cache -t print-3d:latest .
```


### Cấu trúc thư mục

- `src/app`: App Router (trang, layout, styles)
- `public`: tài nguyên tĩnh (icons, hình ảnh)
- `Dockerfile`: Multi-stage Dockerfile cho production
- `docker-compose.yml`: Cấu hình Docker Compose
- `.dockerignore`: Files bị loại trừ khỏi Docker build

### Roadmap tính năng (dự kiến)

- Upload mô hình 3D (STL/OBJ)
- Cấu hình in: vật liệu, layer height, infill, màu sắc
- Báo giá tự động theo thể tích/thời gian in
- Giỏ hàng và thanh toán
- Quản trị đơn hàng, trạng thái in

### Giấy phép

Phát hành theo giấy phép MIT. Xem tệp `LICENSE`.

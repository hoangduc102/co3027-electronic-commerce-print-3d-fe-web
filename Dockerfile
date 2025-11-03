# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code và config files
COPY . .
# Không copy .env files vì sẽ được inject qua docker-compose hoặc runtime

# Build Next.js application với standalone output
# Next.js sẽ tự động phát hiện output: "standalone" trong next.config.ts
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tạo non-root user để chạy ứng dụng (bảo mật)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy các file từ standalone output
# Standalone mode đã tự động bundle tất cả dependencies cần thiết
COPY --from=builder /app/public ./public

# Tự động tạo output folder
RUN mkdir -p .next/static

# Copy standalone server và static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set quyền sở hữu cho toàn bộ app directory
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check (kiểm tra root endpoint)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/ || exit 1

# Start ứng dụng
# Trong standalone mode, Next.js tạo file server.js tự động
CMD ["node", "server.js"]


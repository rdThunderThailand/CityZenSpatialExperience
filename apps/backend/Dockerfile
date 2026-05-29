# Base node image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ==========================================
# Stage 1: Dependencies and Build
# ==========================================
FROM base AS builder

# Copy package configurations and lockfile
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/database/package.json ./packages/database/

# Install dependencies for the entire workspace
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Generate Prisma Client
RUN pnpm --filter @cityzen/database generate

# Build the backend application
RUN pnpm --filter backend build

# Install production dependencies only (pruning devDependencies)
# We use a separate folder to keep the production node_modules clean
WORKDIR /prod-deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/database/package.json ./packages/database/
RUN pnpm install --prod --frozen-lockfile
# Generate Prisma client again for the production node_modules
COPY packages/database/schema.prisma ./packages/database/
RUN pnpm --filter @cityzen/database generate

# ==========================================
# Stage 2: Production Runner
# ==========================================
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app

# Copy production node_modules from builder
COPY --from=builder --chown=appuser:appgroup /prod-deps/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /prod-deps/apps/backend/node_modules ./apps/backend/node_modules

# Copy the compiled backend output
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=appuser:appgroup /app/apps/backend/package.json ./apps/backend/

# Copy the database package (needed for Prisma schema/engine at runtime)
COPY --from=builder --chown=appuser:appgroup /app/packages/database ./packages/database

# Expose the WebSocket/REST port
EXPOSE 3000

# Run the backend
CMD ["node", "apps/backend/dist/main.js"]

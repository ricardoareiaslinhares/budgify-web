# 1. Base image for building
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source
COPY . .

# Build the app
RUN npm run build

# 2. Production image
FROM node:20-alpine AS runner

# Set environment variables
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Only copy required files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules

# Start app
CMD ["npm", "start"]
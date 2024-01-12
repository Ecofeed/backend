FROM node:16 as builder

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm ci


# Copy application code
COPY . .

# Build the application
RUN npm run build 

# Start a new stage
FROM node:16-alpine  

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
COPY . .

RUN npm ci --production
RUN npx prisma generate

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/build ./build


# Expose the port
EXPOSE 5000

# Ensure Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000 || exit 1

# Define the command to start the application
CMD ["node", "build/server.js"]
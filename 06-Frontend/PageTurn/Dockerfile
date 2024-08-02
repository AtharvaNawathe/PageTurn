# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli@17

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application with production configuration
RUN ng build --configuration production

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist/page-turn /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

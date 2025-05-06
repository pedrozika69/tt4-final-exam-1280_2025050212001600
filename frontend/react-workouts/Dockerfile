# Step 1: Use official Node image to build the app
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Use official Nginx image to serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Этап сборки приложения
FROM node:alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап запуска Nginx
FROM nginx:stable-alpine

# Копируем собранное приложение в Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]

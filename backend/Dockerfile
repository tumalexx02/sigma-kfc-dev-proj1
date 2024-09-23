FROM golang:1.22.6-alpine AS builder

WORKDIR /app
RUN apk --no-cache add bash git
COPY ["go.mod", "go.sum", "./"]
RUN go mod download
# Копируем файлы проекта
COPY . .

# Сборка приложения
RUN go build -o /bin/app cmd/main.go

# Финальный образ
FROM alpine:latest

WORKDIR /app

# Копируем необходимые файлы из сборочного этапа
COPY --from=builder /bin/app /bin/app
COPY --from=builder /app/configs/config.yaml /app/configs/config.yaml
COPY --from=builder /app/migrations /app/migrations

CMD ["/bin/app"]

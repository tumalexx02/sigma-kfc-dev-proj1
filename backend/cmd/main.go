package main

import (
	"backend/internal/config"
	"backend/internal/database"
	handler "backend/internal/handlers/rest"
	"backend/internal/service"
	"backend/web/server"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"os"
)

func main() {
	logrus.SetFormatter(&logrus.JSONFormatter{})
	if err := config.InitConfig(); err != nil {
		logrus.Info("Config init error: ", err)
		os.Exit(1)
	}
	db, err := database.NewPostgresDB(database.Config{
		Host:          os.Getenv("dbhost"),
		Port:          viper.GetString("db.dbport"),
		User:          viper.GetString("db.username"),
		Password:      os.Getenv("DB_PASSWORD"),
		Database:      viper.GetString("db.dbname"),
		SSLMode:       viper.GetString("db.sslmode"),
		MigrationPath: "/app/migrations",
		IsReload:      viper.GetBool("db.isreload"),
	})
	if err != nil {
		logrus.Info("Database init error: ", err)
		os.Exit(1)
	}
	dbase := database.NewDatabase(db)
	services := service.NewService(dbase)
	handlers := handler.NewHandler(services)

	// Настройки CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Замените на нужный вам источник
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	srv := new(server.Server)
	port := os.Getenv("PORT")

	// Оборачиваем маршруты в CORS middleware
	handlerWithCors := corsHandler.Handler(handlers.InitRoutes())

	if err = srv.Run(port, handlerWithCors); err != nil {
		logrus.Info("Server init error: ", err)
		os.Exit(1)
	}
}

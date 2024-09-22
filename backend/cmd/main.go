package main

import (
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/service"
	handler "backend/internal/transport/rest"
	"backend/web/server"
	_ "github.com/lib/pq"
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
		Host:     viper.GetString("db.dbhost"),
		Port:     viper.GetString("db.dbport"),
		User:     viper.GetString("db.username"),
		Password: os.Getenv("DB_PASSWORD"),
		Database: viper.GetString("db.dbname"),
		SSLMode:  viper.GetString("db.sslmode"),
	})
	if err != nil {
		logrus.Info("Database init error: ", err)
		os.Exit(1)
	}
	dbase := database.NewDatabase(db)
	services := service.NewService(dbase)
	handlers := handler.NewHandler(services)

	srv := new(server.Server)
	port := os.Getenv("PORT")
	if err = srv.Run(port, handlers.InitRoutes()); err != nil {
		logrus.Info("Server init error: ", err)
		os.Exit(1)
	}
}

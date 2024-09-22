package service

import (
	"backend/internal/database"
	"backend/internal/models/user"
)

type Authorization interface {
	CreateUser(user user.User) (int, error)
	GenerateToken(name, password string) (string, error)
}

type Service struct {
	Authorization
}

func NewService(db *database.Database) *Service {
	return &Service{
		Authorization: NewAuthService(db.Authorization),
	}
}

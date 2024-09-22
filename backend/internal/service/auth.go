package service

import (
	"backend/internal/database"
	"backend/internal/models/user"
	"crypto/sha1"
	"fmt"
	"os"
)

type AuthService struct {
	db database.Authorization
}

func NewAuthService(db database.Authorization) *AuthService {
	return &AuthService{db: db}
}

func (s *AuthService) CreateUser(user user.User) (int, error) {
	user.Password = generatePasswordHash(user.Password)
	return s.db.CreateUser(user)
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	salt := os.Getenv("salt")
	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}

package service

import (
	"backend/internal/database"
	"backend/internal/models/user"
	"crypto/sha1"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"os"
	"time"
)

type AuthService struct {
	db database.Authorization
}

type tokenClaims struct {
	jwt.StandardClaims
	UserId int `json:"user_id"`
}

func NewAuthService(db database.Authorization) *AuthService {
	return &AuthService{db: db}
}

func (s *AuthService) CreateUser(user user.User) (int, error) {
	user.Password = generatePasswordHash(user.Password)
	return s.db.CreateUser(user)
}
func (s *AuthService) GenerateToken(email, password string) (string, error) {
	users, err := s.db.GetUser(email, generatePasswordHash(password))
	if err != nil {
		return "", err
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(12 * time.Hour).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		users.Id})
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	salt := os.Getenv("salt")
	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}

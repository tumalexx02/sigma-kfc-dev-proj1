package database

import (
	"backend/internal/models/user"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}
func (auth *AuthPostgres) CreateUser(user user.User) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id", userTable)
	row := auth.db.QueryRow(query, user.Name, user.Email, user.Password)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return 0, nil
}

func (auth *AuthPostgres) GetUser(email, password string) (user.User, error) {
	var userz user.User
	query := fmt.Sprintf("SELECT email FROM %s WHERE email=$1 AND password_hash=$2", userTable)
	err := auth.db.Get(&userz, query, email, password)
	return userz, err
}

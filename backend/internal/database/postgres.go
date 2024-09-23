package database

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/pressly/goose"
)

const (
	userTable = "users"
)

type Config struct {
	Host          string
	Port          string
	User          string
	Password      string
	Database      string
	SSLMode       string
	MigrationPath string
	IsReload      bool
}

func NewPostgresDB(cfg Config) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.Database, cfg.SSLMode))
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err != nil {
		return nil, err
	}
	if err = InitMigrations(db.DB, cfg.MigrationPath, cfg); err != nil {
		return nil, err
	}
	return db, nil
}

func InitMigrations(db *sql.DB, migrationsPath string, cfg Config) error {
	goose.SetDialect("postgres")
	exist, err := CheckTableExists(db, userTable)
	if err != nil {
		return err
	}
	if exist && cfg.IsReload {
		if err = goose.Down(db, migrationsPath); err != nil {
			return fmt.Errorf("failed to apply migrations: %w", err)
		}
	}
	if err = goose.Up(db, migrationsPath); err != nil {
		return fmt.Errorf("failed to apply migrations: %w", err)
	}
	return nil
}

func CheckTableExists(db *sql.DB, tableName string) (bool, error) {
	query := fmt.Sprintf("SELECT COUNT(*) FROM %s", tableName)
	var result sql.NullString
	if err := db.QueryRow(query).Scan(&result); err != nil {
		return false, err
	}
	return result.Valid, nil
}

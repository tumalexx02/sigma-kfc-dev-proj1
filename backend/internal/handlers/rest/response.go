package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type error struct {
	Message string `json:"message"`
	Type    string `json:"type,omitempty"`
}

func NewErrorResponse(c *gin.Context, statusCode int, message string, t string) {
	logrus.Error(message)
	c.AbortWithStatusJSON(statusCode, error{Message: message, Type: t})
}

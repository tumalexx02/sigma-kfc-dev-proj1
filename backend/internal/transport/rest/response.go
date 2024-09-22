package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type error struct {
	Message string `json:"message"`
	Tag     string `json:"tag,omitempty"`
}

func NewErrorResponse(c *gin.Context, statusCode int, message string, tag string) {
	logrus.Error(message)
	c.AbortWithStatusJSON(statusCode, error{Message: message, Tag: tag})
}

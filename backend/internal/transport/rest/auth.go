package handler

import (
	"backend/internal/models/user"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) signUp(c *gin.Context) {
	var input user.User

	if err := c.BindJSON(&input); err != nil {
		NewErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	id, err := h.services.CreateUser(input)
	if err != nil {
		NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type signInInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *Handler) signIn(c *gin.Context) {
	//var input user.User
	//
	//if err := c.BindJSON(&input); err != nil {
	//	NewErrorResponse(c, http.StatusBadRequest, err.Error())
	//	return
	//}
	//id, err := h.services.GenerateToken(input)
	//if err != nil {
	//	NewErrorResponse(c, http.StatusInternalServerError, err.Error())
	//	return
	//}
	//c.JSON(http.StatusOK, map[string]interface{}{
	//	"id": id,
	//})
}

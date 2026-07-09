package main

import (
	"net/http"      // HTTPサーバーを構築するため
	"github.com/gin-gonic/gin" // ginです。webフレームワーク
)

type HealthResponse struct {
	Status string `json:"status"`
}

// HealthAPIの実装
func healthHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json; charset=utf-8")
	c.JSON(http.StatusOK, HealthResponse{
		Status: "ok",
	})
}

func main() {
  router := gin.Default()
	
	// GETメソッドかつ/health にリクエストが来たらこのルーティングが実行されて、healthHandlerが呼び出される
  router.GET("/health", healthHandler)

  router.Run() // デフォルトで0.0.0.0:8080でリッスンします
}

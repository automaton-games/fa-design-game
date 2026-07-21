package main

import (
	"log"
	"net/http" // HTTPサーバーを構築するため

	"github.com/gin-gonic/gin" // ginです。webフレームワーク
)

type healthResponse struct {
	Status string `json:"status"`
}

// healthHandlerは、HTTPサーバーの生存確認用レスポンスを返す
func healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, healthResponse{
		Status: "ok",
	})
}

func main() {
	router := gin.Default()

	// GET /healthへのリクエストをhealthHandlerで処理する
	router.GET("/health", healthHandler)

	// Ginのrouter.Runは、待受アドレスを省略すると0.0.0.0:8080でHTTPサーバーを起動する
	// HTTPサーバーの起動に失敗した場合は、エラーをログに出力してプログラムを終了する
	if err := router.Run(); err != nil {
		log.Fatalf("failed to start HTTP server: %v", err)
	}
}

package main

import (
	"encoding/json" // JSON形式でレスポンスを返すため
	"log"           // サーバー起動時のログ出力
	"net/http"      // HTTPサーバーを構築するため
)

// HealthResponse は/health APIのレスポンスを表す構造体
type HealthResponse struct {
	Status string `json:"status"` // JSONでは"status"というキーで返す
}

// healthHandler は GET /health のリクエストを処理するハンドラー
func healthHandler(w http.ResponseWriter, r *http.Request) {

	// GETメゾッド以外のアクセスは受け付けない
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	// レスポンスをJSON形式で返すことを宣言
	w.Header().Set("Content-Type", "application/json")

	// クライアントへ返すデータを作成
	response := HealthResponse{
		Status: "ok",
	}
	// responseをJSON形式に変換してレスポンスとして送信
	json.NewEncoder(w).Encode(response)
}

func main() {

	// "/health"にアクセスされたらhealthHandlerを実行する
	http.HandleFunc("/health", healthHandler)

	// サーバー起動時のログ
	log.Println("Server started on :8080")

	// ポート8080でHTTPサーバーを起動
	// ListenAndServeはエラーが発生するまで処理を続ける
	log.Fatal(http.ListenAndServe(":8080", nil))
}

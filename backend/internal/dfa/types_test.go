package dfa

/*
terminalで go test ./... もしくは go test ./internal/dfa を実行すると、テストが実行されます。
*/

// DFA 標準ライブラリの読み込み
import (
	"encoding/json" // JSONのエンコードとデコードを行うための標準ライブラリ
	"os"            // ファイル操作を行うための標準ライブラリ
	"reflect"       // リフレクション（実行時に型や値を調べる仕組み）を行うための標準ライブラリ
	"testing"       // テストを行うための標準ライブラリ
)

// TestDFA_JSON は DFA 構造体の JSON 変換のテストを行う関数
// Unmarshal で JSON データを DFA 構造体に変換し、期待される値と比較する
func TestDFA_JSON(t *testing.T) {
	data, err := os.ReadFile("testdata/sample.json")
	if err != nil {
		t.Fatalf("read file failed: %v", err)
	}

	var dfa DFA
	if err := json.Unmarshal(data, &dfa); err != nil {
		t.Fatalf("unmarshal failed: %v", err)
	}

	// 期待する DFA の完成形
	want := DFA{
		States:   []string{"q0", "q1"},
		Alphabet: []string{"0", "1"},
		Start:    "q0",
		Accept:   []string{"q0"},
		Transitions: map[string]map[string]string{
			"q0": {"0": "q1", "1": "q1"},
			"q1": {"0": "q0", "1": "q0"},
		},
	}

	// 構造体全体を一度に比較する
	if !reflect.DeepEqual(dfa, want) {
		t.Errorf("DFA = %#v, want %#v", dfa, want)
	}
}

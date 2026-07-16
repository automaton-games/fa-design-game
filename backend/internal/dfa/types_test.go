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

	// startが"q0"であることを確認（.が「〜の中の」という意味）
	if dfa.Start != "q0" {
		t.Errorf("Expected start state 'q0', got '%s'", dfa.Start)
	}
	// states を確認
	if !reflect.DeepEqual(dfa.States, []string{"q0", "q1"}) {
		t.Errorf("States = %v, want %v", dfa.States, []string{"q0", "q1"})
	}
	// alphabet を確認
	if !reflect.DeepEqual(dfa.Alphabet, []string{"0", "1"}) {
		t.Errorf("Alphabet = %v, want %v", dfa.Alphabet, []string{"0", "1"})
	}
	// accept を確認
	if !reflect.DeepEqual(dfa.Accept, []string{"q0"}) {
		t.Errorf("Accept = %v, want %v", dfa.Accept, []string{"q0"})
	}
	// transitions を確認
	expectedTransitions := map[string]map[string]string{
		"q0": {"0": "q1", "1": "q1"},
		"q1": {"0": "q0", "1": "q0"},
	}
	if !reflect.DeepEqual(dfa.Transitions, expectedTransitions) {
		t.Errorf("Transitions = %v, want %v", dfa.Transitions, expectedTransitions)
	}
}

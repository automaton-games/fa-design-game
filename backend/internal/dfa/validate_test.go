package dfa

import "testing"

/*
DFA の検証関数 Validate() のテストを行います。
*/

// 正常なDFAを１つ作る補助関数
func validDFA() DFA {
	return DFA{
		States:   []string{"q0", "q1"},
		Alphabet: []string{"0", "1"},
		Start:    "q0",
		Accept:   []string{"q0"},
		Transitions: map[string]map[string]string{
			"q0": {"0": "q1", "1": "q1"},
			"q1": {"0": "q0", "1": "q0"},
		},
	}
}

// 正常なDFAはエラーにならないことを確認
func TestValidate_Valid(t *testing.T) {
	if err := Validate(validDFA()); err != nil {
		t.Errorf("正常なDFAでエラーが返りました: %v", err)
	}
}

// 壊れたDFAはエラーになることを確認
func TestValidate_Invalid(t *testing.T) {
	// テストケースの一覧（name＝ケース名、modify＝正常なDFAをどう壊すか）
	// 名前と壊し方を持つ小さな構造体のスライスを作る
	cases := []struct {
		name   string
		modify func(d *DFA)
	}{
		{"states が空", func(d *DFA) { d.States = []string{} }},
		{"start が空", func(d *DFA) { d.Start = "" }},
		{"start が states に無い", func(d *DFA) { d.Start = "q9" }},
		{"accept が states に無い", func(d *DFA) { d.Accept = []string{"q9"} }},
		{"遷移が不足", func(d *DFA) { delete(d.Transitions["q0"], "1") }},
		{"遷移先が states に無い", func(d *DFA) { d.Transitions["q0"]["0"] = "q9" }},
	}

	// 各テストケースを順番に実行する
	for _, c := range cases {
		// サブテストとして実行することで、どのケースが失敗したか分かりやすくなる
		t.Run(c.name, func(t *testing.T) {
			d := validDFA() // 毎回、正常なDFAから始める
			c.modify(&d)    // 1か所だけ壊す(&d でポインタ渡ししているので、元の d が壊れる)
			// 壊れたDFAはエラーになることを確認
			if err := Validate(d); err == nil {
				t.Errorf("エラーになるはずが nil が返りました")
			}
		})
	}
}

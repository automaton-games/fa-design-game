package dfa

import "fmt"

/*
DFA の構造体を受け取ってDFAとして正しいか検証する、ダメなら理由を error で返す
*/

// 要素を1つずつ見て、一致するものがあるか探す
// contains は list の中に target が含まれていれば true を返す。
func contains(list []string, target string) bool {
	// list の中の各要素 v を順番に取り出す
	for _, v := range list {
		// v が target と一致するか調べる
		if v == target {
			return true
		}
	}
	return false
}

// DFA を1個受け取り（d という名前で扱う）、error を返す関数
// 問題があれば error を返す
// 全部OKなら nil（＝エラー無し）を返す
func Validate(d DFA) error {

	// states が空ならエラー
	if len(d.States) == 0 {
		return fmt.Errorf("states が空です")
	}

	// alphabet が１つ以上あるか
	if len(d.Alphabet) == 0 {
		return fmt.Errorf("alphabet が空です")
	}

	// start が空でないか
	if d.Start == "" {
		return fmt.Errorf("start が空です")
	}

	// start が states に含まれるか
	if !contains(d.States, d.Start) {
		return fmt.Errorf("start %q が states に含まれていません", d.Start)
	}

	// accept の各状態が states に含まれるか
	// accept が空でもエラーにはしない（受理状態が無いDFAもあり得る）
	for _, a := range d.Accept {
		if !contains(d.States, a) {
			return fmt.Errorf("accept の状態 %q が states に含まれていません", a)
		}
	}

	// 各 state * 書く alphabet に対して遷移先を検証する
	for _, state := range d.States { // 各状態を順番に取り出す
		for _, symbol := range d.Alphabet { // 各記号を順番に取り出す
			// この state から symbol に対する遷移先が定義されているか
			// d.Transitions[state] は map[string]string 型で、symbol をキーにして遷移先を取り出せる
			// ただし、state が d.Transitions に無い場合は nil が返るので、ok で判定する

			// このstateからの遷移先マップを取り出す,nextに遷移先、okに遷移先が定義されているかの真偽値が入る
			next, ok := d.Transitions[state][symbol]
			// 遷移先が定義されているか
			if !ok {
				return fmt.Errorf("状態 %q の記号 %q に対する遷移が定義されていません", state, symbol)
			}
			// 遷移先が state に含まれるか
			if !contains(d.States, next) {
				return fmt.Errorf("状態 %q の記号 %q の遷移先 %q が states に含まれていません", state, symbol, next)
			}
		}
	}

	return nil
}

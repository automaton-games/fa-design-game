package dfa

type DFA struct {
	States      []string                     `json:"states"`
	Alphabet    []string                     `json:"alphabet"`
	Start       string                       `json:"start"`
	Accept      []string                     `json:"accept"`
	Transitions map[string]map[string]string `json:"transitions"`
}

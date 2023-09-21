def fizzbuzz: .;

def test_input: range(2) + 1;

def printer: [(., " -> ", fizzbuzz) | tostring] | add;

test_input | printer

def fizzbuzz: .;

def test_input: 1,2;

def printer: [(., " -> ", fizzbuzz) | tostring] | add;

test_input | printer

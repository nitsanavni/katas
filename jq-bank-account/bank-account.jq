def deposit(amount;date):
    . + [{amount:amount, date:date}];

def withdraw(amount;date):
    . + [{amount:-amount, date:date}];

def add_balance:
    reduce .[] as $move ([];.+[$move + {balance:(.[-1]//{balance:0}).balance + $move.amount}]);

def print_statement:
    add_balance | map([.date,.amount,.balance] | map(tostring) | join("\t")) | .[];

def init: [];

def bank_account(method; amount; date):
    {
        init: init,
        deposit: deposit(amount; date),
        withdraw: withdraw(amount; date),
        print_statement: print_statement,
    }[method];

($args|fromjson) as $a | bank_account($a[0]; $a[1]//0; $a[2]//"")

def square: . * .;

def product:
    [reduce .[] as $array (null; (. // []) + ($array[] | [.])) // empty];

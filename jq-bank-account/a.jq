def a: . + ["a"];
def b: reduce .[] as $x ([]; . + [$x + " b"]);
{
    a: a,
    b: b
}[$a_or_b]
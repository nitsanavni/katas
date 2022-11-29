reduce .[] as $array (null; $array[] as $element | (. // []) + [$element]) // empty

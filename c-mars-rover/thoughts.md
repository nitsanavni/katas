# Thoughts

- not freeing any allocated memory - may not feel secure
- change declaration: cmd + F6
- use single h file
- `"[.]"`- skip test -> get back to this test at the end
- `// exposed for testing only`
- `CHECK_THAT(..., Equals(...))`
- not all steps are small enough - going from single rover to multiple rovers is too big
    - idea - can extract a method `move_rover(input, rover_number)`
    - extract `get_number_of_rovers(input)`
    - also - concatenating the final positions of the rovers - this can be extracted
      as `join_to_buffer(buffer, str, delimiter)`
- `sprintf` iso `strcat`
- `strlen(buffer)` iso `int first = 1`
    - even better:
      ```C
      int is_empty(const char *s) {
        return !s[0];
      }
      ```
- `memchr` find char in string
- get some mutation tests going
  - [x] suggest\_mutations.py
  - [x] mutate.py
    ```shell
    cat file.py | python mutate.py --line-number 4 --change-to 'print("Hello world!")'
    ```
    ```python
    def mutate(src: str, line_number: number, change_to: str) -> str:
    ```
  - can we use vi to mutate
    - vi +5s/world/noob/ +wq copy-of-test.md


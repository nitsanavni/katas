```python
def get_user_details():
    # using the input keyword to get user details
    name = input("Please enter your name: ")
    age = input("Please enter your age: ")
    
    # using type casting to convert age to integer
    age = int(age)
    
    return name, age

def print_details(name, age):
    # using an f-string to format the output
    print(f"Hello {name}! You are {age} years old.")

def main():
    # this is the main function where program execution will start
    name, age = get_user_details()
    print_details(name, age)

# using a dunder method to ensure main() function is called
if __name__ == "__main__":
    main()
```

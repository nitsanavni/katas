def hello_world():
    return "Hello, World!"


def test_hello_world():
    assert hello_world() == "Hello, World!"


if __name__ == "__main__":
    print(hello_world())

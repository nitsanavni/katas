# Python Code Transformation Example

This code demonstrates an automated code transformation for Python, specifically designed to modify occurrences of certain HTTP status codes in FastAPI applications. The transformation replaces literal HTTP status codes (like `500`) with constants from the `starlette.status` module (e.g., `status.HTTP_500_INTERNAL_SERVER_ERROR`).

## Overview

The code transformation:
- Parses Python code using the `ast` (Abstract Syntax Tree) module.
- Looks for instances of HTTP exceptions raised with specific status codes, such as 500.
- Replaces these literal status codes with the appropriate constants from the `starlette.status` module.
- Inserts the necessary import statement (`from starlette import status`) if it is not already present.

Additionally, the example includes:
- A Bash script to automate the formatting and transformation of Python code.
- Integration with the `Black` formatter for consistent code formatting.

## Example

Given the following input FastAPI code:

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/cause-500")
def cause_500():
    raise HTTPException(status_code=500, detail="This is a 500 error!")
```

The transformation will modify it to:

```python
from fastapi import FastAPI, HTTPException
from starlette import status

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/cause-500")
def cause_500():
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="This is a 500 error!")
```

## Scripts

### Python Script

`replace.py`:
- Parses the Python file using the `ast` module.
- Modifies the AST to replace literal status codes with constants.
- Outputs the transformed code.

### Bash Script

The provided Bash script:
1. Formats the original code using `Black`.
2. Applies the `replace.py` transformation.
3. Formats the transformed code with `Black`.
4. Compares the original and transformed code and prints the differences.

### Usage

To run the transformation:

1. Ensure that `Black` and `astor` are installed:

```bash
pip install black astor
```

2. Run the Bash script:

```bash
./your_script.sh example.py
```

The script will:
- Format the original file.
- Transform the code.
- Reformat the transformed file.
- Show the differences between the original and transformed code.

## Questions

### Is the result guaranteed to be syntactically correct Python?
Yes. The script relies on the `ast` module to ensure the syntax remains valid.

### Why single quotes?
The `astor` library defaults to single quotes when converting the AST back into source code. `Black` can handle this discrepancy during reformatting.

### Can diff tools ignore single/double quotes?
Yes, some diff tools can be configured to ignore differences in quote styles. Alternatively, using `Black` ensures consistent formatting.

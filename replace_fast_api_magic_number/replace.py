import ast
import astor

class StatusCodeTransformer(ast.NodeTransformer):
    def __init__(self):
        super().__init__()
        self.status_used = False  # Track if status import is needed

    def visit_Raise(self, node):
        # Check if the exception being raised is an HTTPException
        if isinstance(node.exc, ast.Call) and isinstance(node.exc.func, ast.Name) and node.exc.func.id == "HTTPException":
            # Find if 500 is used as the status_code
            for keyword in node.exc.keywords:
                if keyword.arg == "status_code" and isinstance(keyword.value, ast.Constant) and keyword.value.value == 500:
                    # Replace the magic number 500 with status.HTTP_500_INTERNAL_SERVER_ERROR
                    keyword.value = ast.Attribute(
                        value=ast.Name(id='status', ctx=ast.Load()),
                        attr='HTTP_500_INTERNAL_SERVER_ERROR',
                        ctx=ast.Load()
                    )
                    self.status_used = True  # Mark that status is used
        return node

def transform_code(source_code):
    # Parse the source code into an AST
    tree = ast.parse(source_code)
    
    # Apply the transformation
    transformer = StatusCodeTransformer()
    transformer.visit(tree)

    # Insert the import statement for status only if it's used
    if transformer.status_used:
        # Check if the 'status' import already exists
        for node in tree.body:
            if isinstance(node, ast.ImportFrom) and node.module == "starlette" and any(alias.name == "status" for alias in node.names):
                break
        else:
            # Insert the import after the first existing import
            import_status = ast.ImportFrom(module="starlette", names=[ast.alias(name="status", asname=None)], level=0)
            for i, node in enumerate(tree.body):
                if isinstance(node, ast.Import) or isinstance(node, ast.ImportFrom):
                    continue
                tree.body.insert(i, import_status)
                break
    
    # Unparse the AST back to source code
    return astor.to_source(tree)

# Example usage:
source_code = """
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/cause-500")
def cause_500():
    raise HTTPException(status_code=500, detail="This is a 500 error!")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
"""

transformed_code = transform_code(source_code)
print(transformed_code)

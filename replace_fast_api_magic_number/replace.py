import ast
import astor
import sys

class StatusCodeTransformer(ast.NodeTransformer):
    def __init__(self):
        super().__init__()
        self.status_used = False  # Track if the status import is needed

    def visit_Raise(self, node):
        if isinstance(node.exc, ast.Call) and isinstance(node.exc.func, ast.Name) and node.exc.func.id == "HTTPException":
            for keyword in node.exc.keywords:
                if keyword.arg == "status_code" and isinstance(keyword.value, ast.Constant) and keyword.value.value == 500:
                    keyword.value = ast.Attribute(
                        value=ast.Name(id='status', ctx=ast.Load()),
                        attr='HTTP_500_INTERNAL_SERVER_ERROR',
                        ctx=ast.Load()
                    )
                    self.status_used = True
        return node

def transform_code(source_code):
    tree = ast.parse(source_code)
    transformer = StatusCodeTransformer()
    transformer.visit(tree)

    if transformer.status_used:
        for node in tree.body:
            if isinstance(node, ast.ImportFrom) and node.module == "starlette" and any(alias.name == "status" for alias in node.names):
                break
        else:
            import_status = ast.ImportFrom(module="starlette", names=[ast.alias(name="status", asname=None)], level=0)
            for i, node in enumerate(tree.body):
                if isinstance(node, ast.Import) or isinstance(node, ast.ImportFrom):
                    continue
                tree.body.insert(i, import_status)
                break
    
    return astor.to_source(tree)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python replace.py <source_code_file>")
        sys.exit(1)

    source_file = sys.argv[1]
    with open(source_file, 'r') as f:
        source_code = f.read()

    transformed_code = transform_code(source_code)
    print(transformed_code)

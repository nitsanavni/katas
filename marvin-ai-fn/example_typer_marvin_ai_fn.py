import typer
import marvin
from pydantic import BaseModel

app = typer.Typer()

class Greeting(BaseModel):
    greeting: str

@marvin.ai_fn
def greet(name: str) -> Greeting:
	pass

@app.command()
def greet_cmd(name: str) -> str:
	print(greet(name).greeting)

if __name__ == "__main__":
	app()

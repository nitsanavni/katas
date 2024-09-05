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

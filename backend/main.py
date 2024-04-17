import uvicorn

# RM
if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=5823, reload=True, workers=1)

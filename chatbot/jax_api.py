from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.jax_chat import JaxChat
from controllers.fraud_models import FraudModels

from pydantic import BaseModel

class Query(BaseModel):
    query: str

class FraudDetails(BaseModel):
    time: int
    type: int
    amount: int
    originBalance: int
    destinationBalance: int
    isFlaggedFraud: int

class ModelRequest(BaseModel):
    fraudDetails: FraudDetails
    model: int

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins as needed
    allow_credentials=True,
    allow_methods=["*"],  # Update with specific methods as needed
    allow_headers=["*"],  # Update with specific headers as needed
)

jax = JaxChat()
fraud_model = FraudModels()

@app.post('/chat')
async def get_task(query: Query):
    function = jax.query(query.query)

    return {"function": function}

@app.post('/predict/fraud')
async def get_task(predict_request: ModelRequest):
    function = fraud_model.predict_dt(predict_request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
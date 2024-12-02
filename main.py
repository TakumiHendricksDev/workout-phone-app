import uvicorn
from fastapi import FastAPI

from backend.accounts.api import router as accounts

description = """
    Workout API gives you the access to many Exercises to help you get in shape. 
    To start use the '/checkout' endpoint to get a subscription and then use the '/exercises' endpoint to get started with your workout. 
    Note you will need to put the api key returned from posting to the checkout endpoint in the 'X-Token' header to access the '/exercises' endpoint.
"""

NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

# Code above omitted 👆

app = FastAPI(
    title="Workout API",
    description=description,
    summary="Workout and Exercise API Endpoints",
    version="0.0.0",
    contact={
        "name": "Takumi Hendricks",
        "email": "TakumiHendricksDev@gmail.com",
        "url": "https://www.takumihendricksportfolio.com"
    },
)

app.include_router(accounts)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
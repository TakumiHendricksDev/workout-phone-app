import os
from dotenv import load_dotenv
from sqlmodel import create_engine

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL", '')
connect_args = {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)


## 1. Setup Virtual environment

1. Create a virtual environment with `python -m venv venv`
2. Activate the virtual environment with `source venv/bin/activate`

## 2. Install dependencies

1. Install frontend dependencies with `npm install`
2. Install backend dependencies with `pip install -r requirements.txt`

## 3. Setup Database

1. Create a new postgres database
2. Setup .env file with the following variables:
```aiignore
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```
3. Run migrations with `alembic upgrade head`

## 4. Run the application

1. Run frontend with `npx expo start`
2. Run backend with `fastapi run`
3. Start NGROK with `ngrok http 8000`
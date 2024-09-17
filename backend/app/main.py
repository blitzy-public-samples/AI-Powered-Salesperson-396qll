from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router
from app.api.quote import router as quote_router
from app.api.user import router as user_router
from app.core.config import get_settings
from app.db.database import init_db

app = FastAPI()

@app.on_event('startup')
async def startup_event():
    await init_db()
    # Perform any other necessary startup tasks

@app.on_event('shutdown')
async def shutdown_event():
    # Close any open connections
    # Perform any other necessary cleanup tasks
    pass

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(chat_router, prefix='/api/chat', tags=['chat'])
app.include_router(quote_router, prefix='/api/quote', tags=['quote'])
app.include_router(user_router, prefix='/api/user', tags=['user'])

@app.get('/')
async def root():
    return {'message': 'Welcome to the AI-powered salesperson chat system'}
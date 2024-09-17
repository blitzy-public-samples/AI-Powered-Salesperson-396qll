from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schema.user import UserCreate, UserResponse
from app.core.security import get_password_hash, verify_password

router = APIRouter()

@router.post('/register', response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Validate user input
    if not user.username or not user.email or not user.password:
        raise HTTPException(status_code=400, detail="All fields are required")
    
    # Check if username or email already exists
    existing_user = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    # Hash the password
    hashed_password = get_password_hash(user.password)
    
    # Create a new user in the database
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Return the created user details
    return UserResponse(
        id=new_user.id,
        username=new_user.username,
        email=new_user.email
    )

# HUMAN ASSISTANCE NEEDED
# The login function has a confidence level below 0.8 and may need adjustments for production readiness
@router.post('/login')
def login(username: str, password: str, db: Session = Depends(get_db)):
    # Query the database for the user
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify the password
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # If authentication successful, generate and return an access token
    # Note: Token generation logic needs to be implemented
    access_token = "dummy_token"  # Replace with actual token generation
    
    return {"access_token": access_token, "token_type": "bearer"}
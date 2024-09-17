from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False)

    def __init__(self, name, email, password_hash, role):
        self.name = name
        self.email = email
        self.password_hash = password_hash
        self.role = role

class SKU(Base):
    __tablename__ = 'skus'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    base_price = Column(Float, nullable=False)
    stock_quantity = Column(Integer, nullable=False)

    def __init__(self, id, name, description, base_price, stock_quantity):
        self.id = id
        self.name = name
        self.description = description
        self.base_price = base_price
        self.stock_quantity = stock_quantity

class Quote(Base):
    __tablename__ = 'quotes'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    status = Column(String, nullable=False)
    total_price = Column(Float, nullable=False)

    user = relationship('User', back_populates='quotes')
    items = relationship('QuoteItem', back_populates='quote')

    def __init__(self, user_id, created_at, updated_at, status, total_price):
        self.user_id = user_id
        self.created_at = created_at
        self.updated_at = updated_at
        self.status = status
        self.total_price = total_price

class QuoteItem(Base):
    __tablename__ = 'quote_items'

    id = Column(Integer, primary_key=True)
    quote_id = Column(Integer, ForeignKey('quotes.id'), nullable=False)
    sku = Column(String, ForeignKey('skus.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    quote = relationship('Quote', back_populates='items')
    sku_item = relationship('SKU')

    def __init__(self, quote_id, sku, quantity, unit_price, total_price):
        self.quote_id = quote_id
        self.sku = sku
        self.quantity = quantity
        self.unit_price = unit_price
        self.total_price = total_price
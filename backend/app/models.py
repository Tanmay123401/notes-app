# (paste the models.py content you already have — or copy from earlier message)
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class NoteBase(SQLModel):
    title: str
    content: Optional[str] = None

class Note(NoteBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class NoteCreate(NoteBase):
    pass

class NoteRead(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

class NoteUpdate(SQLModel):
    title: Optional[str] = None
    content: Optional[str] = None

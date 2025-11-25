# (paste the crud.py content)
from sqlmodel import select
from .models import Note, NoteCreate, NoteUpdate
from .database import engine
from sqlmodel import Session
from datetime import datetime

def create_note(payload: NoteCreate):
    with Session(engine) as session:
        note = Note.from_orm(payload)
        session.add(note)
        session.commit()
        session.refresh(note)
        return note

def get_notes():
    with Session(engine) as session:
        return session.exec(select(Note).order_by(Note.created_at.desc())).all()

def get_note(note_id: int):
    with Session(engine) as session:
        return session.get(Note, note_id)

def update_note(note_id: int, payload: NoteUpdate):
    with Session(engine) as session:
        note = session.get(Note, note_id)
        if not note:
            return None
        if payload.title is not None:
            note.title = payload.title
        if payload.content is not None:
            note.content = payload.content
        note.updated_at = datetime.utcnow()
        session.add(note)
        session.commit()
        session.refresh(note)
        return note

def delete_note(note_id: int):
    with Session(engine) as session:
        note = session.get(Note, note_id)
        if not note:
            return False
        session.delete(note)
        session.commit()
        return True

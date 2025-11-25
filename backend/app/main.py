# (paste the main.py content)
from fastapi import FastAPI, HTTPException
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .models import NoteCreate, NoteRead, NoteUpdate
from . import crud

app = FastAPI(title="Tanmaya Notes POC")

# Allow local frontend (Vite default). Add origins if you host elsewhere.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/notes", response_model=NoteRead)
def create_note_endpoint(payload: NoteCreate):
    return crud.create_note(payload)

@app.get("/notes", response_model=List[NoteRead])
def list_notes():
    return crud.get_notes()

@app.get("/notes/{note_id}", response_model=NoteRead)
def get_note_endpoint(note_id: int):
    note = crud.get_note(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.put("/notes/{note_id}", response_model=NoteRead)
def update_note_endpoint(note_id: int, payload: NoteUpdate):
    note = crud.update_note(note_id, payload)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.delete("/notes/{note_id}")
def delete_note_endpoint(note_id: int):
    ok = crud.delete_note(note_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"ok": True}

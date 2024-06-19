import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editNote, setEditNote] = useState(null);

  const handleAddNote = () => {
    setNotes([...notes, { ...newNote, id: Date.now() }]);
    setNewNote({ title: '', content: '' });
  };

  const handleEditNote = (id) => {
    const updatedNotes = notes.map(note => note.id === id ? editNote : note);
    setNotes(updatedNotes);
    setEditNote(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input 
          placeholder="Title" 
          value={newNote.title} 
          onChange={e => setNewNote({ ...newNote, title: e.target.value })} 
          className="mb-2"
        />
        <Textarea 
          placeholder="Content" 
          value={newNote.content} 
          onChange={e => setNewNote({ ...newNote, content: e.target.value })} 
          className="mb-2"
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(note => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{note.content}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => setEditNote(note)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editNote && (
        <Dialog open={Boolean(editNote)} onOpenChange={() => setEditNote(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <Input 
              placeholder="Title" 
              value={editNote.title} 
              onChange={e => setEditNote({ ...editNote, title: e.target.value })} 
              className="mb-2"
            />
            <Textarea 
              placeholder="Content" 
              value={editNote.content} 
              onChange={e => setEditNote({ ...editNote, content: e.target.value })} 
              className="mb-2"
            />
            <Button onClick={() => handleEditNote(editNote.id)}>Save</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Notes;
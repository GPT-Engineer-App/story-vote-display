import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'Low', status: 'Open', assignedTo: '' });
  const [editTicket, setEditTicket] = useState(null);

  const handleAddTicket = () => {
    setTickets([...tickets, { ...newTicket, id: Date.now() }]);
    setNewTicket({ title: '', description: '', priority: 'Low', status: 'Open', assignedTo: '' });
  };

  const handleEditTicket = (id) => {
    const updatedTickets = tickets.map(ticket => ticket.id === id ? editTicket : ticket);
    setTickets(updatedTickets);
    setEditTicket(null);
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input 
          placeholder="Title" 
          value={newTicket.title} 
          onChange={e => setNewTicket({ ...newTicket, title: e.target.value })} 
          className="mb-2"
        />
        <Textarea 
          placeholder="Description" 
          value={newTicket.description} 
          onChange={e => setNewTicket({ ...newTicket, description: e.target.value })} 
          className="mb-2"
        />
        <Label htmlFor="priority">Priority</Label>
        <Select 
          value={newTicket.priority} 
          onValueChange={value => setNewTicket({ ...newTicket, priority: value })} 
          className="mb-2"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="status">Status</Label>
        <Select 
          value={newTicket.status} 
          onValueChange={value => setNewTicket({ ...newTicket, status: value })} 
          className="mb-2"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Input 
          placeholder="Assigned To" 
          value={newTicket.assignedTo} 
          onChange={e => setNewTicket({ ...newTicket, assignedTo: e.target.value })} 
          className="mb-2"
        />
        <Button onClick={handleAddTicket}>Add Ticket</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map(ticket => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle>{ticket.title}</CardTitle>
              <CardDescription>{ticket.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Priority: {ticket.priority}</p>
              <p>Status: {ticket.status}</p>
              <p>Assigned To: {ticket.assignedTo}</p>
              <Button variant="outline" onClick={() => setEditTicket(ticket)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDeleteTicket(ticket.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editTicket && (
        <Dialog open={Boolean(editTicket)} onOpenChange={() => setEditTicket(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Ticket</DialogTitle>
            </DialogHeader>
            <Input 
              placeholder="Title" 
              value={editTicket.title} 
              onChange={e => setEditTicket({ ...editTicket, title: e.target.value })} 
              className="mb-2"
            />
            <Textarea 
              placeholder="Description" 
              value={editTicket.description} 
              onChange={e => setEditTicket({ ...editTicket, description: e.target.value })} 
              className="mb-2"
            />
            <Label htmlFor="priority">Priority</Label>
            <Select 
              value={editTicket.priority} 
              onValueChange={value => setEditTicket({ ...editTicket, priority: value })} 
              className="mb-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={editTicket.status} 
              onValueChange={value => setEditTicket({ ...editTicket, status: value })} 
              className="mb-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              placeholder="Assigned To" 
              value={editTicket.assignedTo} 
              onChange={e => setEditTicket({ ...editTicket, assignedTo: e.target.value })} 
              className="mb-2"
            />
            <Button onClick={() => handleEditTicket(editTicket.id)}>Save</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Tickets;
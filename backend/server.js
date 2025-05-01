const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data stores
let tickets = [];
let serviceOrders = [];

// Routes for tickets
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.post('/api/tickets', (req, res) => {
  const ticket = { id: Date.now(), ...req.body, status: 'open', createdAt: new Date() };
  tickets.push(ticket);
  res.status(201).json(ticket);
});

app.put('/api/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Ticket not found' });
  tickets[index] = { ...tickets[index], ...req.body };
  res.json(tickets[index]);
});

app.delete('/api/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tickets = tickets.filter(t => t.id !== id);
  res.status(204).send();
});

// Routes for service orders
app.get('/api/service-orders', (req, res) => {
  res.json(serviceOrders);
});

app.post('/api/service-orders', (req, res) => {
  const order = { id: Date.now(), ...req.body, status: 'pending', createdAt: new Date() };
  serviceOrders.push(order);
  res.status(201).json(order);
});

app.put('/api/service-orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = serviceOrders.findIndex(o => o.id === id);
  if (index === -1) return res.status(404).json({ error: 'Service order not found' });
  serviceOrders[index] = { ...serviceOrders[index], ...req.body };
  res.json(serviceOrders[index]);
});

app.delete('/api/service-orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  serviceOrders = serviceOrders.filter(o => o.id !== id);
  res.status(204).send();
});

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

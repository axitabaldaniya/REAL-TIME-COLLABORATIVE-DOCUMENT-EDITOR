// Simple real-time server using socket.io
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// In-memory document store (replace with MongoDB in production)
let documents = {
  // docId: { content: "..." }
};

app.get('/doc/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id, content: documents[id] ? documents[id].content : '' });
});

app.post('/doc/:id/save', (req, res) => {
  const id = req.params.id;
  const content = req.body.content || '';
  documents[id] = { content, updatedAt: new Date() };
  return res.json({ ok: true });
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join-doc', (docId) => {
    socket.join(docId);
    console.log(socket.id, 'joined', docId);
    // send current content
    const current = documents[docId] ? documents[docId].content : '';
    socket.emit('doc-init', current);
  });

  socket.on('doc-change', (payload) => {
    // payload: { docId, delta, content }
    const { docId, content } = payload;
    // update server copy
    documents[docId] = { content, updatedAt: new Date() };
    // broadcast to others in same room
    socket.to(docId).emit('remote-change', payload);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log('Server listening on', PORT);
});

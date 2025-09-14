# Realtime Collaborative Editor - Server

This is a simple Node.js + Express + Socket.IO server for a realtime collaborative editor demo.

How to run:
1. cd server
2. npm install
3. npm start

The server exposes:
- GET /doc/:id           -> load document content (JSON)
- POST /doc/:id/save     -> save document content (JSON body: { content })

Realtime via socket.io messages:
- join-doc (docId)
- doc-init (server -> client) with the full content
- doc-change (client -> server) with { docId, content }
- remote-change (server -> clients) with the same payload

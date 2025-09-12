# Realtime Collaborative Document Editor (Demo)

This repository contains a minimal demo of a realtime collaborative document editor:
- server/ : Node.js + Express + Socket.IO (in-memory doc store, replace with MongoDB for persistence)
- client/ : React app using React-Quill and socket.io-client

Quick start (local):
1. Open two terminals.
2. Terminal A (server):
   cd server
   npm install
   npm start
3. Terminal B (client):
   cd client
   npm install
   npm start
4. Open http://localhost:3000 in two browser windows and use the same Document ID.

Notes:
- This is a demo for educational purposes. For production use:
  - Use Operational Transforms (OT) or CRDTs (e.g., ShareDB, Yjs) for conflict-free editing.
  - Add authentication, access controls, and persistent storage (MongoDB/Postgres).
  - Optimize network usage by sending deltas instead of whole document replacements.

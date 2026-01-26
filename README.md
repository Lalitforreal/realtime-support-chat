# Real-Time Support Chat System  
**HTTP Authentication + Socket.IO Authorization**

A production-style real-time customer support chat application built with **Node.js**, **Express**, **Socket.IO**, and **JWT-based authentication**.

This project demonstrates how to securely combine **HTTP authentication** with **persistent WebSocket connections**, enforce **role-based authorization inside socket events**, and build a scalable chat system with **message persistence, pagination, and ticket lifecycle management**.

---

## Key Highlights

- Guest customers without login
- Secure agent authentication using JWT + cookies
- Socket.IO authentication via handshake
- Role-based access control inside socket events
- One room per ticket (strong isolation)
- Message persistence with MongoDB
- Cursor-based message pagination
- Ticket closing and archival flow
- System messages (agent joined, left, ticket closed)

---

## Tech Stack

- **Node.js**
- **Express**
- **Socket.IO**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **EJS + Tailwind CSS**

---

## Architecture Overview

### Authentication Model

**Agents**
- Authenticate via HTTP (`/agent/login`)
- Receive a JWT stored in an HTTP-only cookie
- Socket.IO automatically receives cookies during handshake
- JWT is verified once during socket connection
- Agent identity is attached to `socket.data`

**Guests**
- No login required
- Assigned a persistent `guestId` stored in cookies
- Guest identity reused across refreshes
- Authorization enforced using `guestId` ownership

> ⚠️ Client never sends role information.  
> Role is derived exclusively on the server.

---

## Ticket-Based Room Design

- Each ticket maps to exactly one room  
  `ticket:<ticketId>`
- Only authorized users can join a room:
  - Guest → only their own ticket
  - Agent → any open ticket
- All messages and system events are scoped to that room

---

## Messaging System

### Message Persistence

Each message is stored in MongoDB with:
- `ticketId`
- `senderRole` (guest / agent / system)
- `senderName`
- `content`
- `createdAt`

Messages are **always saved before broadcasting** to ensure reliability.

---

## Message Pagination (Cursor-Based)

To avoid loading entire chat history:

- Initial page loads the **latest N messages**
- Older messages are fetched using:
  ```js
  createdAt < cursor

  ---

## System Messages

The server generates **system-level messages** to reflect important state changes in the chat.

Examples:
- Agent joined the chat
- Agent left the chat
- Ticket was closed

System messages:
- Are emitted by the server (never the client)
- Are saved to the database with `senderRole: "system"`
- Are rendered differently in the UI (centered, italic)
- Reappear correctly after refresh or reconnection

This ensures chat history remains **contextually accurate**, even across reloads.

---

## Ticket Lifecycle Management

Each ticket follows a clear lifecycle:

### Ticket States
- **open** → messaging allowed
- **closed** → read-only, archived

### Closing a Ticket
- Only agents can close tickets
- Ticket status is updated in the database
- All connected users in the room are notified in real time
- Message input is disabled immediately
- Further messages are rejected at the server level
- Agent is redirected back to the dashboard

This guarantees consistency between **UI state**, **socket state**, and **database state**.

---

## Authorization & Security Model

Security is enforced entirely on the server.

### Key Rules
- Role is **never** accepted from the client
- Role is derived from:
  - JWT (agent)
  - Cookie-based guestId (customer)
- Every socket event validates:
  - Ticket existence
  - Ticket status
  - User authorization

### Ownership Rules
- Guests can only access their own tickets
- Agents can access any open ticket
- Closed tickets reject all chat messages

This prevents privilege escalation and unauthorized access.

---

## Reconnection Handling

Socket reconnections are handled gracefully:

- Client automatically re-joins its ticket room on reconnect
- Server prevents duplicate room joins
- Messages continue without duplication
- Pagination state remains intact

This ensures reliability during:
- Network drops
- Page refreshes
- Agent navigation

---

## UI / UX Behavior

- Messages align based on sender role
  - Right → current user
  - Left → other participant
- System messages are centered and subtle
- Chat auto-scrolls to latest message
- Older messages load without breaking layout
- Closed tickets visually indicate read-only mode

UX behavior always reflects **server truth**.

---

## Design Philosophy

This system is built around **trust boundaries**:

- Clients are considered untrusted
- Server is the single source of truth
- Database persistence comes before broadcasting
- Authorization is checked on every action

The result is a chat system that behaves correctly even under:
- Refreshes
- Reconnections
- Multiple participants
- Long-running conversations

---

## Final Notes

This project mirrors real-world patterns used in:
- Customer support platforms
- Moderated chat systems
- Admin-controlled dashboards
- Live collaboration tools

It demonstrates strong understanding of:
- WebSocket authentication
- Stateless vs persistent identity
- Real-time data consistency
- Secure event-driven design

Built with correctness first — scalability follows naturally.

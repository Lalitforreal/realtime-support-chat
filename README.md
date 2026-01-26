Real-Time Support Chat (HTTP + Socket.IO Authentication)

A production-style real-time customer support chat system built using Express, Socket.IO, and JWT-based authentication, supporting both guest users and authenticated agents with strict role-based authorization.

This project demonstrates how to combine HTTP authentication with persistent Socket.IO sessions, handle real-time messaging, ticket-based chat rooms, and cursor-based message pagination in a scalable way.

⸻

Overview

The system allows customers (guests) to create support tickets without logging in and communicate with agents in real time. Agents authenticate via HTTP, receive a JWT stored in cookies, and are automatically authenticated when connecting through Socket.IO.

Each ticket maps to a dedicated Socket.IO room, ensuring message isolation, authorization, and clean separation of conversations.

⸻

Key Features

Guest Customers
	•	Create support tickets without authentication
	•	Automatically rejoin their ticket using a secure guest cookie
	•	Send and receive real-time messages
	•	Load older messages using pagination
	•	See system events (agent joined, agent left, ticket closed)
	•	Messaging disabled once ticket is closed

Support Agents
	•	Login via HTTP authentication
	•	JWT stored securely in cookies
	•	Socket authentication derived automatically from cookie
	•	View open and closed tickets
	•	Join any ticket chat
	•	Reply to customers in real time
	•	Close tickets and notify customers instantly
	•	Automatic redirect back to dashboard after ticket closure

⸻

Authentication Design

This project uses a hybrid authentication model:
	•	HTTP Authentication for agents
	•	Socket.IO Authentication Middleware for real-time events

How it Works
	1.	Agent logs in via HTTP
	2.	Server verifies credentials and issues a JWT
	3.	JWT is stored in an HTTP-only cookie
	4.	Socket.IO automatically receives the cookie during handshake
	5.	Socket middleware verifies JWT once and attaches:
	•	socket.data.userId
	•	socket.data.role
	•	socket.data.name

Guests do not authenticate but are tracked using a secure guestId cookie.

Client never sends role or identity — the server derives it exclusively.

⸻

Authorization Rules
	•	Guests can only access their own ticket
	•	Agents can access any ticket
	•	Closed tickets block all messaging
	•	All socket events validate role and ownership server-side
	•	No trust is placed in client-sent data

⸻

Ticket & Chat Architecture
	•	One ticket = one Socket.IO room
ticket:<ticketId>
	•	Messages are broadcast only within the ticket room
	•	Agents and guests coexist in the same room
	•	System messages are emitted for lifecycle events

⸻

Message Persistence & Pagination

All messages are stored in MongoDB and loaded incrementally.

Initial Load
	•	The most recent messages are rendered when the chat page loads

Cursor-Based Pagination

Older messages are loaded using a timestamp cursor:
	•	Client requests messages older than the earliest loaded message
	•	Server responds with the next batch
	•	Messages are prepended to the chat window

This avoids page-number pagination and scales efficiently for long conversations.

⸻

System Events

The chat supports system-level events to improve UX:
	•	Agent joined the chat
	•	Agent left the chat
	•	Ticket closed
	•	Connection lost / reconnected

System messages are styled separately and stored consistently.

⸻

Tech Stack
	•	Node.js
	•	Express
	•	Socket.IO
	•	MongoDB + Mongoose
	•	JWT
	•	EJS
	•	Tailwind CSS

⸻

Why This Project Matters

This project goes beyond basic Socket.IO demos and focuses on real-world patterns:
	•	Cookie-based socket authentication
	•	Role-based authorization inside socket events
	•	Ticket-scoped rooms
	•	Message persistence with pagination
	•	Guest identity without login
	•	Clean separation of HTTP and WebSocket concerns

It closely mirrors how real support systems are built in production.

⸻

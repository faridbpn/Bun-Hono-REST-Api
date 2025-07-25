# 🐰 Bun REST API with Hono

This project is a simple and modern RESTful API built using **Bun** and the lightweight **Hono** framework. It's perfect for learning how to build fast, modern, and fully typed APIs with TypeScript.

## 🚀 Tech Stack

- **Bun** – A blazing-fast JavaScript runtime like Node.js
- **Hono** – Lightweight web framework compatible with Bun/Deno/Edge
- **Prisma** – Type-safe ORM for database access
- **Zod** – Schema-based validator for request/response validation
- **PostgreSQL / MySQL / SQLite** – (Adaptable based on your database of choice)

## 📁 Project Structure



```
src/
├── application/ # Configuration and dependencies
├── controller/ # Handler logic for each endpoint
├── model/ # Type definitions for requests and responses
├── repository/ # Database access layer using Prisma
├── route/ # Endpoint routing definitions
├── validation/ # Data validation using Zod
└── index.ts # Main entry point
```

## 🛠️ How To Run

1. Clone repository:
```bash
git clone https://github.com/username/bun-rest-api.git
cd bun-rest-api
```

2. Install dependency:
```bash
bun install
```

3. Setup database dan Prisma:
```bash
bunx prisma generate
bunx prisma migrate dev --name init
```

4. Start server:
```bash
bun run index.ts
```

## 📌 Example Endpoint

-GET /api/contacts – Fetch all contacts

-POST /api/contacts – Create a new contact

-GET /api/contacts/:id – Retrieve contact details by ID

=DELETE /api/contacts/:id – Delete a contact by ID

## 🧪 Testing

> Coming soon – testing dengan Bun + Vitest

## 🤝 Contribute

Contributions, suggestions, and ideas are very welcome. Feel free to fork the repo and submit a pull request!

## 🪪 Lisensi

MIT © 2025 Muhammad Farid

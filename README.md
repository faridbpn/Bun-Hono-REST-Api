# 🐰 Bun REST API with Hono

Project ini adalah RESTful API sederhana yang dibangun dengan **Bun** dan framework ringan **Hono**. Cocok untuk belajar membuat API yang cepat, modern, dan bertipe dengan TypeScript.

## 🚀 Tech Stack

- **Bun** – Runtime super cepat seperti Node.js
- **Hono** – Web framework ringan untuk Bun/Deno/Edge
- **Prisma** – ORM untuk akses database
- **Zod** – Untuk validasi data
- **PostgreSQL / MySQL / SQLite** – (Bisa disesuaikan)

## 📁 Struktur Proyek

```
src/
├── application/       # Konfigurasi dan dependency
├── controller/        # Logika handler setiap endpoint
├── model/             # Tipe data request dan response
├── repository/        # Akses database dengan Prisma
├── route/             # Daftar routing endpoint
├── validation/        # Validasi pakai Zod
└── index.ts           # Entry point utama
```

## 🛠️ Cara Menjalankan

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

4. Jalankan server:
```bash
bun run index.ts
```

## 📌 Contoh Endpoint

- `GET /api/contacts` – Ambil semua kontak
- `POST /api/contacts` – Tambah kontak baru
- `GET /api/contacts/:id` – Ambil detail kontak berdasarkan ID
- `DELETE /api/contacts/:id` – Hapus kontak berdasarkan ID

## 🧪 Testing

> Coming soon – testing dengan Bun + Vitest

## 🤝 Kontribusi

Pull request dan saran sangat terbuka. Silakan fork & PR kalau ada ide atau perbaikan!

## 🪪 Lisensi

MIT © 2025 Muhammad Farid

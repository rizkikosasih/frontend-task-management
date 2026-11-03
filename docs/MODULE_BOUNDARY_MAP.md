# Module Boundary Map

Pemetaan batasan modul, navigasi rute, dan proteksi otorisasi pada frontend SPA.

---

## 1. Peta Rute & Proteksi Akses

| Jalur Rute | Komponen Halaman | Tingkat Akses | Deskripsi |
| :--- | :--- | :--- | :--- |
| `/` | `src/routes/index.tsx` | Publik | Beranda pengenalan dan ringkasan fitur platform |
| `/login` | `src/routes/login.tsx` | Publik (Tamu) | Form autentikasi lokal dan tautan OAuth2 |
| `/register` | `src/routes/register.tsx` | Publik (Tamu) | Registrasi pengguna baru peran Member |
| `/dashboard` | `src/routes/dashboard.tsx` | Terotentikasi | Ringkasan metrik proyek dan tugas aktif |
| `/projects` | `src/routes/projects/index.tsx` | Terotentikasi | Katalog proyek pengguna |
| `/projects/$projectId` | `src/routes/projects/$projectId.tsx` | Terotentikasi | Papan kanban tugas dan rincian proyek |

---

## 2. Batasan Modul (`src/features/`)

- `features/auth/`: Komponen formulir login, registrasi, tombol OAuth, dan guard navigasi sesi.
- `features/projects/`: Komponen kartu proyek, modal formulir pembuatan/pengeditan proyek, dan paginasi.
- `features/tasks/`: Komponen kolom kanban (`todo`, `in_progress`, `done`), kartu tugas dengan dnd-kit sensor, modal detail, dan pemilih status.
- `features/comments/`: Komponen daftar diskusi komentar dan formulir pengiriman komentar.

# Product Requirement Document (PRD) - Frontend Task Management SPA

## 1. Ringkasan Eksekutif

Frontend Task Management SPA adalah aplikasi berbasis peramban (*web client*) yang dibangun menggunakan Vite, React 19, TypeScript, Tailwind CSS, TanStack Router, TanStack Query v5, Zustand, dan dnd-kit. Aplikasi ini menyediakan antarmuka visual interaktif untuk manajemen proyek kolaboratif, penugasan tugas kanban, dan diskusi tim secara real-time.

---

## 2. Sasaran Pengguna & Kriteria Penerimaan

- **Navigasi Terproteksi:** Rute dashboard, proyek, dan tugas hanya dapat diakses oleh sesi pengguna dengan Bearer token yang valid.
- **Konsistensi State Klien-Server:** TanStack Query mengelola sinkronisasi data remote, caching terisolasi, dan invalidasi kueri otomatis saat transaksi mutasi berhasil dieksekusi.
- **Interaktivitas Papan Tugas:** Drag-and-drop antar kolom status kanban (todo, in_progress, done) dengan pembaruan visual optimistik dan kemampuan rollback jika backend mengembalikan galat HTTP 409/422.
- **Transmisi Idempotent:** Pembuatan proyek dan tugas secara otomatis menyematkan header HTTP X-Idempotency-Key (UUIDv4) melalui interceptor Axios.

---

## 3. Matriks Tampilan Berdasarkan Peran

| Komponen Antarmuka | Tampilan Admin (Owner) | Tampilan Member |
| :--- | :--- | :--- |
| Tombol Buat Proyek | Tampil & Aktif | Tersembunyi |
| Menu Modifikasi / Hapus Proyek | Tampil & Aktif | Tersembunyi |
| Tombol Tambah Tugas | Tampil & Aktif | Tersembunyi |
| Pemindahan Status Tugas | Seluruh tugas proyek | Tugas yang ditugaskan kepada dirinya |
| Form Komentar | Tampil & Aktif | Tampil & Aktif pada tugas terkait |
| Tombol Hapus Komentar | Hanya komentar milik sendiri | Hanya komentar milik sendiri |

---

## 4. Tumpukan Teknologi Inti

- **Framework:** Vite 6 + React 19 + TypeScript (strict mode)
- **Routing:** TanStack Router (File-based route generation, type-safe navigation)
- **Server Cache:** TanStack Query v5
- **Client Session Store:** Zustand
- **Drag and Drop:** @dnd-kit/core + @dnd-kit/sortable
- **Form Handling:** React Hook Form + Zod
- **HTTP Transport:** Axios (interceptor token & idempotency key)
- **Styling & Icons:** Tailwind CSS v4 + Lucide React


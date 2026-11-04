# Developer Log - Frontend - November 2026

## 2026-11-04

### Inisialisasi Fondasi Arsitektur Frontend

- **Scaffolding Proyek:** Menginisialisasi basis kode klien berbasis Vite, React 19, TypeScript strict mode, dan Node.js 20 LTS.
- **Konfigurasi Dependensi Inti:** Memasang dan mengonfigurasi TanStack Router, TanStack Query v5, Zustand, Axios, React Hook Form, Zod, dnd-kit, dan Tailwind CSS v4.
- **Konfigurasi Path Alias & Bundler:** Menetapkan path alias `@/*` pada `tsconfig.app.json` dan mengintegrasikan plugin `@tailwindcss/vite` serta `@tanstack/router-plugin/vite` pada `vite.config.ts`.
- **Fondasi Rute & Klien HTTP:** Membangun rute dasar (`__root.tsx`, `index.tsx`, `login.tsx`), Axios interceptor untuk Bearer Token dan `X-Idempotency-Key`, serta Zustand store untuk sesi pengguna.
- **Dokumentasi Frontend:** Menyusun `PRD.md`, `STATE_MANAGEMENT_MAP.md`, `MODULE_BOUNDARY_MAP.md`, dan `COMPONENT_TOKENS.md`.
- **Verifikasi Kompilasi:** Memastikan kompilasi TypeScript (`tsc -b`) dan bundler Vite (`vite build`) berhasil tanpa galat.

### Implementasi Modul Fungsional Frontend

- **Lapisan Kontrak & Service:** Mengonfigurasi endpoint Axios terpadu pada `src/api/endpoints/` (`auth.ts`, `projects.ts`, `tasks.ts`, `comments.ts`) dan menyelaraskan interface TypeScript (`project.ts`, `comment.ts`, `auth.ts`, `api.ts`).
- **Komponen UI Dasar:** Membangun komponen antarmuka modular pada `src/components/ui/` (`Button`, `Input`, `Badge`, `Modal`) serta komponen umpan balik `Toast`.
- **Modul Otentikasi & Guard Rute:** Mengembangkan `LoginForm`, `RegisterForm`, alur OAuth callback, mutasi TanStack Query, dan proteksi rute sebelum pemuatan halaman.
- **Modul Manajemen Proyek:** Membangun katalog proyek dengan pencarian reaktif, pembagian halaman (paginasi), serta modal pembuatan dan modifikasi data.
- **Papan Kanban Interaktif:** Mengimplementasikan papan tugas kanban 3 kolom (`todo`, `in_progress`, `done`) dengan drag-and-drop `@dnd-kit`, mutasi optimistik, dan pemulihan otomatis jika terjadi penolakan konkurensi (HTTP 409/422).
- **Linimasa Komentar:** Menyediakan panel diskusi terikat tugas dengan validasi form Zod dan kontrol otorisasi penghapusan komentar milik sendiri.
- **Analisis Kualitas & Kompilasi:** Lolos oxlint dengan 0 galat/peringatan serta lulus kompilasi produksi `vite build` dalam 1.76 detik.

### Otomasi Git Hook Pasca-Tarik Lintas Sistem Operasi

- **Skrip Sinkronisasi Dinamis:** Menerapkan `.githooks/sync-local.sh` lintas sistem operasi untuk memeriksa mutasi manifes dependensi npm dan direktori router TanStack.
- **Konfigurasi Git Hook:** Mengintegrasikan hook `post-merge` dan `post-rewrite` serta menambahkan skrip `prepare` pada `package.json` untuk pendaftaran otomatis konfigurasi `core.hooksPath`.

### Implementasi Token Semantik & Pencegahan Defek Tema

- **Token Semantik Tailwind CSS v4:** Menetapkan hierarki variabel warna (`--color-background`, `--color-surface`, `--color-surface-subtle`, `--color-border`, `--color-border-subtle`, `--color-foreground`, `--color-foreground-muted`, `--color-primary`, `--color-primary-hover`, `--color-primary-accent`) dengan adaptasi otomatis skema terang/gelap pada `src/index.css`.
- **Manajemen State Tema:** Membangun `themeStore.ts` berbasis Zustand dengan sinkronisasi `StorageEvent` lintas tab dan media query listener `prefers-color-scheme`.
- **Pencegahan Defek Tampilan:** Memasang skrip inline pemblokir rendering awal pada `index.html` untuk meniadakan FOUC (*Flash of Unstyled Content*), mengonfigurasi `color-scheme` pada elemen `html` untuk perataan scrollbar browser, serta mengatur styling pseudokelas autofill peramban.
- **Komponen Pemilih Tema:** Menyediakan komponen interaktif `ThemeToggle.tsx` dan memigrasikan seluruh antarmuka komponen UI dan halaman fitur ke token semantik.
- **Standardisasi Kualitas Kode:** Mengintegrasikan konfigurasi Prettier (`.prettierrc`, `.prettierignore`), Oxlint (`.oxlintrc.json`), skrip pemeriksaan format, typecheck, serta dokumentasi komprehensif pada `README.md`.

### Implementasi Tata Letak Responsif Mobile-First

- **Papan Kanban Gulir Horizontal Snap:** Menyesuaikan kontainer kolom kanban pada perangkat seluler menjadi format flex gulir horizontal dengan snap mandatory (`snap-x snap-mandatory overflow-x-auto`) dan lebar terukur (`w-[85vw] sm:w-[70vw] md:w-auto`).
- **Navigasi Drawer Slide-Over:** Mengintegrasikan navigasi samping kanan interaktif (*slide-over drawer*) pada `__root.tsx` untuk layar `< md` dengan animasi transisi, penguncian scroll latar belakang, serta penutupan melalui tombol Escape dan backdrop klik.
- **Bottom Sheet Modal Interaktif:** Menyesuaikan `Modal.tsx` menjadi bottom sheet pada resolusi seluler dengan batas tinggi dinamis `max-h-[85dvh]`, area gulir internal vertikal `overflow-y-auto`, dan indikator drag handle visual.
- **Transisi Status 1-Ketukan:** Menambahkan tombol pilihan status instan (*one-tap status change*) pada `TaskDetailModal.tsx` guna mempermudah pemindahan status tugas bagi pengguna perangkat sentuh seluler tanpa interaksi seret-lepas.

### Infrastruktur Pengujian Otomatis & Aksesibilitas

- **Integrasi Vitest & Testing Library:** Mengonfigurasi `vitest.config.ts` dengan lingkungan jsdom, `@testing-library/react`, `@testing-library/jest-dom`, dan `@testing-library/user-event` serta mendaftarkan skrip `test` dan `test:watch` pada `package.json`.
- **Mock Service Worker (MSW):** Mengintegrasikan MSW Node server pada `src/test/mocks/server.ts` dan handlers terpadu untuk simulasi intercept network request Axios dengan adapter `fetch`.
- **Rangkaian Pengujian Otomatis:** Menyusun pengujian integrasi mutasi status optimistik dan rollback konkurensi (`useTaskStatusMutation.test.tsx`), pengujian pemilihan tema (`ThemeToggle.test.tsx`), pengujian interaksi dialog modal dan keyboard Escape (`Modal.test.tsx`), serta pengujian kartu tugas kanban (`TaskCard.test.tsx`) dengan 12 skenario pengujian berstatus lulus.
- **Komponen Skeleton Loader Adaptif:** Membangun `ProjectCardSkeleton.tsx` dan `KanbanSkeleton.tsx` serta menerapkannya pada katalog proyek dan papan kanban saat pemuatan data guna meniadakan Cumulative Layout Shift (CLS).
- **Audit Aksesibilitas ARIA:** Menambahkan atribut `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, dan `aria-label` eksplisit pada modal dialog dan drawer navigasi mobile.




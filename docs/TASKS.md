# Project Task Backlog (TASKS) - Frontend SPA

Hierarki Standar Pelacakan Tugas Proyek: Priority -> Sub-Poin -> Item Pekerjaan.

---

## Priority 1

### 1. Sistem Tema Semantik & Desain Token

- [ ] **Variabel Token Desain Semantik CSS:**
  Mendefinisikan variabel token warna semantik pada konfigurasi tema Tailwind CSS (@theme pada index.css) untuk background, surface, text, border, serta warna primer dan sekunder agar transisi mode tampilan dapat dilakukan secara terpusat tanpa penulisan kelas berulang.
- [ ] **Penyedia Mode Tampilan Gelap dan Terang:**
  Membangun theme store reaktif memanfaatkan Zustand dan media query prefers-color-scheme untuk mendeteksi preferensi tampilan sistem, menyimpan pilihan ke localStorage, dan menerapkan kelas dark pada elemen root dokumen.

### 2. Standarisasi Palet Warna Primer & Sekunder

- [ ] **Penetapan Palet Primer dan Sekunder Baku:**
  Merumuskan kontras rasio palet warna utama (primer) dan warna pendukung (sekunder) yang memenuhi ambang batas aksesibilitas WCAG 2.1 AA (minimal 4.5:1 untuk teks normal) pada kedua mode tampilan.

---

## Priority 2

### 1. Tata Letak Responsif Mobile-First

- [ ] **Papan Kanban Geser Horizontal untuk Layar Seluler:**
  Mengubah orientasi kolom kanban pada viewport kecil (< 768px) dari tumpukan vertikal menjadi kontainer geser horizontal dengan CSS scroll snap (snap-x mandatory) guna mengeliminasi kelelahan gulir vertikal saat navigasi kartu tugas.
- [ ] **Bilah Navigasi Adaptif & Drawer Seluler:**
  Membangun komponen navigasi seluler model drawer/sheet yang dipicu oleh tombol menu hamburger untuk mempermudah akses tautan dashboard, proyek, dan profil pengguna pada perangkat layar sentuh.
- [ ] **Transformasi Dialog Modal Menjadi Bottom Sheet:**
  Menyesuaikan tampilan modal pembuatan tugas dan proyek menjadi panel geser dari bawah (bottom sheet) saat diakses melalui resolusi layar telepon seluler.

---

## Priority 3

### 1. Infrastruktur Pengujian Otomatis & Kualitas Kode

- [ ] **Setup Test Runner Vitest dan React Testing Library:**
  Mengonfigurasi Vitest terintegrasi dengan jsdom dan React Testing Library untuk mengeksekusi pengetesan unit fungsi utilitas dan pengujian integrasi custom hooks (useTaskStatusMutation).
- [ ] **Mock Service Worker (MSW) untuk Pengujian Jaringan:**
  Mengintegrasikan MSW untuk mencegat panggilan API Axios selama sesi pengetesan komponen guna memverifikasi alur form tanpa ketergantungan server live.
- [ ] **Konfigurasi Formatter Prettier dan Script Pemeriksaan:**
  Menyiapkan konfigurasi Prettier lokal dengan proteksi berkas markdown (.prettierignore) serta script CLI terpadu untuk validasi linting dan pemeriksaan pengetikan TypeScript sebelum komit.

### 2. Audit Aksesibilitas & Penyempurnaan Antarmuka Pengguna

- [ ] **Inspeksi Antarmuka Langsung di Peramban:**
  Melakukan peninjauan langsung melalui browser untuk memvalidasi alur interaksi keyboard pada drag-and-drop kanban, navigasi fokus modal, dan eliminasi gaya teks kaku buatan AI pada seluruh label antarmuka.
- [ ] **Komponen Skeleton Loader Adaptif:**
  Menggantikan pemuatan indikator putar (spinner) dengan kerangka visual (skeleton loader) pada katalog proyek dan papan kanban untuk mengurangi pergeseran tata letak kumulatif (Cumulative Layout Shift).

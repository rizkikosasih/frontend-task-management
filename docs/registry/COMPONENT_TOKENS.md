# Component Tokens Registry

Standarisasi token desain visual, palet warna, tipografi, dan spasi antarmuka klien.

---

## 1. Palet Warna Utama (Tailwind Theme)

- **Brand Primary:** `indigo-600` (`#4f46e5`) - Tombol aksi utama, tautan aktif, aksen navigasi.
- **Brand Primary Hover:** `indigo-700` (`#4338ca`) - Interaksi hover tombol primer.
- **Brand Primary Light:** `indigo-50` (`#eef2ff`) - Latar belakang badge status dan icon container.
- **Success / Done:** `emerald-600` (`#059669`), latar `emerald-50` - Kolom tugas selesai, badge konfirmasi.
- **Warning / In Progress:** `amber-500` (`#f59e0b`), latar `amber-50` - Kolom tugas berjalan, badge status proses.
- **Neutral / Todo:** `slate-500` (`#64748b`), latar `slate-100` - Kolom tugas antrean, batas kartu tugas.
- **Surface & Background:**
  - Halaman latar: `slate-50` (`#f8fafc`)
  - Kartu & Kontainer: `white` (`#ffffff`)
  - Garis Batas: `slate-200` (`#e2e8f0`)

---

## 2. Tipografi & Hierarki Teks

- **Keluarga Font:** Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif.
- **Judul Halaman (H1):** `text-3xl font-bold tracking-tight text-slate-900`
- **Judul Bagian (H2):** `text-xl font-semibold text-slate-900`
- **Judul Kartu (H3):** `text-base font-semibold text-slate-900`
- **Teks Tubuh (Body):** `text-sm text-slate-600 leading-relaxed`
- **Teks Keterangan (Caption):** `text-xs text-slate-400 font-medium`

---

## 3. Elevasi & Batas Ruang (Spacing)

- **Radius Sudut:**
  - Kartu & Modal: `rounded-xl` (`0.75rem`)
  - Tombol & Masukan Form: `rounded-lg` (`0.5rem`)
  - Badge Status: `rounded-full`
- **Bayangan (Shadow):**
  - Kartu Konten: `shadow-sm`
  - Modal & Menu Dropdown: `shadow-lg border border-slate-200`

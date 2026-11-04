# Component Tokens Registry

Standarisasi token desain visual, palet warna semantik, tipografi, dan kontras aksesibilitas antarmuka SPA.

---

## 1. Palet Warna Semantik & Desain Token (Tailwind CSS v4)

Pemetaan token semantik pada `@theme` berbasis CSS Custom Properties (`:root` dan `.dark`):

| Token Semantik | Variabel CSS | Nilai Light Mode | Nilai Dark Mode | Rasio Kontras WCAG 2.1 AA |
| :--- | :--- | :--- | :--- | :--- |
| `background` | `--color-background` | `#f8fafc` | `#090d16` | Latar utama dokumen |
| `surface` | `--color-surface` | `#ffffff` | `#0f172a` | Kontainer kartu dan modal |
| `surface-subtle` | `--color-surface-subtle` | `#f1f5f9` | `#1e293b` | Elemen subtle & avatar container |
| `foreground` | `--color-foreground` | `#0f172a` | `#f8fafc` | **18.7:1** (Light), **16.9:1** (Dark) |
| `foreground-muted` | `--color-foreground-muted` | `#475569` | `#94a3b8` | **7.0:1** (Light), **5.8:1** (Dark) |
| `border` | `--color-border` | `#cbd5e1` | `#334155` | Garis pembatas kontainer |
| `border-subtle` | `--color-border-subtle` | `#e2e8f0` | `#1e293b` | Garis pembatas sekunder |
| `primary` | `--color-primary` | `#4f46e5` | `#4f46e5` | **6.36:1** (teks putih tombol) |
| `primary-hover` | `--color-primary-hover` | `#4338ca` | `#6366f1` | Status hover interaktif |
| `primary-foreground` | `--color-primary-foreground` | `#ffffff` | `#ffffff` | Teks tombol primer |
| `primary-accent` | `--color-primary-accent` | `#4f46e5` | `#818cf8` | **5.23:1** (teks aksen di latar gelap) |
| `secondary` | `--color-secondary` | `#ffffff` | `#1e293b` | Tombol dan kontrol sekunder |
| `secondary-hover` | `--color-secondary-hover` | `#f8fafc` | `#334155` | Hover tombol sekunder |
| `secondary-foreground` | `--color-secondary-foreground` | `#0f172a` | `#f8fafc` | Teks tombol sekunder |

---

## 2. Tipografi & Hierarki Teks

- **Keluarga Font:** Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif.
- **Judul Halaman (H1):** `text-3xl font-bold tracking-tight text-foreground`
- **Judul Bagian (H2):** `text-xl font-semibold text-foreground`
- **Judul Kartu (H3):** `text-base font-semibold text-foreground`
- **Teks Tubuh (Body):** `text-sm text-foreground-muted leading-relaxed`
- **Teks Keterangan (Caption):** `text-xs text-foreground-muted font-medium`

---

## 3. Elevasi & Batas Ruang (Spacing)

- **Radius Sudut:**
  - Kartu & Modal: `rounded-xl` (`0.75rem`)
  - Tombol & Masukan Form: `rounded-lg` (`0.5rem`)
  - Badge Status: `rounded-full`
- **Bayangan (Shadow):**
  - Kartu Konten: `shadow-2xs` hingga `shadow-sm`
  - Modal Dialog: `shadow-xl border border-border`

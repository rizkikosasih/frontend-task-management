# State Management Map

Pemetaan arsitektur state klien, server cache, dan aliran mutasi data pada frontend SPA.

---

## 1. Pembagian Tanggung Jawab State

```text
┌────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT                     │
│                                                        │
│  ┌──────────────────────────┐  ┌────────────────────┐  │
│  │   SERVER STATE           │  │   CLIENT STATE     │  │
│  │   (TanStack Query v5)    │  │   (Zustand)        │  │
│  │                          │  │                    │  │
│  │   • Proyek & Daftar      │  │   • Token Sanctum  │  │
│  │   • Tugas Kanban & Status│  │   • Profil Pengguna│  │
│  │   • Thread Komentar      │  │   • Filter UI      │  │
│  └─────────────┬────────────┘  └─────────┬──────────┘  │
│                │                         │             │
│                ▼                         ▼             │
│  ┌──────────────────────────────────────────────────┐  │
│  │             KOMPONEN TAMPILAN REACT              │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Server State (TanStack Query v5)

### Hierarki Kunci Kueri (Query Keys)

- Proyek: `['projects']`, `['projects', projectId]`
- Tugas: `['tasks', { projectId }]`, `['tasks', taskId]`
- Komentar: `['comments', { taskId }]`

### Strategi Mutasi & Invalidasi

- **Pembuatan Proyek/Tugas:** Injeksi `X-Idempotency-Key` pada header request. Saat sukses, memicu `queryClient.invalidateQueries({ queryKey: ['projects'] })` atau `['tasks']`.
- **Transisi Status Tugas (Kanban):**
  1. `onMutate`: Memperbarui cache visual secara lokal untuk respons interaksi instan.
  2. `onError`: Jika server menolak (HTTP 409 atau 422), kembalikan (*rollback*) cache ke snapshot sebelumnya.
  3. `onSettled`: Sinkronisasi ulang dengan `queryClient.invalidateQueries`.

---

## 3. Client State (Zustand)

### `useAuthStore`
- `user`: Data profil pengguna aktif (`id`, `name`, `email`, `role`).
- `token`: Bearer token string (tersimpan secara lokal pada `localStorage`).
- `setAuth(user, token)`: Menyimpan kredensial dan memperbarui token.
- `clearAuth()`: Menghapus token dari memori dan `localStorage` saat logout.


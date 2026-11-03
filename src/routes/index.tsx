import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="space-y-12 py-6">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Kolaborasi Manajemen Proyek & Tugas Berkinerja Tinggi
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Platform kolaboratif terintegrasi dengan proteksi idempotensi transaksi, kontrol konkurensi status pesimistis, dan otentikasi hibrida Sanctum serta OAuth2.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Idempotensi Transaksi</h3>
          <p className="text-sm text-slate-600">
            Mencegah duplikasi entitas proyek dan tugas melalui penjaminan header mutasi UUID unik pada setiap pengiriman data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Papan Tugas Terkendali</h3>
          <p className="text-sm text-slate-600">
            Penguncian pesimistis pada backend memastikan alur status kanban konsisten tanpa risiko tabrakan modifikasi simultan.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">Otorisasi Dua Lapis</h3>
          <p className="text-sm text-slate-600">
            Kombinasi Spatie Role-Based Access Control dan Laravel Policy kepemilikan mengamankan akses data per pengguna.
          </p>
        </div>
      </section>
    </div>
  )
}


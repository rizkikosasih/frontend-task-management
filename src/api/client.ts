import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  adapter: 'fetch',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (config.method?.toLowerCase() === 'post' && !config.headers['X-Idempotency-Key']) {
    config.headers['X-Idempotency-Key'] = crypto.randomUUID()
  }

  return config
})

function extractHeaderValue(headers: unknown, key: string): string | undefined {
  if (!headers) return undefined
  if (typeof (headers as { get?: unknown }).get === 'function') {
    const val = (headers as { get: (name: string) => string | null }).get(key)
    return val ?? undefined
  }
  const record = headers as Record<string, unknown>
  const lowerKey = key.toLowerCase()
  if (record[lowerKey] !== undefined) {
    return String(record[lowerKey])
  }
  if (record[key] !== undefined) {
    return String(record[key])
  }
  return undefined
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      const retryHeader = extractHeaderValue(error.response.headers, 'retry-after')
      const retrySeconds = retryHeader ? Number.parseInt(retryHeader, 10) : null
      const backendMessage = error.response.data?.message
      const displayMessage =
        Number.isFinite(retrySeconds) && (retrySeconds as number) > 0
          ? `Batas frekuensi permintaan tercapai. Silakan coba kembali dalam ${retrySeconds} detik.`
          : backendMessage || 'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.'

      const toastDuration =
        Number.isFinite(retrySeconds) && (retrySeconds as number) > 0
          ? Math.max((retrySeconds as number) * 1000, 5000)
          : 5000

      useToastStore.getState().showToast({
        type: 'error',
        message: displayMessage,
        duration: toastDuration,
      })
    }

    return Promise.reject(error)
  }
)

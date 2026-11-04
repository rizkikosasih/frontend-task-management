import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

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

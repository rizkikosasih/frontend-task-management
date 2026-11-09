import { describe, it, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/mocks/server'
import { apiClient } from '@/api/client'
import { useToastStore } from '@/stores/toastStore'

describe('apiClient Rate Limiting Interceptor', () => {
  beforeEach(() => {
    useToastStore.getState().hideToast()
  })

  it('triggers toast with remaining retry seconds on 429 response', async () => {
    server.use(
      http.get('*/api/test-throttle', () => {
        return new HttpResponse(
          JSON.stringify({
            success: false,
            message: 'Terlalu banyak permintaan. Silakan coba beberapa saat lagi.',
            errors: null,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '45',
            },
          }
        )
      })
    )

    await expect(apiClient.get('/test-throttle')).rejects.toThrow()

    const toast = useToastStore.getState().toast
    expect(toast).not.toBeNull()
    expect(toast?.type).toBe('error')
    expect(toast?.message).toContain('45 detik')
  })

  it('triggers toast with backend message when retry-after header is missing', async () => {
    server.use(
      http.get('*/api/test-throttle-no-header', () => {
        return new HttpResponse(
          JSON.stringify({
            success: false,
            message: 'Limit request terlampaui.',
            errors: null,
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      })
    )

    await expect(apiClient.get('/test-throttle-no-header')).rejects.toThrow()

    const toast = useToastStore.getState().toast
    expect(toast).not.toBeNull()
    expect(toast?.type).toBe('error')
    expect(toast?.message).toBe('Limit request terlampaui.')
  })

  it('does not trigger rate limit toast on other error statuses', async () => {
    server.use(
      http.get('*/api/test-bad-request', () => {
        return new HttpResponse(
          JSON.stringify({
            success: false,
            message: 'Parameter salah.',
            errors: null,
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      })
    )

    await expect(apiClient.get('/test-bad-request')).rejects.toThrow()

    const toast = useToastStore.getState().toast
    expect(toast).toBeNull()
  })
})

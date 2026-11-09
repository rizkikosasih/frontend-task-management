import { describe, it, expect } from 'vitest'
import { getOAuthErrorMessage } from './login'

describe('getOAuthErrorMessage', () => {
  it('returns missing email message when error is oauth_email_missing', () => {
    const result = getOAuthErrorMessage('?error=oauth_email_missing')
    expect(result).toBe('Akun OAuth Anda tidak membagikan email publik. Silakan registrasi manual.')
  })

  it('returns failed authentication message when error is oauth_failed', () => {
    const result = getOAuthErrorMessage('?error=oauth_failed')
    expect(result).toBe('Autentikasi OAuth gagal diproses. Silakan coba kembali.')
  })

  it('returns null when no error query is present', () => {
    const result = getOAuthErrorMessage('')
    expect(result).toBeNull()
  })

  it('returns null for unknown error values', () => {
    const result = getOAuthErrorMessage('?error=unknown_error')
    expect(result).toBeNull()
  })
})

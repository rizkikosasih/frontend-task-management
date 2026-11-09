import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/mocks/server'
import { AccountProfileModal } from './AccountProfileModal'
import { useAuthStore } from '@/stores/authStore'

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('AccountProfileModal Component', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: {
        id: 1,
        name: 'Rizki Kosasih',
        email: 'rizki@example.com',
        roles: ['admin'],
      },
      token: 'mock-token',
    })
  })

  it('renders user details correctly when modal is open', () => {
    renderWithClient(<AccountProfileModal isOpen={true} onClose={vi.fn()} />)

    expect(screen.getByText('Profil & Keamanan Akun')).toBeInTheDocument()
    expect(screen.getByText('Rizki Kosasih')).toBeInTheDocument()
    expect(screen.getByText('rizki@example.com')).toBeInTheDocument()
    expect(screen.getByText('ADMIN')).toBeInTheDocument()
  })

  it('switches between google and github provider tabs', async () => {
    const user = userEvent.setup()
    renderWithClient(<AccountProfileModal isOpen={true} onClose={vi.fn()} />)

    const githubTab = screen.getByRole('button', { name: 'GitHub' })
    await user.click(githubTab)

    expect(screen.getByText('Buka peramban untuk verifikasi akun GitHub.')).toBeInTheDocument()
  })

  it('shows error feedback when submitting empty token', async () => {
    const user = userEvent.setup()
    renderWithClient(<AccountProfileModal isOpen={true} onClose={vi.fn()} />)

    const submitBtn = screen.getByRole('button', { name: 'Validasi & Tautkan Akun' })
    await user.click(submitBtn)

    expect(
      screen.getByText('Masukkan token otentikasi eksternal terlebih dahulu.')
    ).toBeInTheDocument()
  })

  it('submits valid token and displays success feedback', async () => {
    server.use(
      http.post('*/api/oauth/google/link', () => {
        return HttpResponse.json({
          success: true,
          message: 'google linked successfully',
          data: {
            user: {
              id: 1,
              name: 'Rizki Kosasih',
              email: 'rizki@example.com',
              roles: ['admin'],
            },
          },
        })
      })
    )

    const user = userEvent.setup()
    renderWithClient(<AccountProfileModal isOpen={true} onClose={vi.fn()} />)

    const tokenInput = screen.getByPlaceholderText('Tempelkan id_token atau access_token Google...')
    await user.type(tokenInput, 'valid-google-token')

    const submitBtn = screen.getByRole('button', { name: 'Validasi & Tautkan Akun' })
    await user.click(submitBtn)

    expect(await screen.findByText('Akun Google berhasil ditautkan.')).toBeInTheDocument()
  })
})

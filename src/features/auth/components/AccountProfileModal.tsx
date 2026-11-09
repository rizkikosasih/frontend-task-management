import { useState } from 'react'
import axios from 'axios'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Toast } from '@/components/feedback/Toast'
import { useAuthStore } from '@/stores/authStore'
import { useAuthMutations } from '@/features/auth/hooks/useAuthMutations'
import { getOAuthRedirectUrl } from '@/api/endpoints/auth'
import { User, ShieldCheck, KeyRound, ExternalLink, ArrowRight } from 'lucide-react'

export interface AccountProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccountProfileModal({ isOpen, onClose }: AccountProfileModalProps) {
  const { user } = useAuthStore()
  const { linkOAuthMutation } = useAuthMutations()

  const [activeProvider, setActiveProvider] = useState<'google' | 'github'>('google')
  const [tokenInput, setTokenInput] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  )
  const [isRedirecting, setIsRedirecting] = useState(false)

  const role = user?.roles?.[0] || 'member'

  function handleReset() {
    setTokenInput('')
    setFeedback(null)
    setIsRedirecting(false)
  }

  function handleClose() {
    handleReset()
    onClose()
  }

  async function handleRedirectFlow(provider: 'google' | 'github') {
    try {
      setIsRedirecting(true)
      setFeedback(null)
      const res = await getOAuthRedirectUrl(provider)
      const targetUrl = res.data?.redirect_url || res.data?.url
      if (targetUrl) {
        window.location.href = targetUrl
      } else {
        setFeedback({
          type: 'error',
          message: `Gagal mendapatkan URL otorisasi ${provider}.`,
        })
      }
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : `Gagal memulai alur otorisasi ${provider}.`
      setFeedback({ type: 'error', message: msg })
    } finally {
      setIsRedirecting(false)
    }
  }

  async function handleTokenSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!tokenInput.trim()) {
      setFeedback({
        type: 'error',
        message: 'Masukkan token otentikasi eksternal terlebih dahulu.',
      })
      return
    }

    setFeedback(null)
    try {
      await linkOAuthMutation.mutateAsync({
        provider: activeProvider,
        payload: { token: tokenInput.trim() },
      })
      setFeedback({
        type: 'success',
        message: `Akun ${activeProvider === 'google' ? 'Google' : 'GitHub'} berhasil ditautkan.`,
      })
      setTokenInput('')
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : `Gagal menautkan akun ${activeProvider}.`
      setFeedback({ type: 'error', message: msg })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Profil & Keamanan Akun">
      <div className="p-4 sm:p-6 space-y-6">
        {feedback && (
          <Toast
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}

        <div className="p-4 rounded-xl bg-surface-subtle border border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-border">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-foreground">{user?.name}</h4>
              <p className="text-xs text-foreground-muted">{user?.email}</p>
            </div>
          </div>
          <Badge variant={role === 'admin' ? 'admin' : 'member'}>{role.toUpperCase()}</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Penautan Akun Eksternal (OAuth)
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-surface-subtle rounded-lg border border-border">
            <button
              type="button"
              onClick={() => {
                setActiveProvider('google')
                setFeedback(null)
              }}
              className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                activeProvider === 'google'
                  ? 'bg-surface text-foreground shadow-2xs'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveProvider('github')
                setFeedback(null)
              }}
              className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                activeProvider === 'github'
                  ? 'bg-surface text-foreground shadow-2xs'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              GitHub
            </button>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg border border-border bg-surface">
              <div className="text-left">
                <span className="text-xs font-medium text-foreground block">
                  Alur Otorisasi Browser
                </span>
                <span className="text-[11px] text-foreground-muted">
                  Buka peramban untuk verifikasi akun{' '}
                  {activeProvider === 'google' ? 'Google' : 'GitHub'}.
                </span>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                isLoading={isRedirecting}
                onClick={() => handleRedirectFlow(activeProvider)}
                className="shrink-0"
              >
                <span>Mulai Otorisasi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </div>

            <form onSubmit={handleTokenSubmit} className="space-y-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <KeyRound className="w-3.5 h-3.5 text-primary" />
                <span>Validasi Kriptografis Token Langsung</span>
              </div>
              <Input
                label={`Token ${activeProvider === 'google' ? 'Google (ID Token / Access Token)' : 'GitHub (Personal Access Token / OAuth Token)'}`}
                placeholder={
                  activeProvider === 'google'
                    ? 'Tempelkan id_token atau access_token Google...'
                    : 'Tempelkan token akses GitHub...'
                }
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                isLoading={linkOAuthMutation.isPending}
                className="w-full"
              >
                <span>Validasi & Tautkan Akun</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

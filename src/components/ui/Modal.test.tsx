import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal Component', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Judul Modal">
        <p>Konten Modal</p>
      </Modal>
    )

    expect(screen.queryByText('Judul Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Konten Modal')).not.toBeInTheDocument()
  })

  it('renders title and children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Judul Modal">
        <p>Konten Modal</p>
      </Modal>
    )

    expect(screen.getByText('Judul Modal')).toBeInTheDocument()
    expect(screen.getByText('Konten Modal')).toBeInTheDocument()
  })

  it('triggers onClose when close button is clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen={true} onClose={handleClose} title="Judul Modal">
        <p>Konten</p>
      </Modal>
    )

    const closeButton = screen.getByRole('button')
    await user.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('triggers onClose when Escape key is pressed', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Modal isOpen={true} onClose={handleClose} title="Judul Modal">
        <p>Konten</p>
      </Modal>
    )

    await user.keyboard('{Escape}')
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})

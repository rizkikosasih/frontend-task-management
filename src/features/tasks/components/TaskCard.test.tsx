import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TaskCard } from './TaskCard'
import type { Task } from '@/types/task'

describe('TaskCard Component', () => {
  const mockTask: Task = {
    id: 1,
    project_id: 1,
    title: 'Integrasi Autentikasi',
    description: 'Implementasi JWT dan Refresh Token',
    status: 'in_progress',
    due_date: '2026-11-30',
    assigned_to: { id: 10, name: 'Budi' },
  }

  it('renders task details correctly', () => {
    render(<TaskCard task={mockTask} />)

    expect(screen.getByText('Integrasi Autentikasi')).toBeInTheDocument()
    expect(screen.getByText('Implementasi JWT dan Refresh Token')).toBeInTheDocument()
    expect(screen.getByText('Budi')).toBeInTheDocument()
    expect(screen.getByText('2026-11-30')).toBeInTheDocument()
    expect(screen.getByText('in progress')).toBeInTheDocument()
  })

  it('calls onClick handler when task card is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<TaskCard task={mockTask} onClick={handleClick} />)

    const card = screen.getByText('Integrasi Autentikasi')
    await user.click(card)

    expect(handleClick).toHaveBeenCalledWith(mockTask)
  })

  it('hides drag grip when status is done', () => {
    const doneTask: Task = {
      ...mockTask,
      status: 'done',
    }

    render(<TaskCard task={doneTask} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

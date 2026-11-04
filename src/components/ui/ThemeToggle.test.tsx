import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeToggle } from './ThemeToggle'
import { useThemeStore } from '@/stores/themeStore'

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'system' })
  })

  it('renders all three theme options', () => {
    render(<ThemeToggle />)
    expect(screen.getByTitle('Mode tampilan Terang')).toBeInTheDocument()
    expect(screen.getByTitle('Mode tampilan Gelap')).toBeInTheDocument()
    expect(screen.getByTitle('Mode tampilan Sistem')).toBeInTheDocument()
  })

  it('switches theme to dark when dark button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const darkButton = screen.getByTitle('Mode tampilan Gelap')
    await user.click(darkButton)

    expect(useThemeStore.getState().theme).toBe('dark')
  })

  it('switches theme to light when light button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const lightButton = screen.getByTitle('Mode tampilan Terang')
    await user.click(lightButton)

    expect(useThemeStore.getState().theme).toBe('light')
  })
})


import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { 
      name: /comprehensive motor insurance for malaysia/i 
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders get quote button', () => {
    render(<Home />)
    
    const quoteButton = screen.getByRole('link', { name: /get quote now/i })
    expect(quoteButton).toBeInTheDocument()
    expect(quoteButton).toHaveAttribute('href', '/quote')
  })

  it('renders existing customer button', () => {
    render(<Home />)
    
    const loginButton = screen.getByRole('link', { name: /existing customer/i })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveAttribute('href', '/login')
  })

  it('renders feature cards', () => {
    render(<Home />)
    
    expect(screen.getByText('Instant Quotes')).toBeInTheDocument()
    expect(screen.getByText('NCD Integration')).toBeInTheDocument()
    expect(screen.getByText('JPJ Compliant')).toBeInTheDocument()
  })
})
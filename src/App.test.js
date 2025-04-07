import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import ThemeProvider from './context/ThemeContext'
import fantasy from './data/fantasy.json'

describe('Welcome component', () => {
  it('renders the Welcome component with default text', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const welcomeNode = screen.getByTestId('welcome-title')
    expect(welcomeNode).toHaveTextContent(/Benvenuti in EpiBooks!/i)
  })
})

describe('Card rendering', () => {
  it('renders at least one book card', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const allCards = document.getElementsByClassName('card')
    expect(allCards.length).toBeGreaterThan(0)
    expect(allCards.length).toBe(fantasy.length)
  })
})

describe('CommentArea component', () => {
  it('renders CommentArea after selecting a book', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const bookImages = await screen.findAllByRole('img')
    fireEvent.click(bookImages[0])

    const commentForm = await screen.findByLabelText(/recensione/i)
    expect(commentForm).toBeInTheDocument()
  })
})

describe('Navbar search filter', () => {
  it('filters books correctly when searching "Destiny"', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const searchInput = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(searchInput, { target: { value: 'Destiny' } })

    await screen.findByDisplayValue(/destiny/i)

    const visibleCards = await waitFor(() =>
      Array.from(document.querySelectorAll('.card')).filter(card =>
        card.textContent.toLowerCase().includes('destiny')
      )
    )

    expect(visibleCards.length).toBe(1)
  })

  it('filters multiple books when searching "witcher"', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const searchInput = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(searchInput, { target: { value: 'witcher' } })

    await screen.findByDisplayValue(/witcher/i)

    const visibleCards = await waitFor(() =>
      Array.from(document.querySelectorAll('.card')).filter(card =>
        card.textContent.toLowerCase().includes('witcher')
      )
    )

    expect(visibleCards.length).toBeGreaterThan(1)
  })
})

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
  it('filters books correctly when searching "witcher"', async () => {
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

    expect(visibleCards.length).toBeGreaterThan(0)
  })

  it('shows no results when searching for a non-existent book', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const searchInput = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(searchInput, { target: { value: 'xyz123abc' } })

    await screen.findByDisplayValue(/xyz123abc/i)

    const visibleCards = await waitFor(() =>
      Array.from(document.querySelectorAll('.card')).filter(card =>
        card.textContent.toLowerCase().includes('xyz123abc')
      )
    )

    expect(visibleCards.length).toBe(0)
  })
})


describe('Book selection border behavior', () => {
  it('adds the selected border when a book is clicked', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const bookImages = await screen.findAllByRole('img')
    fireEvent.click(bookImages[0])

    const selectedCards = document.querySelectorAll('.card.selected')
    expect(selectedCards.length).toBe(1)
  })

  it('removes the selected border from the first book when a second book is clicked', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const bookImages = await screen.findAllByRole('img')

    // Click primo libro
    fireEvent.click(bookImages[0])
    let selectedCards = document.querySelectorAll('.card.selected')
    expect(selectedCards.length).toBe(1)

    // Click secondo libro
    fireEvent.click(bookImages[1])
    selectedCards = document.querySelectorAll('.card.selected')
    expect(selectedCards.length).toBe(1)

    // Il primo non deve più avere .selected
    const firstCard = bookImages[0].closest('.card')
    expect(firstCard.classList.contains('selected')).toBe(false)
  })
})





describe('SingleComment rendering behavior', () => {
  it('does not render any SingleComment at startup', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const comments = document.querySelectorAll('.single-comment')
    expect(comments.length).toBe(0)
  })

  it('renders SingleComment components after selecting a book with comments', async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    const books = await screen.findAllByRole('img')
    fireEvent.click(books[0]) // clicca su un libro che sai avere commenti

    // attende la comparsa dei commenti
    const loadedComments = await screen.findAllByTestId('single-comment')
    expect(loadedComments.length).toBeGreaterThan(0)
  })
})

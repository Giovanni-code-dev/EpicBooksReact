import { render, screen } from '@testing-library/react'
import App from './App'
import ThemeProvider from './context/ThemeContext'
import fantasy from './data/fantasy.json'

import { BrowserRouter } from 'react-router-dom'

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
  it('renders the correct number of book cards from fantasy.json', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )

    // le card bootstrap hanno la classe `card`, quindi uso getElementsByClassName
    const allCards = document.getElementsByClassName('card')
    expect(allCards.length).toBe(fantasy.length)
  })
})


describe('CommentArea component', () => {
  it('renders CommentArea after selecting a book', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    )

    // Troviamo la prima immagine di un libro (clickable)
    const firstBookImage = await screen.findAllByRole('img')
    fireEvent.click(firstBookImage[0]) // Simula il click

    // Aspettiamo che venga visualizzato un elemento di CommentArea
    const commentLabel = await screen.findByText(/recensione/i)

    // Verifica che il componente CommentArea sia effettivamente montato
    expect(commentLabel).toBeInTheDocument()
  })
})
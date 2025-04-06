import { render, screen } from '@testing-library/react'
import App from './App'
import ThemeProvider from './context/ThemeContext'

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

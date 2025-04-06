import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import Welcome from './components/Welcome'
import AllTheBooks from './components/AllTheBooks'
import { Container } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import BookDetails from './components/BookDetails'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [welcomeTitle, setWelcomeTitle] = useState(null) // ✅ nuovo stato per il titolo
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`app-container ${theme}`}>
      <BrowserRouter>
        <MyNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Container>
          <Welcome title={welcomeTitle} /> {/* ✅ passaggio titolo */}
          <Routes>
            <Route path="/" element={<AllTheBooks searchQuery={searchQuery} />} />
            <Route path="/details/:asin" element={<BookDetails setWelcomeTitle={setWelcomeTitle} />} /> {/* ✅ passaggio funzione */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <MyFooter />
      </BrowserRouter>
    </div>
  )
}

export default App

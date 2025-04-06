import { Container, Row, Col, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import fantasy from '../data/fantasy.json'

const BookDetails = ({ setWelcomeTitle }) => {
  const params = useParams()
  const foundBook = fantasy.find((book) => book.asin === params.asin)
  

  useEffect(() => {
    if (foundBook) {
      setWelcomeTitle(foundBook.title)
    }
    return () => {
      setWelcomeTitle(null)
    }
  }, [foundBook, setWelcomeTitle])

  if (!foundBook) {
    return <p className="text-center mt-5">Libro non trovato</p>
  }

  return (
    <Container className="my-5 px-3 px-md-5">
      <Row className="">
        <Col xs={12} md={8} lg={9} className="mb-4 mb-md-0">
          <Image
            src={foundBook.img}
            alt={foundBook.title}
            className="img-fluid w-75 rounded shadow"
          />
        </Col>

        <Col xs={12} md={4} lg={3}>
         
          <p className="text-start">
            <strong>Categoria:</strong> {foundBook.category}
          </p>
          <p className="text-start">
            <strong>Prezzo:</strong> {foundBook.price} €
          </p>
          <p className="text-start">
            <strong>ASIN:</strong> {foundBook.asin}
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default BookDetails

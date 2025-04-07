import { Col, Row } from 'react-bootstrap'

const NotFound = () => (
  <Row className="justify-content-center my-4">
    <Col xs={12} md={6}>
      <div className="text-center">
        <h1>404</h1>
        <h2>Whoops! You’ve wandered off the book path!</h2>
      </div>
    </Col>
  </Row>
)

export default NotFound

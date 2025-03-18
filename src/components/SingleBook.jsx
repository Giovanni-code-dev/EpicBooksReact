
import { Card, Container, Row, Col } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const SingleBook = ({ book, selected, setSelected }) => {
    //  const [selected, setSelected] = useState(false)

    return (
        <Col xs={6} md={3} lg={2}>
            <Card
                onClick={() => {
                    setSelected(book.asin)
                }}
                className={`mb-4 h-auto ${selected === book.asin ? 'border-1 border-danger' : ''}`}
            >
                <Card.Img className="imageBook" variant="top" src={book.img} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SingleBook
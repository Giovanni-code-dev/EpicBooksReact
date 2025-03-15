import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import fantasyBooks from "../data/fantasy.json";
import horrorBooks from "../data/horror.json"; // Corretto il nome!
import historyBooks from "../data/history.json";
import romanceBooks from "../data/romance.json";

const AllTheBooks = () => {
    // Unisci tutti i libri
    const allBooks = [...fantasyBooks, ...horrorBooks, ...historyBooks, ...romanceBooks];

    return (
        <Container className="mt-4">
            <Row>
                {allBooks.map((book) => ( // Usa allBooks invece di books
                    <Col key={book.asin} md={3}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={book.img} /> {/* Rimosse le virgolette */}
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AllTheBooks;

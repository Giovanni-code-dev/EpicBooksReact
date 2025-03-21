import { Card, Col } from "react-bootstrap";
import { useState } from "react";
import CommentArea from "./CommentArea";

const SingleBook = ({ book, selected, setSelected }) => {
    return (
        <Col xs={6} md={3} lg={2}>
            <Card
                onClick={() => setSelected(selected === book.asin ? null : book.asin)}
                className={`mb-4 h-auto ${selected === book.asin ? 'border-1 border-danger text-danger bg-dark' : ''}`}
            >
                <Card.Img className="imageBook" variant="top" src={book.img} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                </Card.Body>
            </Card>

            {selected === book.asin && <CommentArea bookAsin={book.asin} />}
        </Col>
    );
};

export default SingleBook;

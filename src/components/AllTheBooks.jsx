import { Container, Row, Col, Form } from "react-bootstrap";
import fantasyBooks from "../data/fantasy.json";
import horrorBooks from "../data/horror.json";
import historyBooks from "../data/history.json";
import romanceBooks from "../data/romance.json";
import scifiBooks from "../data/scifi.json";
import SingleBook from "./SingleBook";
import Button from 'react-bootstrap/Button';

import CommentArea from "./CommentArea";

import { useState, useEffect } from "react";

const AllTheBooks = () => {
    const allBooks = [...fantasyBooks, ...horrorBooks, ...historyBooks, ...romanceBooks, ...scifiBooks];
    const uniqueBooks = Object.values(
        allBooks.reduce((acc, book) => {
            acc[book.asin] = book;
            return acc;
        }, {})
    );

    const [inputText, setInputText] = useState("");
    const [data, setData] = useState(uniqueBooks);
    const [selected, setSelected] = useState(null); // Stato per il libro selezionato

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setSelected(null)
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (inputText.length >= 3) {
            const filteredData = uniqueBooks.filter(item =>
                item.title.toLowerCase().includes(inputText.toLowerCase())
            );
            setData(filteredData);
        } else {
            setData(uniqueBooks);
        }
    }, [inputText]);

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-3">
                    <Col>
                        <Form.Label className="text-white" htmlFor="ricerca">Ricerca Libro</Form.Label>
                        <Form.Control
                            type="text"
                            id="ricerca"
                            defaultValue={inputText}
                            onChange={(val) => setInputText(val.target.value)}
                        />
                    </Col>
                </Row>

                <Row className="px-3 px-md-0 gx-4 gy-4">
                    {data.map((item) => (
                        <SingleBook
                            key={item.asin}
                            book={item}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))}
                </Row>
            </Container>

            {selected &&
                <CommentArea
                    selected={selected}
                    handleClose={handleClose}
                    bookAsin={selected}
                />}


        </>
    );
};

export default AllTheBooks;

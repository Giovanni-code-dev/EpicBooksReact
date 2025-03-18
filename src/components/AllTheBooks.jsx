import { Card, Container, Row, Col, Input } from "react-bootstrap";
import fantasyBooks from "../data/fantasy.json";
import horrorBooks from "../data/horror.json";
import historyBooks from "../data/history.json";
import romanceBooks from "../data/romance.json";
import SingleBook from "./SingleBook";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

const AllTheBooks = () => {

    const allBooks = [...fantasyBooks, ...horrorBooks, ...historyBooks, ...romanceBooks]
    const uniqueBooks = Object.values(
        allBooks.reduce((acc, book) => {
            acc[book.asin] = book; // Sostituisce se già presente
            return acc;
        }, {})
    );

    const [inputText, setInputText] = useState("")
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(false)


    useEffect(() => {
        const inputLength = inputText.length
        if (inputLength >= 3) {
            const filteredData = uniqueBooks.filter(item => {
                const title = item.title.toLowerCase()
                return title.includes(inputText.toLocaleLowerCase())
            })
            setData(filteredData)        

        } else {
            setData(uniqueBooks)
        }


    }, [inputText])

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <Form.Label htmlFor="ricerca">Ricerca Libro</Form.Label>
                    <Form.Control
                        type="text"
                        id="ricerca"
                        defaultValue={inputText}
                        onChange={(val) => setInputText(val.target.value)}
                    />
                </Col>
            </Row>

            <Row className='px-3 px-md-0 gx-4 gy-4'>
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

    );
};

export default AllTheBooks;



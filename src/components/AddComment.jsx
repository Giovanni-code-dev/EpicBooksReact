import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const AddComment = ({ bookAsin, setComments }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            comment: comment,
            rate: rating,
            elementId: bookAsin,
        };

        fetch("https://striveschool-api.herokuapp.com/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDI1NzgwNzMsImV4cCI6MTc0Mzc4NzY3M30.kwN9PuHroLs1wj9mu8v0ycP-Eu-Wo9PEyNWBY2x3KKw"
            },
            body: JSON.stringify(newComment),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nell'invio del commento");
                }
                return response.json();
            })
            .then(data => {
                setComments(prevComments => [...prevComments, data]);
                setComment(""); // Resetta il form dopo l'invio
                setRating(1);
            })
            .catch(err => setError(err.message));
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-2">
                <Form.Label>Scrivi un commento:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo commento"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Valutazione (1 5):</Form.Label>
                <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary">
                Aggiungi Recensione
            </Button>
        </Form>
    );
};

export default AddComment;

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CommentsList from "./CommentList";
import AddComment from "./AddComment";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CommentArea = ({ bookAsin, selected, handleClose }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookAsin) {
            fetch(`https://striveschool-api.herokuapp.com/api/comments/${bookAsin}`, {
                headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDI1NzgwNzMsImV4cCI6MTc0Mzc4NzY3M30.kwN9PuHroLs1wj9mu8v0ycP-Eu-Wo9PEyNWBY2x3KKw" }
            })
                .then(res => res.json())
                .then(data => {
                    setComments(data);
                    setLoading(false);
                })
                .catch(error => console.error("Errore nel recupero commenti", error));
        }
    }, [bookAsin]);

    return (

        <Modal show={selected} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Commenti</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {loading ? (
                    <Spinner animation="border" variant="dark" />
                ) : (
                    <CommentsList comments={comments} setComments={setComments} />
                )}

                <AddComment bookAsin={bookAsin} setComments={setComments} />


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default CommentArea;

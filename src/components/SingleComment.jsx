import { useState } from "react";
import { ListGroup, Button, Alert, Form } from "react-bootstrap";

const SingleComment = ({ comment, setComments }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const [editedRate, setEditedRate] = useState(comment.rate);
    const [successMessage, setSuccessMessage] = useState("");

    const handleDelete = () => {
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo commento?");
        if (!confirmDelete) return;

        fetch(`https://striveschool-api.herokuapp.com/api/comments/${comment._id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDI1NzgwNzMsImV4cCI6MTc0Mzc4NzY3M30.kwN9PuHroLs1wj9mu8v0ycP-Eu-Wo9PEyNWBY2x3KKw"
            }
        })
        .then((res) => {
            if (!res.ok) throw new Error();
            setComments(prev => prev.filter(c => c._id !== comment._id));
            setSuccessMessage("Commento eliminato!");
            setTimeout(() => setSuccessMessage(""), 2000);
        })
        .catch(() => alert("Errore nell'eliminazione del commento."));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedComment = {
            comment: editedComment,
            rate: editedRate,
            elementId: comment.elementId
        };

        fetch(`https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
            
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDI1NzgwNzMsImV4cCI6MTc0Mzc4NzY3M30.kwN9PuHroLs1wj9mu8v0ycP-Eu-Wo9PEyNWBY2x3KKw"
            },
            body: JSON.stringify(updatedComment)
        })
        .then((res) => {
            if (!res.ok) throw new Error();
            // aggiorna il commento modificato nella lista
            setComments(prev => prev.map(c => c._id === comment._id ? { ...c, ...updatedComment } : c));
            setIsEditing(false);
            setSuccessMessage("Commento aggiornato!");
            setTimeout(() => setSuccessMessage(""), 2000);
        })
        .catch(() => alert("Errore nella modifica del commento."));
    };

    return (
        <>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <ListGroup.Item className="d-flex flex-column">
                {!isEditing ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <span><strong>{comment.comment}</strong> - {comment.rate}</span>
                            <div className="d-flex gap-2">
                                <Button variant="warning" size="sm" onClick={() => setIsEditing(true)}>
                                    Modifica
                                </Button>
                                <Button variant="danger" size="sm" onClick={handleDelete}>
                                    Elimina
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Form onSubmit={handleUpdate} className="mt-2">
                        <Form.Group className="mb-2">
                            <Form.Label>Commento</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Valutazione</Form.Label>
                            <Form.Select
                                value={editedRate}
                                onChange={(e) => setEditedRate(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex gap-2">
                            <Button variant="success" type="submit" size="sm">Salva</Button>
                            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Annulla</Button>
                        </div>
                    </Form>
                )}
            </ListGroup.Item>
        </>
    );
};

export default SingleComment;

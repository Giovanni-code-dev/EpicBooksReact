import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const EditComment = ({ comment, onSuccess, onCancel }) => {
  const [updatedComment, setUpdatedComment] = useState(comment.comment)
  const [updatedRate, setUpdatedRate] = useState(comment.rate)

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDM5NjMwNzUsImV4cCI6MTc0NTE3MjY3NX0.3a41C_h1eBeAyu5Zg78YUsvJZGf9U6R11eChU-2fi5s"
          },
          body: JSON.stringify({
            comment: updatedComment,
            rate: updatedRate,
            elementId: comment.elementId,
          }),
        }
      )

      if (response.ok) {
        alert('Commento aggiornato con successo!')
        onSuccess && onSuccess()
      } else {
        throw new Error('Errore nella modifica del commento')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Form onSubmit={handleUpdate} className="mt-2">
      <Form.Group className="mb-2">
        <Form.Label>Modifica il commento</Form.Label>
        <Form.Control
          type="text"
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Valutazione</Form.Label>
        <Form.Control
          as="select"
          value={updatedRate}
          onChange={(e) => setUpdatedRate(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button type="submit" variant="success" size="sm" className="me-2">
        Salva
      </Button>
      {onCancel && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
        >
          Annulla
        </Button>
      )}
    </Form>
  )
}

export default EditComment

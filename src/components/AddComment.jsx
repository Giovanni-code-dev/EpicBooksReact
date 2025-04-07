import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment = ({ asin, refresh }) => {
  const [comment, setComment] = useState({
    comment: '',
    rate: 1,
    elementId: null,
  })

  useEffect(() => {
    setComment((c) => ({
      ...c,
      elementId: asin,
    }))
  }, [asin])

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-type': 'application/json',
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDM5NjMwNzUsImV4cCI6MTc0NTE3MjY3NX0.3a41C_h1eBeAyu5Zg78YUsvJZGf9U6R11eChU-2fi5s",
          },
        }
      )
      if (response.ok) {
        alert('Recensione inviata!')
        setComment({
          comment: '',
          rate: 1,
          elementId: null,
        })
        refresh && refresh()
      } else {
        throw new Error('Inserisci un commento prima!!!!!')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="comment-textarea">Recensione</Form.Label>
          <Form.Control
            id="comment-textarea"
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="rate-select">Valutazione</Form.Label>
          <Form.Control
            id="rate-select"
            as="select"
            value={comment.rate}
            onChange={(e) =>
              setComment({
                ...comment,
                rate: e.target.value,
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  )
}

export default AddComment

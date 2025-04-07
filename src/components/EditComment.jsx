import { useState } from 'react'
import { Button } from 'react-bootstrap'



const EditComment = ({ comment, onSuccess, onCancel }) => {
    const [text, setText] = useState(comment.comment)
    const [rate, setRate] = useState(comment.rate)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      
      if (!text.trim() || !rate) {
        alert('Per favore compila tutti i campi prima di inviare.')
        return
      }
  
      try {
        const response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' + comment._id,
          {
            method: 'PUT',
            body: JSON.stringify({ comment: text, rate }),
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDM5NjMwNzUsImV4cCI6MTc0NTE3MjY3NX0.3a41C_h1eBeAyu5Zg78YUsvJZGf9U6R11eChU-2fi5s',
            },
          }
        )
  
        if (response.ok) {
          alert('Recensione modificata con successo!')
          onSuccess && onSuccess()
        } else {
          throw new Error('Errore nella modifica!')
        }
      } catch (error) {
        alert('Si è verificato un errore: ' + error.message)
      }
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Modifica il commento"
          className="form-control mb-2"
        />
        <select
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="form-control mb-2"
        >
          <option value="">Valutazione</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="success" className="me-2">
            Salva
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Annulla
          </Button>
        </div>
      </form>
    )
  }
  export default EditComment
import { useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import EditComment from './EditComment' // Assicurati che il path sia corretto

const SingleComment = ({ comment, refresh }) => {
  const [isEditing, setIsEditing] = useState(false)

  const deleteComment = async (asin) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDM5NjMwNzUsImV4cCI6MTc0NTE3MjY3NX0.3a41C_h1eBeAyu5Zg78YUsvJZGf9U6R11eChU-2fi5s",
          },
        }
      )
      if (response.ok) {
        alert('La recensione è stata eliminata!')
        refresh && refresh()
      } else {
        throw new Error('La recensione non è stata eliminata!')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <ListGroup.Item>
      {isEditing ? (
        <EditComment
          comment={comment}
          onSuccess={() => {
            refresh && refresh()
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {comment.comment}
          <Button
            variant="danger"
            className="ms-2 float-end"
            onClick={() => deleteComment(comment._id)}
          >
            Elimina
          </Button>
          <Button
            variant="warning"
            className="ms-2 float-end"
            onClick={() => setIsEditing(true)}
          >
            Modifica
          </Button>
        </>
      )}
    </ListGroup.Item>
  )
}

export default SingleComment

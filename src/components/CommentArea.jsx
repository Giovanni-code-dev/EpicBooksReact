import { useEffect, useState, useCallback } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchComments = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZGZlZmU3MDMzNzAwMTUzMTZkZDciLCJpYXQiOjE3NDM5NjMwNzUsImV4cCI6MTc0NTE3MjY3NX0.3a41C_h1eBeAyu5Zg78YUsvJZGf9U6R11eChU-2fi5s",
          },
        }
      )
      if (response.ok) {
        const comments = await response.json()
        setComments(comments)
        setIsError(false)
      } else {
        console.log('Errore nel fetch dei commenti')
        setIsError(true)
      }
    } catch (error) {
      console.log(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [asin]) // ✅ chiusura di useCallback

  useEffect(() => {
    if (asin) {
      fetchComments()
    }
  }, [fetchComments, asin]) // ✅ niente più warning

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} refresh={fetchComments} />
      <CommentList commentsToShow={comments} refresh={fetchComments} /> {/* ✅ Passato! */}
    </div>
  )
}

export default CommentArea

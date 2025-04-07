import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'

const CommentList = ({ commentsToShow, refresh }) => (
  <ListGroup style={{ color: 'black' }} className="mt-2">
    {commentsToShow.map((comment) => (
      <SingleComment
        comment={comment}
        key={comment._id}
        refresh={refresh} // Passaggio chiave!
      />
    ))}
  </ListGroup>
)

export default CommentList

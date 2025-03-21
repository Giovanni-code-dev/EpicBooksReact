import { ListGroup } from "react-bootstrap";
// TO DO: Aggiungere bottone qui per delete
const SingleComment = ({ comment }) => {
    return (
        <ListGroup.Item>
            <strong>{comment.comment}</strong> - {comment.rate}
        </ListGroup.Item>
    );
};

export default SingleComment;

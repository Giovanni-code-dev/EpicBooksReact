import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";
// TO DO: Fare la fetch con DELETE qui
// GESTIRE fatch con unseState che entra dentro SingleComment e riesce fuori tramite set dello stesso useState 
const CommentsList = ({ comments, setComments }) => {
    return (
        <ListGroup className="mt-3">
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <SingleComment
                        key={comment._id}
                        comment={comment}
                        setComments={setComments} 
                    />
                ))
            ) : (
                <p className="text-dark">Nessun commento disponibile.</p>
            )}
        </ListGroup>
    );
};

export default CommentsList;

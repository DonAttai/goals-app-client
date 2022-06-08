import { useDispatch } from "react-redux";
import { removeGoal } from "../features/goals/goalSlice";
import { Card, Button } from "react-bootstrap";

function GoalItem({ _id, text, createdAt }) {
  const dispatch = useDispatch();
  return (
    <Card className="my-1" border="secondary" bg="light">
      <Card.Body>
        <span className="d-flex flex-row-reverse ">
          <Button
            variant="danger"
            className="btn btn-sm p-1 m-0"
            onClick={() => dispatch(removeGoal(_id))}
          >
            x
          </Button>
        </span>
        <Card.Text className="text-dark">
          <span className="my-2 text-center fw-bold">{text}</span>
        </Card.Text>
        <span className="d-flex justify-content-center">
          <small className="text-dark text-muted">
            {new Date(createdAt).toLocaleString()}
          </small>
        </span>
      </Card.Body>
    </Card>
  );
}

export default GoalItem;

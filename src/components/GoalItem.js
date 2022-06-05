import { useDispatch } from "react-redux";
import { removeGoal } from "../features/goals/goalSlice";
import { Card, Button, Col } from "react-bootstrap";

function Goal({ _id, text, createdAt }) {
  const dispatch = useDispatch();
  return (
    <Col md={4}>
      <Card className="my-1 mx-1" border="secondary" bg="light">
        <Card.Body>
          <span className="d-flex flex-row-reverse">
            <Button
              variant="danger"
              className="btn btn-sm"
              onClick={() => dispatch(removeGoal(_id))}
            >
              x
            </Button>
          </span>
          <Card.Text className="text-dark">
            <p className="my-2 text-center fw-bold">{text}</p>
          </Card.Text>
          <span className="d-flex justify-content-center">
            <small className="text-dark text-muted">
              {new Date(createdAt).toLocaleString()}
            </small>
          </span>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Goal;

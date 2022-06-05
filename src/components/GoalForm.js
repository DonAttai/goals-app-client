import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGoal } from "../features/goals/goalSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

function GoalForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGoal({ text }));

    setText("");
  };
  return (
    <section>
      <Row className="justify-content-center mb-3">
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controld="email">
              <Form.Control
                type="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a goal..."
                autoComplete="off"
              />
            </Form.Group>
            <Button className="btn btn-sm mb-3" type="submit" variant="primary">
              submit
            </Button>
          </Form>
        </Col>
      </Row>
    </section>
  );
}

export default GoalForm;

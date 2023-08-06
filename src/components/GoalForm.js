import { useDispatch } from "react-redux";
import { addGoal } from "../features/goals/goalSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

function GoalForm() {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = [...formData.values()];
    if (values.includes("")) {
      alert("Please, enter text");
      return;
    }
    const data = Object.fromEntries(formData);
    dispatch(addGoal(data));
    e.currentTarget.reset();
  };

  return (
    <section>
      <Row className="justify-content-center mb-3">
        <Col md={4}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controld="email">
              <Form.Control
                type="text"
                name="text"
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

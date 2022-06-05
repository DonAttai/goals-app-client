import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice";
import Goal from "./GoalItem";
import Loader from "./Loader";

function GoalList() {
  const dispatch = useDispatch();
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, message]);

  if (goals.length < 1) {
    return <h3 className="text-dark">You have not set any goal</h3>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="text-dark">
      <Container>
        <Row>
          {goals.map((goal) => (
            <Col md={4}>
              <Goal key={goal._id} {...goal} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default GoalList;

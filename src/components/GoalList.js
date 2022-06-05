import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "./GoalItem";
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

  if (isLoading) {
    return <Loader />;
  }

  <section>
    {goals.legnth > 0 ? (
      <div className="text-dark">
        <Container>
          <Row>
            {goals.map((goal) => (
              <Col md={4} key={goal._id}>
                <GoalItem {...goal} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    ) : (
      <h3 className="text-dark">You have not set any goal</h3>
    )}
  </section>;
}

export default GoalList;

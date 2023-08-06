import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGoals, reset } from "../features/goals/goalSlice";

import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Loader from "../components/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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

  return (
    <>
      <section className="text-dark">
        <h2 className="mt-5 text-capitalize my-3">
          Welcome, {user && user.name}
        </h2>
      </section>
      <GoalForm />

      <section>
        {goals.length ? (
          <div className="text-dark goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} {...goal} />
            ))}
          </div>
        ) : (
          <h3 className="text-dark">You have not set any goal</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

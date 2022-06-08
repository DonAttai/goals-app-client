import { useEffect } from "react";
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

  if (goals.length > 0) {
    return (
      <div className="text-dark goals">
        {goals.map((goal) => (
          <GoalItem key={goal._id} {...goal} />
        ))}
      </div>
    );
  }

  return <h3 className="text-dark">You have not set any goal</h3>;
}

export default GoalList;

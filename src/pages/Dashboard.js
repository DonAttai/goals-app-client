import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="text-dark">
        <h2 className="mt-5 text-capitalize my-3">
          Welcome, {user && user.name}
        </h2>
      </section>
      <GoalForm />
      <GoalList />
    </>
  );
}

export default Dashboard;

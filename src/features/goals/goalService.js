import axios from "../../api/axios";

// Add Goal
const addGoal = async (goal) => {
  const response = await axios.post("/goals", goal);
  return response.data;
};

//Get user Goals
const getGoals = async () => {
  const response = await axios.get("/goals");
  return response.data;
};

// Remove Goal
const removeGoal = async (id) => {
  const response = await axios.delete(`/goals/${id}`);
  return response.data;
};

const goalService = {
  addGoal,
  getGoals,
  removeGoal,
};
export default goalService;

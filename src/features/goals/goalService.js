import axios from "axios";
const URL = "https://attai-goals-app.herokuapp.com/api/goals";

// Add Goal
const addGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.post(URL, goal, config);
  return response.data;
};

//Get user Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.get(URL, config);
  return response.data;
};

// Remove Goal
const removeGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.delete(URL + `/${id}`, config);
  return response.data;
};

const goalService = {
  addGoal,
  getGoals,
  removeGoal,
};
export default goalService;

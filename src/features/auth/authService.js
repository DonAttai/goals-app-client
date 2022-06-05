import axios from "axios";

const URL = "https://attai-goals-app.herokuapp.com/api/users";
const register = async (userData) => {
  const response = await axios.post(URL + "/register", userData);

  return response.data;
};
const login = async (userData) => {
  const response = await axios.post(URL + "/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;

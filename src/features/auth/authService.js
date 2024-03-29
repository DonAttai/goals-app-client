import axios from "../../api/axios";

const register = async (userData) => {
  const response = await axios.post("/users/register", userData);

  return response.data;
};
const login = async (userData) => {
  const response = await axios.post("/users/login", userData);
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

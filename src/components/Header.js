import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">GoalSetter</div>
        <ul className="nav">
          <>
            {user ? (
              <li>
                <Button
                  // href="/login"
                  className="btn btn-dark btn-sm"
                  onClick={logOut}
                >
                  <FaSignOutAlt />
                  LogOut
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-item">
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-item">
                    <FaUser />
                    Register
                  </Link>
                </li>
              </>
            )}
          </>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import Loader from "../components/Loader";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Enter all fields");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
      navigate("/");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="mt-5">
      <Row className="justify-content-center align-items-center ">
        <Col md={4}>
          <Card border="primary">
            <Card.Header>
              <h5 className="text-dark">
                <FaSignInAlt />
                Log In{" "}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controld="email">
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Enter a valid email"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                  <span className="d-flex justify-content-start">
                    <Form.Text className="px-2 ">
                      Don't have an account?{" "}
                      <Link className="px-2 " to="/register">
                        Register
                      </Link>
                    </Form.Text>
                  </span>
                </Form.Group>

                <Button className="btn btn-sm" type="submit" variant="primary">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import Loader from "../components/Loader";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/login");
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

    if (password !== password2) {
      toast.error("passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        password2,
      };
      dispatch(register(userData));
      navigate("/login");
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          {isError && message}
          <Card border="primary">
            <Card.Header>
              {" "}
              <h5 className="text-dark">
                <FaUser />
                Create an account
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Enter name"
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="password2">
                  <Form.Control
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirm passwrod"
                    autoComplete="off"
                  />
                  <span className="d-flex justify-content-start">
                    <Form.Text className="px-3">
                      Have an account?{" "}
                      <Link className="px-2 " to="/login">
                        Login
                      </Link>
                    </Form.Text>
                  </span>
                </Form.Group>
                <Button type="submit" className="btn btn-sm">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
export default Register;

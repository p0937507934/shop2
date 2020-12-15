import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import FormContainer from "./FormContainer";
import axios from "axios";
import { withRouter } from "react-router-dom";
const Login = ({ location, history, setLog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", res.data.token);
      localStorage.setItem("userName", res.data.name);
      setLog(localStorage.getItem("userInfo"));
      history.push("/");
    } catch (error) {
      alert("帳號或密碼錯誤");
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to="/register">
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default withRouter(Login);

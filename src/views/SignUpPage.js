import React, { useState,  } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase" 

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col md={4}>
        <h1 className="my-3">Sign up for an account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to ='/login'>Have an existing account? Login here.</Link>
        </Form.Group>
        <Button className="mb-3" variant="primary" onClick={async (e) => {
            setError("");
            const canSignUp = username && password;
            if (canSignUp) {
                try {
                    await createUserWithEmailAndPassword(auth, username, password);
                    navigate("/")
                }catch (error) {
                    setError(error.message)
                    }
                }
            
        }}>Sign Up</Button>
      </Form>
        </Col>
      </Row>
      
      <p>{error}</p>
    </Container>
  );
}
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import GoogleButton from 'react-google-button'
import { UserAuth } from "../context/AuthContext";


export default function LoginPage() {
  const { googleSignIn, user } = UserAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(user !=null) {
      navigate('/account');
    }
  }, [user,navigate]);

  return (
    <Container>
      <Row>
        <Col md={4}>
      <h1 className="my-3">Login to your account</h1>
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
          <a href="/signup">Sign up for an account</a>
        </Form.Group>
        <Button className="mb-3" variant="primary" onClick={async (e) => {

            setError("");
            const canLogin = username && password;
            if (canLogin) {
                try {
                    //Try running some code
                    await signInWithEmailAndPassword(auth, username, password);
                    navigate("/");
                } catch (error) {
                    //Something went wrong! Now I am going to handle it properly here.
                    setError(error.message);

                }
            }
        }}>
          Login
        </Button>
      </Form>
      <GoogleButton onClick={handleGoogleSignIn}/>
      </Col>
      </Row>
      <p>{error}</p>
    </Container>
  );
}
import React, { useEffect,  } from "react";
import { Container, Row, Col, Button, } from "react-bootstrap";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Account = () => {
    const navigate = useNavigate();
    const { logOut, user} = UserAuth();

    const handleSignOut = async () => {
        try{
            await logOut();
        }   catch (error) {
            console.log(error);
        }    
        };



  return (
    <Container>
        <Row>
            <Col md={4}>
            <h1 className="my-3">Account</h1>
            <p>Welcome, {user?.displayName}</p>
            <Button variant="primary" onClick={handleSignOut}>Logout</Button>
            </Col>
        </Row>
      
      </Container>
  );
};

export default Account;
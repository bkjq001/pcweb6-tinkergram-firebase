import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaArrowRightFromBracket } from "react-icons/fa6"


const Sitenav = () => {
   
return (
    <Navbar variant="light" bg="light">
    <Container>
      <Navbar.Brand href="/">⭕ The Giving Circle</Navbar.Brand>
      <Nav>
        <Nav.Link href="/add">Add an Event</Nav.Link>
        <Nav.Link onClick={() => signOut(auth)}> <FaArrowRightFromBracket /></Nav.Link>
      </Nav>
    </Container>
  </Navbar>
)
}

export default Sitenav
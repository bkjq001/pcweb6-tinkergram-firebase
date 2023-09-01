import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaArrowRightFromBracket, FaArrowRightToBracket } from "react-icons/fa6"
import { UserAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom'



const Sitenav = () => {
   const {user, logOut} = UserAuth();

   const handleSignOut = async () => {
    try{
        await logOut()
    } catch (error) {
        console.log(error)
    }
   }
           //<Nav.Link href="/add">Add an Event</Nav.Link>

return (
    <Navbar variant="light" bg="light">
    <Container>
      <Navbar.Brand href="/">⭕ The Giving Circle</Navbar.Brand>
      <Nav>
        {user?.displayName ? (<Nav.Link onClick={() => signOut(auth)} to={"/"} >Sign Out <FaArrowRightFromBracket /></Nav.Link>) : (<Link to ='/login'>Sign In</Link>)}
      </Nav>
    </Container>
  </Navbar>
)
}

export default Sitenav
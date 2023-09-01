import { useEffect, useState } from "react";
import { Card, Container, Image, Nav, Navbar, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";

export default function PostPageHome() {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);


   async function getAllPosts() {
    const query = await getDocs(collection(db,"posts"));
    const posts = query.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

 const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">⭕ The Giving Circle</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Add an Event</Nav.Link>
            { user && <Nav.Link onClick={() => signOut(auth)}>🚪</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}


function ImageSquare({ post }) {
  const { image, id, caption, startdate, enddate, comment  } = post;
  return (
    <Card style={{
      width: "22rem",
      margin: "1rem",
      border:"solid",
      borderColor:"#eee",
      borderWidth: "1px",
      borderRadius: "5px",
    }}>
    <Card.Body>
    <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
          
        }}
      />
      <Card.Title style={{
        paddingTop:"1rem",
        height:"5rem",
      }}>{caption}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Dates: {startdate} to {enddate}</Card.Subtitle>
      <Card.Text className="text-truncate" style={{
      }}>
        {comment}
      </Card.Text>

      <Link
      to={`post/${id}`}
    >
      <Nav className="justify-content-end">
      <Button variant="primary">
        Read More
      </Button>
      </Nav>
    </Link>
    </Card.Body>
  </Card>

    
    
       
  );
}
import { useEffect, useState } from "react";
import { Card, Container, Image, Nav, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth";

export default function PostPageHome() {
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
      
      <Container>
        <h1 className="mt-3">All Events</h1>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}



function ImageSquare({ post }) {
  const [user] = useAuthState(auth);
  const { image, organizer, id, caption, startdate, enddate, comment  } = post;
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
      <Card.Text className="text-muted">Organizer: {organizer}</Card.Text>
      <Card.Subtitle className="mb-2 text-muted">Dates: {startdate} to {enddate}</Card.Subtitle>
      <Card.Text>
        {comment}
      </Card.Text>

      
      <Nav className="justify-content-end">
      {user?.displayName ? (      
      <Button href={`/update/${id}`} variant="primary">
      Edit
    </Button>) : (<Button href={`/post-register/${id}`} variant="primary">
        Learn More
      </Button>)}
       &nbsp;
       {user?.displayName ? (      
      <Button href={`/post-register/${id}`} variant="primary">
      Event Details
    </Button>) : (null)}
      </Nav>
    </Card.Body>
  </Card>

    
    
       
  );
}
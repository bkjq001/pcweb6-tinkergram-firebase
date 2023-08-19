import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, Image } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom" ;
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("https://zca.sg/img/placeholder");
  const navigate = useNavigate();

  async function addPost() {

    //Reserve a spot in Firebase Storage for a file im about to upload. This spot should be in the images folder, and the file name will be image.name.
    const imageReference = ref(storage, `images/${image.name}`);
    // upload the file to the spot I just reserved in Firebase Storage.
    const response = await uploadBytes(imageReference, image);
    // Get me a URL for the file I just uploaded so I can access this from anywhere.
    const imageUrl = await getDownloadURL(response.ref); 
    // Add the document to cloud firestore
    
    
  await addDoc(collection (db, "posts"), { 
    comment, caption, image: imageUrl, imageName: image.name 
    });
    navigate("/");
  }

  //we want to make sure that only login users are able to add a post.
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate ("/login");
  }, [loading, user, navigate]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={() => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={comment}
              onChange={(text) => setComment(text.target.value)}
            />
          </Form.Group>
          <Image
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "10rem",
              height: "10rem",
            }}
            />
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                if (e.target.files.length ===0) return;
                 const imageFile = e.target.files[0];
                 const previewImage = URL.createObjectURL(imageFile);
                 setImage(imageFile);
                 setPreviewImage(previewImage);
              }}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
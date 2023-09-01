import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deletePost(id) {

    //logic to delete image from firebase storage
    const deleteRef = ref(storage, `images/${imageName}`);
    deleteObject(deleteRef)
        .then(() => {
            console.log("image has been deleted from firebase storage");
        })
        .catch((error) => {
            console.error(error.message);
        })

    await deleteDoc(doc(db, "posts", id))
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setComment(post.comment);
    setImage(post.image);
    setImageName(post.imageName);
  }

  useEffect(() => {
    if(loading) return;
    if(!user) navigate("/login");
    getPost(id);
  }, [id, loading, user, navigate]);

  return (
    <>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{caption}</Card.Title>
                <Card.Text style={{ fontStyle: "italic" }}>{comment}</Card.Text>
                <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
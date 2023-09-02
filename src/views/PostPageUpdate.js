import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row, Col, Stack, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [comment, setComment] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState("https://zca.sg/img/placeholder");
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

  async function updatePost() {

    let imageURL = previewImage;

    if (image) {
    const deleteRef = ref(storage, `images/${imageName}`);
    await deleteObject(deleteRef);
    console.log("old image has been delete from gcs!");

    const imageReference = ref(storage, `images/$image.name`);
    const response = await uploadBytes(imageReference, image);
    imageURL = await getDownloadURL(response.ref);
    }
    await updateDoc(doc(db, "posts",id), {
      comment, organizer, startdate, enddate, starttime, endtime, location, requirements, caption, image: imageURL });
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setComment(post.comment);
    setOrganizer(post.organizer);
    setStartdate(post.startdate);
    setEnddate(post.enddate);
    setStarttime(post.starttime);
    setEndtime(post.endtime);
    setLocation(post.location);
    setRequirements(post.requirements);
    setCaption(post.caption);
    setPreviewImage(post.image);
    setImageName(post.imageName);
  }

  useEffect(() => {
    if(loading) return;
    if(!user) navigate("/login");
    getPost(id);
  }, [id, loading, navigate, user]);

  return (
    <div>
      <Container className="mb-5">
        <h1 style={{ marginBlock: "1rem" }}>Update Event</h1>
        <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer"}}
                >
                  Delete this Event
                </Card.Link>
        <Form>
          <Row className="mt-3"><Col md={6}>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label><h6>Event Name</h6></Form.Label>
            <Form.Control
              type="text"
              maxlength="55"
              placeholder=""
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label><h6>Brief Description</h6></Form.Label>
            <Form.Control
              as="textarea"
              maxlength = "300" 
              rows={3}
              placeholder=""
              value={comment}
              onChange={(comment) => setComment(comment.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label><h6>Event Location</h6></Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={location}
              onChange={(location) => setLocation(location.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="requirements">
            <Form.Label><h6>Requirements</h6></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder=""
              value={requirements}
              onChange={(requirements) => setRequirements(requirements.target.value)}
            />
          </Form.Group>
          </Col>
          
          <Col md={4}>
          <Stack>
          <Form.Group className="mb-3" controlId="organizer">
            <Form.Label><h6>Organizer</h6></Form.Label>
            <Form.Control
              type="text"
              maxlength="55"
              placeholder=""
              value={organizer}
              onChange={(organizer) => setOrganizer(organizer.target.value)}
            />
          </Form.Group>
          <Form.Label><h6>Upload Event Image</h6></Form.Label>
          <Image className="mb-3"
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "25rem",
              height: "18rem",
            }}
            />
            <Form.Group className="mb-3" controlId="image">
            <Form.Label></Form.Label>
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
          </Stack>
          </Col>
          </Row>
          
          
          <h3>Event Dates & Time</h3>
            <Row>
              <Col md={4}><Form.Group className="mb-3" controlId="startdate">
            <Form.Label><h6>Start Date</h6></Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={startdate}
              onChange={(date) => setStartdate(date.target.value)}
            />
          </Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3" controlId="enddate">
            <Form.Label><h6>End Date</h6></Form.Label>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={enddate}
              onChange={(enddate) => setEnddate(enddate.target.value)}
            />
          </Form.Group></Col>
            </Row>
            <Row>
            <Col md={4}><Form.Group className="mb-3" controlId="starttime">
            <Form.Label><h6>Session Start Time</h6></Form.Label>
            <Form.Control
              type="time"
              placeholder="00:00 AM"
              value={starttime}
              onChange={(starttime) => setStarttime(starttime.target.value)}
            />
          </Form.Group></Col>
              
              <Col md={4}><Form.Group className="mb-3" controlId="endtime">
            <Form.Label><h6>Session End Time</h6></Form.Label>
            <Form.Control
              type="time"
              placeholder="00:00 AM"
              value={endtime}
              onChange={(endtime) => setEndtime(endtime.target.value)}
            />
          </Form.Group></Col>
          
            </Row>
            
          <Button variant="primary" onClick={(e) => updatePost()}>
            Update
          </Button>
          
        </Form>
      </Container>
    </div>
  );
}
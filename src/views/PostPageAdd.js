import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row, Col, Stack} from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom" ;
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png");
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
    comment, startdate, enddate, starttime, endtime, caption, location, requirements, image: imageUrl, imageName: image.name 
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
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Event</h1>
        <Form>
          <Row><Col md={6}>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              maxlength="55"
              placeholder=""
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Brief Description</Form.Label>
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
            <Form.Label>Event Location</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={location}
              onChange={(location) => setLocation(location.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="requirements">
            <Form.Label>Requirements</Form.Label>
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
          <Form.Label>Upload Event Image</Form.Label>
          <Image className="mb-3"
            src={previewImage}
            style={{
              objectFit: "cover",
              width: "25rem",
              height: "20rem",
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
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={startdate}
              onChange={(date) => setStartdate(date.target.value)}
            />
          </Form.Group></Col>
          <Col md={4}><Form.Group className="mb-3" controlId="enddate">
            <Form.Label>End Date</Form.Label>
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
            <Form.Label>Session Start Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="00:00 AM"
              value={starttime}
              onChange={(starttime) => setStarttime(starttime.target.value)}
            />
          </Form.Group></Col>
              
              <Col md={4}><Form.Group className="mb-3" controlId="endtime">
            <Form.Label>Session End Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="00:00 AM"
              value={endtime}
              onChange={(endtime) => setEndtime(endtime.target.value)}
            />
          </Form.Group></Col>
          
            </Row>
            
          <Button variant="primary" size="lg" onClick={async (e) => addPost()}>
            Submit
          </Button>
          
        </Form>
      </Container>
    </>
  );
}
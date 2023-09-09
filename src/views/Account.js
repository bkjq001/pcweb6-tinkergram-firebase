import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Nav, } from "react-bootstrap";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { query, doc, getDocs, collection, where } from 'firebase/firestore';
import { db } from "../firebase";



const Account = () => {
    const navigate = useNavigate();
    const { logOut, user} = UserAuth();
    const [ postLists, setPostList ] = useState([]);
    

    const handleSignOut = async () => {
        try{
            await logOut();
        }   catch (error) {
            console.log(error);
        }    
        };


useEffect(() => {
            const fetchPostLists = async () => {
                if(user) {
                    try {
                        const postsQuery = query(
                            collection(db, "posts"),
                        );
                        const querySnapshot = await getDocs(postsQuery);
                        const posts = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id, }));
                        const postLists = posts.filter((post) => post.userId === user.uid);

                        setPostList(postLists);
                    } catch (error) {
                        console.error("Error fetching user posts: ", error);
                    }
                }

            };

            fetchPostLists();

        }, [user]);



  return (
    <Container>
        <Row>
            <Col md={4}>
            <h1 className="my-3">Account</h1>
            <p>Welcome, {user?.displayName}</p>
            <p>{user?.email}</p>
            <p>{user.uid}</p>
            <Button variant="primary" onClick={handleSignOut}>Logout</Button>
            </Col>
        </Row>
        <hr />
        <h2>My Events</h2>
        <Col>
        {postLists.map((post) => {
            const { id, caption, image } = post;
            return  <Card style={{ width: '18rem', marginBottom: '1rem', 
            }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{caption}</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <Button href={`/update/${id}`} variant="primary">Edit</Button>
            </Card.Body>
          </Card>
          
        })}
      </Col>
      </Container>
      
  );
};

export default Account;
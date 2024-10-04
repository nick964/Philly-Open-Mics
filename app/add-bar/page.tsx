// app/add-bar/page.tsx
"use client";

import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import  BarSearch  from '../components/BarSearch';
import RRuleGenerator from 'react-rrule-generator';
import '../styles/rrule-generator-override.css'// Adjust the path based on your folder structure

export default function AddBar() {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [rrule, setRRule] = useState('');
  const [startTime, setStartTime] = useState('');
  const [signupTime, setSignupTime] = useState('');
  const [showTime, setShowTime] = useState('');



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Create a Firestore instance
    const firestore = getFirestore();
    try {
      const newEvent = {
        dayOfWeek: day,
        host: name,
        isActive: true,
        length: 180,
        showTime: showTime,
        signupTime: signupTime
      };


      const docRef = await addDoc(collection(firestore, 'mics'), {
        name,
        day,
        location,
        description,
        rrule,
        startTime,
      });

      console.log('Document written with ID: ', docRef.id);
      
      // Reset form fields
      setName('');
      setDay('');
      setLocation('');
      setDescription('');
      setRRule('');
      setStartTime('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Add New Bar</h1>
          <p>Fill out the form below to add a new bar with open mic events.</p>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <BarSearch />
          </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formMicName">
              <Form.Label>Mic Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mic name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBarName">
              <Form.Label>Bar Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bar name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupTime">
              <Form.Label>Sign up time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter signup time"
                value={signupTime}
                onChange={(e) => setSignupTime(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formShowTime">
              <Form.Label>Show time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter show time"
                value={showTime}
                onChange={(e) => setShowTime(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a brief description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRRule">
              <Form.Label>Repeat</Form.Label>
              <RRuleGenerator
                onChange={(value) => setRRule(value)}
                config={{
                  hideStart: true,
                  repeat: ["Weekly", "Monthly"],
                  hideEnd: true,
                  hideError: true,
                  hideDuration: true,
                }}
                value={rrule}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

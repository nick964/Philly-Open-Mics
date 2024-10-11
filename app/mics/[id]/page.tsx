// app/pages/mics/[id]/page.tsx
"use client";
import { useAuthState } from 'react-firebase-hooks/auth'; // Using Firebase Hooks for Authentication
import { auth } from '../../../lib/firebase'; // Assuming Firebase Auth is initialized in firebase.ts
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { Container, Row, Col, Card, Button, Modal} from 'react-bootstrap';
import { Event } from '../../models/event';
import ContactForm from '../../components/ContactForm';
import axios from 'axios';

export default function EventDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [suggestFormSubmitted, setSuggestFormSubmitted] = useState(false);
  const [user] = useAuthState(auth); // Get the logged-in user


  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  }

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  }

  const handleConfirmDelete = async () => {
    try {
      if (event) {
        await deleteDoc(doc(db, 'mics', event.id));
        console.log('Event deleted successfully');
        handleDeleteClose();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  const handleContactFormSubmit = async (name: string, email: string, message: string) => {
    try {
      await axios.post('/api/send-email', {
        name,
        email,
        message,
      });
      setSuggestFormSubmitted(true);
    } catch (err) {
      setError('An error occurred while sending the message.');
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      // Extract `id` from the router query (which may be undefined initially)
      console.log('in fetch event');
      console.log(id);
      if (id) {
        console.log(`Fetching event with ID: ${id}`);
        try {
          const eventDoc = await getDoc(doc(db, 'mics', id as string));
          if (eventDoc.exists()) {
            console.log("Document data:", eventDoc.data());
            setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      }

      setLoading(false); // Set loading to false after attempting to fetch the event
    };

    fetchEvent();
  }, [id]); // Depend on `router.query.id`

  if (loading) {
    return (
      <Container>
        <Row>
          <Col>
            <p>Loading event details...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container>
        <Row>
          <Col>
            <p>No event found.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-5">
      <Col>
        {/* Show the edit button only if the user is logged in */}
        {user && (
          <div>
            <div className="mt-4">
              <Link href={`/mics/${event.id}/edit`} passHref>
                <Button variant="warning">Edit Event</Button>
              </Link>
            </div>
            <div className="mt-4">
              <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
            </div>
          </div>
        )}
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <h1>{event.name}</h1>
          <p><a href={event.mapUrl} target="_blank" rel="noopener noreferrer">View on Map</a></p>
          <Card>
            <Card.Body>
              <Card.Text>
                <strong>Neighborhood:</strong> {event.neighborhood}
              </Card.Text>
              <Card.Text>
                <strong>Signup Time:</strong> {event.signupTime}
              </Card.Text>
              <Card.Text>
                <strong>Show Time:</strong> {event.showTime}
              </Card.Text>
              <Card.Text>
                <strong>Sign Up Method:</strong> {event.signUpMethod}
              </Card.Text>
              <Card.Text>
                <strong>Length:</strong> {event.length}
              </Card.Text>
              <Card.Text>
                <strong>List Method:</strong> {event.listMethod}
              </Card.Text>
              <Card.Text>
                <strong>Recurrence:</strong> {event.recurrenceDescription}
              </Card.Text>
              <Card.Text>
                <strong>Host:</strong> {event.host}
              </Card.Text>
              <Card.Text>
                <strong>Notes:</strong> {event.notes}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <ContactForm onSubmit={handleContactFormSubmit} />
        </Col>
      </Row>

            {/* Modal for delete confirmation */}
      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the event "{event.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

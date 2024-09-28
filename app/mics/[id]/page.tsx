// app/pages/mics/[id]/page.tsx
"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Event } from '../../models/event';


export default function EventDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

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
    </Container>
  );
}

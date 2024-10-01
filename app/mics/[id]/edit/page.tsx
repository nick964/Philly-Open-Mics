// app/mics/[id]/edit.tsx
"use client";

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '../../../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Container, Form, Button } from 'react-bootstrap';
import { Event } from '../../../models/event';

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams(); // Extract event ID from the URL
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      const eventRef = doc(db, 'mics', id as string);
      const eventDoc = await getDoc(eventRef);

      if (eventDoc.exists()) {
        setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event);
      }
      setIsLoading(false);
    };

    fetchEvent();
  }, [id]);

  // Update event details in Firestore
  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !id) return;

    const eventRef = doc(db, 'mics', id);
    await updateDoc(eventRef, {
      ...event,
    });

    // Navigate back to the event details page after saving
    router.push(`/mics/${id}`);
  };

  if (isLoading || !event) {
    return <p>Loading event details...</p>;
  }

  return (
    <Container>
      <h1>Edit Event: {event.name}</h1>
      <Form onSubmit={handleUpdateEvent}>
        <Form.Group controlId="formName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            value={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formNeighborhood" className="mt-3">
          <Form.Label>Neighborhood</Form.Label>
          <Form.Control
            type="text"
            value={event.neighborhood}
            onChange={(e) => setEvent({ ...event, neighborhood: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formSignupTime" className="mt-3">
          <Form.Label>Signup Time</Form.Label>
          <Form.Control
            type="text"
            value={event.signupTime}
            onChange={(e) => setEvent({ ...event, signupTime: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formShowTime" className="mt-3">
          <Form.Label>Show Time</Form.Label>
          <Form.Control
            type="text"
            value={event.showTime}
            onChange={(e) => setEvent({ ...event, showTime: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formSignUpMethod" className="mt-3">
          <Form.Label>Sign Up Method</Form.Label>
          <Form.Control
            type="text"
            value={event.signUpMethod}
            onChange={(e) => setEvent({ ...event, signUpMethod: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formLength" className="mt-3">
          <Form.Label>Length</Form.Label>
          <Form.Control
            type="text"
            value={event.length}
            onChange={(e) => setEvent({ ...event, length: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formListMethod" className="mt-3">
          <Form.Label>List Method</Form.Label>
          <Form.Control
            type="text"
            value={event.listMethod}
            onChange={(e) => setEvent({ ...event, listMethod: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formRecurrenceDescription" className="mt-3">
          <Form.Label>Recurrence Description</Form.Label>
          <Form.Control
            type="text"
            value={event.recurrenceDescription}
            onChange={(e) => setEvent({ ...event, recurrenceDescription: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formHost" className="mt-3">
          <Form.Label>Host</Form.Label>
          <Form.Control
            type="text"
            value={event.host}
            onChange={(e) => setEvent({ ...event, host: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formNotes" className="mt-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            value={event.notes}
            onChange={(e) => setEvent({ ...event, notes: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

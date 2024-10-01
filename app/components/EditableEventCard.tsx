// app/components/EditableEventCard.tsx
import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { Event } from '../models/event';
import { db } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // Using Firebase Hooks for Authentication
import { auth } from '../../lib/firebase'; // Assuming Firebase Auth is initialized in firebase.ts

interface EditableEventCardProps {
  event: Event;
}

export default function EditableEventCard({ event }: EditableEventCardProps) {
  const [user] = useAuthState(auth); // Get the logged-in user
  const [isEditing, setIsEditing] = useState(false);
  const [editableEvent, setEditableEvent] = useState<Event>({ ...event });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const eventDocRef = doc(db, 'mics', event.id);
      await updateDoc(eventDocRef, editableEvent);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        {isEditing ? (
          <>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editableEvent.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formNeighborhood">
                <Form.Label>Neighborhood</Form.Label>
                <Form.Control
                  type="text"
                  name="neighborhood"
                  value={editableEvent.neighborhood}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formSignupTime">
                <Form.Label>Signup Time</Form.Label>
                <Form.Control
                  type="text"
                  name="signupTime"
                  value={editableEvent.signupTime}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formShowTime">
                <Form.Label>Show Time</Form.Label>
                <Form.Control
                  type="text"
                  name="showTime"
                  value={editableEvent.showTime}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* Add other fields similarly */}
            </Form>
            <Button variant="success" onClick={handleSaveChanges} className="mt-3">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleEditToggle} className="mt-3 ms-2">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Card.Title className="text-primary">{editableEvent.name}</Card.Title>
            <Card.Text>
              <strong>Neighborhood:</strong> {editableEvent.neighborhood}
            </Card.Text>
            <Card.Text>
              <strong>Signup Time:</strong> {editableEvent.signupTime}
            </Card.Text>
            <Card.Text>
              <strong>Show Time:</strong> {editableEvent.showTime}
            </Card.Text>
            {/* Display other event details similarly */}
          </>
        )}
      </Card.Body>
      {user && !isEditing && (
        <Card.Footer>
          <Button variant="primary" onClick={handleEditToggle}>
            Edit Event
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
}

// app/components/EventCard.tsx
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { Event } from '../models/event';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="text-primary"> 
          <Link href={`/mics/${event.id}`} passHref>
            {event.name}
          </Link>
        </Card.Title>
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
          <strong>Host:</strong> {event.host}
        </Card.Text>
        <Card.Text>
          <strong>Notes:</strong> {event.notes}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

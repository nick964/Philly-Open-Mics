// app/components/EventCard.tsx
import Link from 'next/link';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Event } from '../models/event';
import { FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa'; // Importing icons for visual enhancement

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="shadow-sm h-100 border-0 rounded-3 overflow-hidden">
      {/* Card Header with Background */}
      <Card.Header className="p-0 bg-info text-white text-center" style={{ position: 'relative', height: '120px' }}>
        <Card.Title className="position-absolute w-100" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <Link href={`/mics/${event.id}`} passHref>
            <span className="text-white text-uppercase h4 font-weight-bold text-decoration-none">
              {event.name}
            </span>
          </Link>
        </Card.Title>
      </Card.Header>

      <Card.Body className="pt-4 pb-2">
        {/* Event Details Row */}
        <Row className="mb-2">
          <Col>
            <FaMapMarkerAlt className="text-muted me-2" />
            <span className="fw-bold">Neighborhood:</span> {event.neighborhood}
          </Col>
        </Row>

        <Row className="mb-2">
          <Col>
            <FaClock className="text-muted me-2" />
            <span className="fw-bold">Signup Time:</span> {event.signupTime}
          </Col>
          <Col>
            <FaClock className="text-muted me-2" />
            <span className="fw-bold">Show Time:</span> {event.showTime}
          </Col>
        </Row>

        <Row className="mb-2">
          <Col>
            <FaUser className="text-muted me-2" />
            <span className="fw-bold">Host:</span> {event.host}
          </Col>
        </Row>

        {/* Method and List Info */}
        <div className="d-flex flex-wrap align-items-center">
          <Badge bg="info" className="me-2">{event.signUpMethod}</Badge>
          <Badge bg="secondary">{event.listMethod}</Badge>
        </div>

        {/* Notes Section */}
        {event.notes && (
          <Card.Text className="mt-3 text-muted" style={{ fontStyle: 'italic' }}>
            <small>{event.notes}</small>
          </Card.Text>
        )}
      </Card.Body>

      {/* Footer with Event Length */}
      <Card.Footer className="bg-light text-center">
        <small className="text-muted">Length: {event.length}</small>
      </Card.Footer>
    </Card>
  );
}

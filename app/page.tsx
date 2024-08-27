// app/page.tsx
"use client";

import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { events } from './data/events';
import { isEventToday } from './utils/recurrence';

interface Event {
  id: number;
  bar: string;
  link: string;
  neighborhood: string;
  signupTime: string;
  showTime: string;
  signUp: string;
  length: string;
  order: string;
  recurrence: string;
  host: string;
  active: boolean;
  notes: string;
  dayOfWeek: string;
  rrule: string;
  eventType: string;
}

export default function Home() {
  const [todaysEvents, setTodaysEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<string>('ANY');

  useEffect(() => {
    const today = new Date();
    const todayDayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const filteredEvents = events.filter(event => 
      event.dayOfWeek === todayDayOfWeek &&
      //(event.rrule === 'N/A' || isEventToday(event.rrule, today))
      (event.rrule === 'N/A' || event.dayOfWeek === todayDayOfWeek) &&
      (filter === 'ANY' || event.eventType === filter)
    );
    setTodaysEvents(filteredEvents);
  }, [filter]);

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Open Mic Finder</h1>
          <p>Discover open mic events happening near you today.</p>
          <Form>
            <Form.Group controlId="eventTypeSelect">
              <Form.Label>Filter by Event Type</Form.Label>
              <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto' }}>
                <option value="ANY">Any</option>
                <option value="COMEDY">Comedy</option>
                <option value="MUSIC">Music</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        {todaysEvents.length > 0 ? (
          todaysEvents.map(event => (
            <Col key={event.id} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">{event.bar}</a>
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
                    <strong>Sign Up:</strong> {event.signUp}
                  </Card.Text>
                  <Card.Text>
                    <strong>Length:</strong> {event.length}
                  </Card.Text>
                  <Card.Text>
                    <strong>Order:</strong> {event.order}
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
          ))
        ) : (
          <Col>
            <p>No events found for today.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

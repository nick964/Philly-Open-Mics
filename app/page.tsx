// app/page.tsx
"use client";

import Link from 'next/link';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Event } from './models/event';
import EventCard from './components/EventCard' // Import your new EventCard component

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<string>('ANY');
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    setDayOfWeek(today);

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsCollection = collection(db, 'mics');
        const eventsSnapshot: QuerySnapshot<DocumentData> = await getDocs(eventsCollection);
        
        const eventsData = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Event[];

        setEvents(eventsData);
        filterEvents(eventsData, filter, today);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents(events, filter, dayOfWeek);
  }, [filter, dayOfWeek, events]);

  const filterEvents = (events: Event[], filter: string, dayOfWeek: string) => {
    const filtered = events.filter(event => 
      event.dayOfWeek === dayOfWeek &&
      (filter === 'ANY' || event.mictype.toUpperCase() === filter)
      && event.isActive
    );
    setFilteredEvents(filtered);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5 mb-5">
        <Container>
          <h1 className="display-4">Open Mic Finder</h1>
          <p className="lead">Discover the best open mic events happening near you today.</p>
          <Form className="d-flex justify-content-center mt-4">
            <Form.Group controlId="eventTypeSelect" className="me-2">
              <Form.Label className="text-white">Event Type</Form.Label>
              <Form.Control 
                as="select" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                style={{ width: 'auto' }}
              >
                <option value="ANY">Any</option>
                <option value="COMEDY">Comedy</option>
                <option value="MUSIC">Music</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dayOfWeekSelect" className="me-2">
              <Form.Label className="text-white">Day of Week</Form.Label>
              <Form.Control 
                as="select" 
                value={dayOfWeek} 
                onChange={(e) => setDayOfWeek(e.target.value)} 
                style={{ width: 'auto' }}
              >
                <option value="SUNDAY">Sunday</option>
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Container>
      </header>

      {/* Event Cards Section */}
      <Container>
        <Row>
          {loading ? (
            <Col className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading events...</p>
            </Col>
            ) : (
            filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Col key={event.id} md={4} className="mb-4">
                  <EventCard event={event} /> {/* Use the EventCard component */}
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No events found for the selected day.</p>
              </Col>
            )
          )}
        </Row>
      </Container>
    </div>
  );
}

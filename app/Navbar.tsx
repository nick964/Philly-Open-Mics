// app/Navbar.tsx
"use client";

import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Philly Open Mics</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/events" passHref>
              Events
            </Nav.Link>
            <Nav.Link as={Link} href="/add-bar" passHref>
              Add Bar
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/login" passHref>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

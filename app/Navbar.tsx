// app/Navbar.tsx
"use client";

import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function MyNavbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Philly Open Mics</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/add-bar" passHref>
              Add Bar
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} href="/login" passHref>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} href="/signup" passHref>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <Nav.Link onClick={() => auth.signOut()} href="#">
                Signout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="light">
      <Container id="navbar" className="d-flex justify-content-between">

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="d-flex align-items-center">
            <Link passHref href="/">
              <Nav.Link className="nav-tabs">Home</Nav.Link>
            </Link>
            <Link passHref href="/newCloud">
              <Nav.Link className="nav-tabs">Found</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link className="nav-tabs">Profile</Nav.Link>
            </Link>
            <Link passHref href="/googleMap">
              <Nav.Link className="nav-tabs">Map</Nav.Link>
            </Link>
          </Nav>

          <Nav className="d-flex justify-content-center align-items-center flex-grow-1">
            <p className="title-nav">CLOUD CHASERS</p>
          </Nav>

          <Nav className="d-flex align-items-center">
            <Button variant="outline-dark" className="signout-btn" onClick={signOut}>Sign Out</Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

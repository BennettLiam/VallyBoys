import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"

export default function Header( {text} ){
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Vally Boys</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Sprays">Sprays</Nav.Link>
            <Nav.Link href="/PlayerCards">Player Cards</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}
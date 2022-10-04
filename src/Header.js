import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"

export default function Header( {text} ){
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/VallyBoys/">Vally Boys</Link>
          <Nav className="me-auto">
            <NavLink to="/VallyBoys/Sprays" className={"m-2 p-1"}>Sprays</NavLink>
            <NavLink to="/VallyBoys/PlayerCards" className={"m-2 p-1"}>Player Cards</NavLink>
            <NavLink to="/VallyBoys/About" className={"m-2 p-1"}>About</NavLink>
            <NavLink to="/VallyBoys/Mario" className={"m-2 p-1"}>Mario</NavLink>
          </Nav>
        </Container>
      </Navbar>
    )
}
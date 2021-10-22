import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';


const NavbarMenu = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/carerlist">List</Nav.Link>
                    <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu

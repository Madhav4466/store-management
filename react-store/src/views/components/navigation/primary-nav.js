import React from "react";
import { Col, Container, Dropdown, Form, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PrimaryNav() {
    return(
        <Navbar expand="lg" bg="light" data-bs-theme="light" style={{"zIndex": "10000"}} aria-label="Primary">
            <Container fluid className="px-3">
                <Navbar.Brand className="d-lg-flex d-none">Hi, User!</Navbar.Brand>
                <Navbar.Brand className="d-sm-flex d-lg-none">Hi, Mobile User!</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav variant="underline" className="my-2 my-lg-0 w-100 p-2" style={{ maxHeight: '100px' }} role="list" navbarScroll>
                        <Container fluid>
                            <Row className="justify-content-between">
                                <Col lg={3} className="d-flex">
                                    <Form className="d-flex w-100">
                                        <Form.Control type="search" placeholder="Search" className="me-2 w-100" aria-label="Search"   />
                                    </Form>
                                </Col>
                                <Col lg={3} sm={12} className="d-flex justify-content-lg-end align-items-center flex-column flex-lg-row">
                                    <Nav.Link as={Link} to="/" role="listitem">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/workplace" role="listitem">Workplace</Nav.Link>
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="d-flex align-items-center text-decoration-none">
                                            <div
                                                className="rounded-circle text-white d-flex justify-content-center align-items-center"
                                                style={{ width: '30px', height: '30px', 
                                                    backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`, }}
                                            >
                                            <span className="fw-bold">MS</span>
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={"/profile"}>Profile</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={"/profile/setting"}>Settings</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={"account/login"}>Log Out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Container>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
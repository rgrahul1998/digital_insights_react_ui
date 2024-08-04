import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./contact_us.css"

const ContactUs = () => {
    return (
        <div>
            <div className="imagee">
                <h1>Anything we can help you with?</h1>
                <p>Your questions, no matter how big or small, are always welcome. Feel free to reach out to us.</p>
            </div>
            <Container style={{ marginTop: '50px' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="contact-form" style={{ padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                        <h2>Contact Us</h2>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Work Email</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" />
                            </Form.Group>
                            <Form.Group controlId="formHowDidYouHear">
                                <Form.Label>How did you hear about us?</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="formMessage">
                                <Form.Label>Your Message</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ backgroundColor: '#FF3B77', border: 'none' }}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default ContactUs;

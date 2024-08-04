import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './request_demo.css'; // Assuming you have a CSS file for custom styling

function RequestDemo() {
  const [formData, setFormData] = useState({
    user: '',
    company: '',
    name: '',
    sector: '',
    location: ''
  });
  // eslint-disable-next-line
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://insights.asiot.net/api/method/digital_insights.digital_insights.api.request_demo.create_request_demo', null, {
        params: {
          work_email: formData.work_email,
          name: formData.name,
          company: formData.company,
          contact_no: formData.contact_no,
          country: formData.country,
          description: formData.description,
        },
      });

      console.log(response.data.message);

      if (response.data.message.status === 'success') {
        toast.success(response.data.message.message);
        setIsSubmitted(true);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message.message);
      }
    } catch (error) {
      toast.error('Error occurred while submitting the form.');
      console.error('Error:', error);
    }
  };

  return (
    <Container className="request_demo-container">
      <h2 className="text-center mb-4">Demo Request Form</h2>
      <Form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridWorkEmail">
            <Form.Label>Work Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter work email id"
              name="work_email"
              value={formData.work_email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCompany">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Contact No."
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>How did you hear about us?</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Request Demo
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default RequestDemo;

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
import './onboarding.css'; // Assuming you have a CSS file for custom styling

function Onboarding() {
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
      const response = await axios.post('https://insights.asiot.net/api/method/digital_insights.digital_insights.api.company_onboard.create_company_onboard_api', null, {
        params: {
          user: formData.user,
          company: formData.company,
          name: formData.name,
          sector: formData.sector,
          location: formData.location
        },
      });

      console.log(11111111, response);

      if (response.data.message.status === 'success') {
        toast.success(response.data.message.message);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/dashboard');
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
    <Container className="onboarding-container">
      <h2 className="text-center mb-4">Onboarding Form</h2>
      <Form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUserEmail">
            <Form.Label>User Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user email id"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCompany">
            <Form.Label>Company</Form.Label>
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
          <Form.Group as={Col} controlId="formGridSector">
            <Form.Label>Sector</Form.Label>
            <Form.Select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              required
            >
              <option>Choose...</option>
              <option>IT</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
}

export default Onboarding;

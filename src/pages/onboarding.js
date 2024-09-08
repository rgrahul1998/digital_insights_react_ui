import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import API_URL from "../config"

function Onboarding() {
    const [formData, setFormData] = useState({
        user: "",
        company: "",
        name: "",
        sector: "",
        location: "",
    })
    // eslint-disable-next-line
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                API_URL +
                    "/api/method/digital_insights.digital_insights.api.company_onboard.create_company_onboard_api",
                null,
                {
                    params: {
                        user: localStorage.getItem("user"),
                        company: formData.company,
                        name: formData.name,
                        sector: formData.sector,
                        location: formData.location,
                    },
                },
            )

            if (response.data.message.status === "success") {
                toast.success(response.data.message.message)
                setIsSubmitted(true)
                setTimeout(() => {
                    navigate("/dashboard")
                }, 2000)
            } else {
                toast.error(response.data.message.message)
            }
        } catch (error) {
            toast.error("Error occurred while submitting the form.")
            console.error("Error:", error)
        }
    }

    return (
        <Container className="onboarding-container mt-5 d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4">Onboarding Form</h2>
                <Form className="p-4 border rounded-4 shadow bg-white" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCompany">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter company name"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="rounded-3"
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
                                className="rounded-3"
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
                                className="rounded-3"
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
                                className="rounded-3"
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" className="w-100 rounded-3 py-2">
                        Submit
                    </Button>
                </Form>
            </div>
            <ToastContainer />
        </Container>
    )
}

export default Onboarding

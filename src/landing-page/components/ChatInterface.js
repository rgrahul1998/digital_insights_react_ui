import React, { useState, useCallback } from "react"
import { CButton, CCard, CCardBody, CCardHeader, CFormInput, CFormTextarea } from "@coreui/react"
import { MessageCircle, Send, X, ChevronDown, Check, ArrowLeft } from "lucide-react"

const Chaticon = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedService, setSelectedService] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [subject, setSubject] = useState("")
    const [problem, setProblem] = useState("")
    const [isServicesOpen, setIsServicesOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [emailError, setEmailError] = useState("")

    const services = ["FP&A Powered by ML and AI", "FinSightPro", "DataFusion", "MagicExcel", "CRM"]

    const toggleChat = useCallback(() => {
        if (isOpen) resetForm()
        setIsOpen((prev) => !prev)
    }, [isOpen])

    const resetForm = useCallback(() => {
        setSelectedOption(null)
        setSelectedService("")
        setEmail("")
        setContact("")
        setSubject("")
        setProblem("")
        setIsServicesOpen(false)
        setIsSubmitted(false)
        setEmailError("")
    }, [])

    const handleOptionSelect = useCallback((option) => setSelectedOption(option), [])

    const validateEmail = (email) => {
        const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com"]
        const domain = email.split("@")[1]
        return publicDomains.includes(domain) ? "Please use an official email address." : ""
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        const error = validateEmail(newEmail)
        setEmailError(error)
    }

    const handleSubmit = () => {
        if (!email || emailError) return

        const submissionData =
            selectedOption === "Services"
                ? { selectedService, email, contact }
                : { email, subject, problem }
        console.log("Submitted:", submissionData)

        setIsSubmitted(true)
        setTimeout(resetForm, 5000)
    }

    const renderContent = () => {
        if (isSubmitted) {
            return (
                <div className="text-center py-8">
                    <Check size={48} className="mx-auto text-success mb-4" />
                    <p className="text-lg font-semibold mb-2">Thank you for your submission!</p>
                    <p>Our sales team will get back to you within 24 hours.</p>
                </div>
            )
        }

        if (!selectedOption) {
            return (
                <div className="space-y-2">
                    <CButton
                        onClick={() => handleOptionSelect("Services")}
                        color="primary"
                        className="w-full text-left"
                    >
                        Product
                    </CButton>
                    <CButton
                        onClick={() => handleOptionSelect("Request")}
                        color="primary"
                        className="w-full text-left"
                    >
                        Request
                    </CButton>
                </div>
            )
        }

        if (selectedOption === "Services") {
            return (
                <div className="space-y-2">
                    <div className="relative">
                        <CButton
                            onClick={() => setIsServicesOpen((prev) => !prev)}
                            color="light"
                            className="w-full text-left flex justify-between items-center"
                        >
                            {selectedService || "Select a Product"}
                            <ChevronDown size={18} />
                        </CButton>
                        {isServicesOpen && (
                            <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-lg z-10">
                                {services.map((service) => (
                                    <CButton
                                        key={service}
                                        onClick={() => {
                                            setSelectedService(service)
                                            setIsServicesOpen(false)
                                        }}
                                        color="light"
                                        className="w-full text-left p-2 hover:bg-gray-100"
                                    >
                                        {service}
                                    </CButton>
                                ))}
                            </div>
                        )}
                    </div>
                    <CFormInput
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Business Email"
                        invalid={!!emailError}
                    />
                    {emailError && <p className="text-danger text-sm">{emailError}</p>}
                    <CFormInput
                        type="tel"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Contact Number"
                    />
                    <CButton
                        onClick={handleSubmit}
                        color="primary"
                        className="w-full flex justify-center items-center"
                    >
                        <Send size={18} className="mr-2" />
                        Send
                    </CButton>
                </div>
            )
        }

        if (selectedOption === "Request") {
            return (
                <div className="space-y-2">
                    <CFormInput
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email ID"
                        invalid={!!emailError}
                    />
                    {emailError && <p className="text-danger text-sm">{emailError}</p>}
                    <CFormInput
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                    />
                    <CFormTextarea
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="Describe your problem..."
                        rows="3"
                    />
                    <CButton
                        onClick={handleSubmit}
                        color="primary"
                        className="w-full flex justify-center items-center"
                    >
                        <Send size={18} className="mr-2" />
                        Send
                    </CButton>
                </div>
            )
        }
    }

    return (
        <div className="fixed bottom-4 right-4">
            {!isOpen ? (
                <CButton
                    onClick={toggleChat}
                    color="primary"
                    className="p-3 rounded-circle shadow-lg"
                >
                    <MessageCircle size={24} />
                </CButton>
            ) : (
                <CCard className="shadow-xl w-80">
                    <CCardHeader className="bg-primary text-white">
                        {selectedOption ? (
                            <CButton onClick={resetForm} color="transparent" className="text-white">
                                <ArrowLeft size={24} />
                            </CButton>
                        ) : (
                            <div className="w-6"></div>
                        )}
                        <h3 className="font-bold">Chat</h3>
                        <CButton onClick={toggleChat} color="transparent" className="text-white">
                            <X size={24} />
                        </CButton>
                    </CCardHeader>
                    <CCardBody className="p-4 h-auto max-h-96 overflow-y-auto">
                        {renderContent()}
                    </CCardBody>
                </CCard>
            )}
        </div>
    )
}

export default Chaticon

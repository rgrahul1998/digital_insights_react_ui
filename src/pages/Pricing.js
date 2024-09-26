import { CContainer } from "@coreui/react"
import React, { useState } from "react"
import styled from "styled-components"

const PricingPage = () => {
    const [showQuoteForm, setShowQuoteForm] = useState(false)

    const handleGetQuote = () => {
        setShowQuoteForm(true)
    }

    const handleCloseModal = (e) => {
        // Close the modal if clicked outside of the content area
        if (e.target.id === "modal-overlay") {
            setShowQuoteForm(false)
        }
    }

    const plans = [
        {
            name: "Business",
            description: "Suitable solutions for businesses of any size with optimal add-ons",
            features: [
                "Full Users and features rather Basic Models",
                "You can add more user types: Full Users, Planners and Viewers, and select roles",
                "Premium features like ERP, CRM or BI systems; unlimited system connections",
            ],
        },
        {
            name: "Professional",
            description: "Premium features for enterprise-scale solutions",
            features: [
                "All Business package features plus premium add-ons",
                "Additional enterprise-level security features",
                "Premium cloud accounting services",
                "Advanced Planning and Forecasting models",
            ],
        },
        {
            name: "Performance",
            description: "Performance for very large models and user counts",
            features: [
                "Outstanding performance for large concurrent user counts and complex planning models",
                "Unlimited data volumes",
                "Advanced security features",
                "Priority support",
            ],
        },
    ]

    const faqs = [
        {
            question: "How much does BizintelAi cost?",
            answer: "We tailor each package to custom-fit your needs. Fill out the form to get pricing that meets your needs best.",
        },
        {
            question: "Do reports, dashboards or PowerPoints cost extra?",
            answer: "No, there is no limit to the number of outputs you can have with Datarails. They're customizable, real-time, and drillable.",
        },
        {
            question: "Why should I pay for Datarails when I already have Excel?",
            answer: "Excel is irreplaceable, and we supercharge it with Datarails Flex. You'll get cloud storage, collaboration, and access to your financials securely.",
        },
    ]

    return (
        <PageWrapper>
            <div>
                {/* Header Section */}
                <section
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "125px 10%",
                        backgroundColor: "#153859",
                    }}
                >
                    <CContainer fluid style={{ textAlign: "center" }}>
                        <h1 style={{ color: "#fff", fontWeight: "bold", fontSize: "3rem" }}>
                            Plans and Pricing
                        </h1>
                        <h6
                            style={{
                                color: "#fff",
                                lineHeight: 1.9,
                                fontSize: "1.25rem",
                                marginTop: "15px",
                                maxWidth: "600px",
                                margin: "0 auto",
                            }}
                        >
                            We’d love to discuss your specific challenges and provide a customized
                            quote to suit your needs.
                        </h6>
                    </CContainer>
                </section>
            </div>

            <PlansSection>
                <h2>Find the perfect fit for your business and scale quickly</h2>
                <PlansGrid>
                    {plans.map((plan) => (
                        <PlanCard key={plan.name}>
                            <h3>{plan.name}</h3>
                            <p>{plan.description}</p>
                            <FeatureList>
                                {plan.features.map((feature, index) => (
                                    <FeatureItem key={index}>{feature}</FeatureItem>
                                ))}
                            </FeatureList>
                            <Button onClick={handleGetQuote}>Get a Quote</Button>
                        </PlanCard>
                    ))}
                </PlansGrid>
            </PlansSection>

            <FAQSection>
                <h2>Frequently Asked Questions</h2>
                <FAQGrid>
                    {faqs.map((faq, index) => (
                        <FAQCard key={index}>
                            <FAQQuestion>{faq.question}</FAQQuestion>
                            <FAQAnswer>{faq.answer}</FAQAnswer>
                        </FAQCard>
                    ))}
                </FAQGrid>
            </FAQSection>

            {showQuoteForm && (
                <QuoteFormModal id="modal-overlay" onClick={handleCloseModal}>
                    <ModalContent>
                        <h2>Request a Quote</h2>
                        <p>
                            Fill out the form, and we’ll provide an offer tailored to your
                            requirements.
                        </p>
                        <form>
                            <Input type="text" placeholder="First Name" required />
                            <Input type="text" placeholder="Last Name" required />
                            <Input type="email" placeholder="Work Email" required />
                            <Input type="tel" placeholder="Work Phone" required />
                            <Input type="text" placeholder="Company Name" required />
                            <Select required>
                                <option value="">Select Country</option>
                                {/* Add country options here */}
                            </Select>
                            <Select required>
                                <option value="">Select Number of Users</option>
                                {/* Add user number options here */}
                            </Select>
                            <Textarea placeholder="Describe your business needs" required />
                            <Label>
                                <input type="checkbox" required />I agree to the processing and
                                storage of my personal data.
                            </Label>
                            <Button type="submit">Send Request</Button>
                        </form>
                        <CloseButton
                            aria-label="Close quote form"
                            onClick={() => setShowQuoteForm(false)}
                        >
                            ×
                        </CloseButton>
                    </ModalContent>
                </QuoteFormModal>
            )}
        </PageWrapper>
    )
}

// Common styled components
const PageWrapper = styled.div`
    font-family: Arial, sans-serif;
    color: #333;
    line-height: 1.6;
`

const Header = styled.header`
    background: linear-gradient(135deg, #4a0e95, #ff0066);
    color: white;
    padding: 60px 20px;
    text-align: center;
`

const PlansSection = styled.section`
    padding: 60px 20px;
    text-align: center;
`

const PlansGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
`

const PlanCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const FeatureList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
    text-align: left;
`

const FeatureItem = styled.li`
    margin-bottom: 10px;
    &:before {
        content: "✓";
        color: #34a853;
        margin-right: 10px;
    }
`

const FAQSection = styled.section`
    background-color: #f7f7f7;
    padding: 60px 20px;
`

const FAQGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
`

const FAQCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
`

const FAQQuestion = styled.h3`
    color: #333;
    margin-bottom: 10px;
`

const FAQAnswer = styled.p`
    color: #666;
`

const Button = styled.button`
    background-color: #6a5acd;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;

    &:hover {
        background-color: #483d8b;
    }
`

const QuoteFormModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Modal overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 90%;
    position: relative;
`

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 100%;
`

const Select = styled.select`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 100%;
`

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    margin-bottom: 10px;
    width: 100%;
`

const Label = styled.label`
    display: flex;
    align-items: center;
    margin-top: 10px;
`

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #333;
`

export default PricingPage

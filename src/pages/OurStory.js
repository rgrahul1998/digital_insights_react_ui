import React from "react"
import { CContainer, CRow, CCol, CCard, CCardBody, CCardText, CCardImage } from "@coreui/react"
import "@coreui/coreui/dist/css/coreui.min.css" // CoreUI CSS
import "./App.css" // Your custom styles

const OurStory = () => {
    return (
        <>
            <div className="hero">
                <CContainer>
                    <h1>Our Story</h1>
                    <p>Revolutionizing Financial Planning & Analysis with AI-Powered Solutions</p>
                </CContainer>
            </div>

            <CContainer className="section">
                <section>
                    <h2>Our Journey</h2>
                    <div className="timeline">
                        <TimelineItem year="2015" position="left">
                            Founded with a vision to transform financial planning and analysis
                            through innovative technology.
                        </TimelineItem>
                        <TimelineItem year="2017" position="right">
                            Launched our first AI-powered FP&A solution, revolutionizing how
                            businesses approach financial forecasting.
                        </TimelineItem>
                        <TimelineItem year="2019" position="left">
                            Expanded our suite of services to include advanced data analytics and
                            real-time reporting capabilities.
                        </TimelineItem>
                        <TimelineItem year="2021" position="right">
                            Introduced our game-changing Excel add-in, bridging the gap between
                            traditional spreadsheets and cloud-based AI solutions.
                        </TimelineItem>
                        <TimelineItem year="2024" position="left">
                            Celebrating our growth as a leader in FP&A solutions, serving over 1000
                            businesses worldwide.
                        </TimelineItem>
                    </div>
                </section>

                <section>
                    <h2>Our Values</h2>
                    <div className="values">
                        <ValueItem icon="🚀" title="Innovation">
                            Constantly pushing the boundaries of what's possible in FP&A technology.
                        </ValueItem>
                        <ValueItem icon="🤝" title="Collaboration">
                            Fostering partnerships with our clients to drive mutual success.
                        </ValueItem>
                        <ValueItem icon="🔒" title="Integrity">
                            Upholding the highest standards of data security and ethical practices.
                        </ValueItem>
                        <ValueItem icon="📈" title="Excellence">
                            Striving for excellence in every solution we deliver.
                        </ValueItem>
                    </div>
                </section>

                <section>
                    <h2>Our Expertise</h2>
                    <p>
                        At BizIntelAI, we specialize in revolutionizing Financial Planning &
                        Analysis through cutting-edge AI and machine learning technologies. Our team
                        of financial experts and data scientists work tirelessly to develop
                        solutions that:
                    </p>
                    <ul>
                        <li>Automate complex financial modeling and forecasting processes</li>
                        <li>Provide real-time insights for better decision-making</li>
                        <li>Enhance budgeting accuracy and efficiency</li>
                        <li>Streamline financial consolidation across multiple entities</li>
                        <li>Offer predictive analytics for proactive financial management</li>
                    </ul>
                    <p>
                        We're proud to have helped businesses of all sizes optimize their financial
                        operations, from startups to Fortune 500 companies.
                    </p>
                </section>

                <section className="team-section">
                    <h2>Our Team</h2>
                    <div className="team-container">
                        {teamMembers.map((member) => (
                            <TeamMemberCard key={member.name} {...member} />
                        ))}
                    </div>
                </section>
            </CContainer>
        </>
    )
}

const TimelineItem = ({ year, position, children }) => (
    <div className={`timeline-item ${position}`}>
        <div className="content">
            <h3>{year}</h3>
            <p>{children}</p>
        </div>
    </div>
)

const ValueItem = ({ icon, title, children }) => (
    <div className="value-item">
        <div className="value-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{children}</p>
    </div>
)

const TeamMemberCard = ({ name, role, image }) => (
    <CCard className="team-member-card">
        <CCardImage orientation="top" src={image} alt={name} className="team-member-image" />
        <CCardBody className="team-member-info">
            <h3 className="team-member-name">{name}</h3>
            <p className="team-member-role">{role}</p>
        </CCardBody>
    </CCard>
)

const teamMembers = [
    {
        name: "Jane Doe",
        role: "CEO & Founder",
        image: "/api/placeholder/250/250",
    },
    {
        name: "John Smith",
        role: "CTO",
        image: "/api/placeholder/250/250",
    },
    {
        name: "Emily Chen",
        role: "Head of AI Research",
        image: "/api/placeholder/250/250",
    },
    {
        name: "Michael Brown",
        role: "Chief Financial Strategist",
        image: "/api/placeholder/250/250",
    },
]

export default OurStory

import React from "react"
import { CContainer, CRow, CCol, CCard, CCardBody } from "@coreui/react"

const OurTeam = () => {
    // Team data array
    const team = [
        {
            name: "Sarah Johnson",
            title: "Chief Financial Officer",
            description:
                "With over 15 years of experience in financial strategy, Sarah leads our team in delivering cutting-edge FP&A solutions.",
        },
        {
            name: "Michael Chen",
            title: "Head of Data Analytics",
            description:
                "Michael's expertise in big data and machine learning drives our predictive financial modeling capabilities.",
        },
        {
            name: "Aisha Patel",
            title: "Senior Financial Analyst",
            description:
                "Aisha specializes in risk assessment and scenario planning, helping clients navigate complex financial landscapes.",
        },
        {
            name: "David Rodriguez",
            title: "AI Integration Specialist",
            description:
                "David bridges the gap between finance and technology, implementing AI solutions for enhanced financial decision-making.",
        },
    ]

    return (
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
                        Meet Our Expert Team
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
                        Bringing together decades of experience in finance, technology, and
                        analytics
                    </h6>
                </CContainer>
            </section>

            {/* Team Section */}
            <section style={{ padding: "50px 10%" }}>
                <CContainer>
                    <CRow>
                        {team.map((member, index) => (
                            <CCol
                                key={index}
                                md={3}
                                sm={6}
                                style={{
                                    marginBottom: "30px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <CCard
                                    style={{
                                        borderRadius: "15px",
                                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        overflow: "hidden",
                                        maxWidth: "300px",
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = "translateY(-10px)"
                                        e.currentTarget.style.boxShadow =
                                            "0 15px 40px rgba(0, 0, 0, 0.2)"
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)"
                                        e.currentTarget.style.boxShadow =
                                            "0 8px 30px rgba(0, 0, 0, 0.1)"
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "20px",
                                            textAlign: "center",
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    >
                                        <img
                                            src={`path_to_image/${member.name
                                                .replace(/\s+/g, "_")
                                                .toLowerCase()}.jpg`} // Add real image paths
                                            alt={member.name}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "10px 10px 0 0",
                                            }}
                                        />
                                    </div>
                                    <CCardBody style={{ textAlign: "center", padding: "20px" }}>
                                        <h5
                                            style={{
                                                fontWeight: "bold",
                                                color: "#0d3b66",
                                                fontSize: "1.25rem",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {member.name}
                                        </h5>
                                        <p style={{ color: "#5a5a5a", fontWeight: "600" }}>
                                            {member.title}
                                        </p>
                                        <p
                                            style={{
                                                color: "#7a7a7a",
                                                fontSize: "0.95rem",
                                                lineHeight: "1.5",
                                            }}
                                        >
                                            {member.description}
                                        </p>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        ))}
                    </CRow>
                </CContainer>
            </section>

            {/* Join Our Team Section */}
            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "50px 0",
                    backgroundColor: "#f4f6f9",
                    textAlign: "center",
                }}
            >
                <CContainer>
                    <h3 style={{ fontWeight: "bold", color: "#0d3b66" }}>Join Our Team</h3>
                    <p style={{ color: "#5a5a5a", maxWidth: "600px", margin: "15px auto" }}>
                        We're always looking for talented individuals to help us push the boundaries
                        of FP&A.
                    </p>
                    <button
                        style={{
                            backgroundColor: "#5a67d8",
                            color: "#fff",
                            padding: "12px 25px",
                            border: "none",
                            borderRadius: "9px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#434bb4"
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#5a67d8"
                        }}
                    >
                        View Open Positions
                    </button>
                </CContainer>
            </section>
        </div>
    )
}

export default OurTeam

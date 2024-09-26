import React, { useState } from "react"
import "./DataFusion.css" // Ensure to save your styles in a separate CSS file
import { CContainer, CRow, CCol, CButton, CCard, CCardBody } from "@coreui/react"

const DataFusion = () => {
    // const [activeImageIndex, setActiveImageIndex] = useState(0)
    const images = "path/to/image1.jpg"

    const styles = {
        heroSection: {
            display: "flex",
            padding: "60px 10%",
            backgroundColor: "#153859",
        },
        textCol: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: "40px",
        },
        heroTitle: {
            color: "#fff",
            fontWeight: "bold",
        },
        ctaButton: {
            display: "inline-block",
            maxWidth: "200px",
            backgroundColor: "#ff7f7f",
            padding: "15px 40px",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
        },
        imageCol: {
            position: "relative",
            minHeight: "300px",
        },
        heroImage: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0,
            transition: "opacity 1s ease-in-out",
        },
        featuresSection: {
            backgroundColor: "#f8f9fa",
            padding: "60px 10%",
            textAlign: "center",
        },
        featureCards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
            marginTop: "40px",
        },
        featureCard: {
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
        featureIcon: {
            fontSize: "3em",
            marginBottom: "20px",
        },
        featureTitle: {
            color: "#34A853",
            marginBottom: "15px",
        },
        howToUse: {
            padding: "40px 10%",
        },
        footer: {
            textAlign: "center",
            padding: "20px",
        },
    }

    return (
        <div>
            <section style={styles.heroSection}>
                <CContainer fluid>
                    <CRow className="align-items-stretch">
                        <CCol xs={12} md={6} style={styles.textCol}>
                            <h1 style={styles.heroTitle}>Data Fusion</h1>
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
                                Unify your data landscape with our AI-powered Data Fusion solution.
                                Create a single source of truth by integrating, cleansing, and
                                harmonizing data from multiple sources, enabling confident
                                decision-making and streamlined operations.
                            </h6>
                            <CButton
                                href="/request-demo"
                                style={styles.ctaButton}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#ff4d4d")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#ff7f7f")
                                }
                            >
                                Request Demo
                            </CButton>
                        </CCol>
                        <CCol xs={12} md={6} style={styles.imageCol}>
                            <img
                                src={images}
                                alt="Hero"
                                style={styles.heroImage}
                                onLoad={(e) => (e.currentTarget.style.opacity = 1)} // Fade-in effect
                            />
                        </CCol>
                    </CRow>
                </CContainer>
            </section>

            <section style={styles.featuresSection}>
                <h2>Key Features</h2>
                <CRow className="feature-cards" style={styles.featureCards}>
                    {[
                        {
                            icon: "🔄",
                            title: "Intelligent Data Integration",
                            description:
                                "Seamlessly combine data from various sources using AI-driven matching and merging algorithms.",
                        },
                        {
                            icon: "🧼",
                            title: "Advanced Data Cleansing",
                            description:
                                "Automatically detect and correct inconsistencies, duplicates, and errors across your data sets.",
                        },
                        {
                            icon: "🔍",
                            title: "Entity Resolution",
                            description:
                                "Identify and link related entities across different data sources for a unified view of your data.",
                        },
                        {
                            icon: "📊",
                            title: "Real-time Data Harmonization",
                            description:
                                "Standardize and normalize data on-the-fly for consistent reporting and analysis.",
                        },
                        {
                            icon: "🔒",
                            title: "Data Governance & Compliance",
                            description:
                                "Ensure data quality, privacy, and regulatory compliance throughout the fusion process.",
                        },
                        {
                            icon: "📈",
                            title: "Scalable Data Processing",
                            description:
                                "Handle large volumes of data with our cloud-native, distributed processing architecture.",
                        },
                    ].map((feature, index) => (
                        <CCol xs="12" md="5" key={index}>
                            <CCard style={styles.featureCard}>
                                <CCardBody>
                                    <div style={styles.featureIcon}>{feature.icon}</div>
                                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </section>

            <section style={styles.howToUse}>
                <h2>How to Use</h2>
                <div>
                    <p>Instructions on how to use your product or service.</p>
                </div>
            </section>
        </div>
    )
}

export default DataFusion

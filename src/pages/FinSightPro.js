import React, { useState } from "react"
import "./DataFusion.css" // Ensure to save your styles in a separate CSS file
import { CContainer, CRow, CCol, CButton, CCard, CCardBody } from "@coreui/react"

const FinsightPro = () => {
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
                            <h1 style={{ color: "#fff", fontWeight: "bold", fontSize: "3rem" }}>
                                Finance Insight Pro
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
                                {" "}
                                Revolutionize your financial analysis with AI-driven solutions.
                                Enhance data interpretation, forecasting, and decision-making while
                                uncovering insights and optimizing strategies for informed financial
                                management.
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
                            icon: "🧠",
                            title: "AI-Powered Financial Analysis",
                            description:
                                "Leverage machine learning for accurate, adaptive data analysis and predictive financial insights.",
                        },
                        {
                            icon: "🔗",
                            title: "Intelligent Data Integration",
                            description:
                                "Automate financial data integration across multiple sources with AI-powered accuracy and speed.",
                        },
                        {
                            icon: "📊",
                            title: "Advanced Trend Detection",
                            description:
                                "Gain deep insights with AI-enhanced trend analysis, uncovering patterns and opportunities.",
                        },
                        {
                            icon: "📈",
                            title: "Dynamic Insight Generation",
                            description:
                                "Generate comprehensive insights and create sophisticated financial models with AI assistance.",
                        },
                        {
                            icon: "🔍",
                            title: "Anomaly Detection",
                            description:
                                "Identify financial irregularities and potential risks with AI-powered anomaly detection algorithms.",
                        },
                        {
                            icon: "🔮",
                            title: "AI-Driven Predictive Analytics",
                            description:
                                "Explore future financial scenarios and their potential outcomes with advanced AI simulations.",
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

export default FinsightPro

import React from "react"
import { CContainer, CRow, CCol, CCard, CCardBody } from "@coreui/react"

const Press = () => {
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
                        BizIntelAI Press Room
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
                        Discover our latest innovations and industry-shaping events
                    </h6>
                </CContainer>
            </section>

            {/* Featured Products Section */}
            <section style={{ padding: "60px 10%", backgroundColor: "#fff" }}>
                <CContainer>
                    <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                        Our Featured Products
                    </h3>
                    <CRow className="mt-4">
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="FP&A Powered By ML and AI"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5 style={{ fontWeight: "bold" }}>
                                        FP&A Powered By ML and AI
                                    </h5>
                                    <p>
                                        Revolutionary financial planning powered by advanced machine
                                        learning algorithms.
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="FinSightPro"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5 style={{ fontWeight: "bold" }}>FinSightPro</h5>
                                    <p>
                                        Gain unparalleled insights into your financial data with our
                                        analytics platform.
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="DataFusion"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5 style={{ fontWeight: "bold" }}>DataFusion</h5>
                                    <p>
                                        Seamlessly integrate and analyze data from multiple sources
                                        for comprehensive financial planning.
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Magic Excel"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5 style={{ fontWeight: "bold" }}>Magic Excel</h5>
                                    <p>
                                        Transform your Excel experience with AI-powered financial
                                        modeling capabilities.
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </section>

            {/* Recent and Upcoming Events Section */}
            <section style={{ padding: "60px 10%", backgroundColor: "#fff" }}>
                <CContainer>
                    <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                        Recent and Upcoming Events
                    </h3>
                    <CRow className="mt-4">
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="FP&A Powered By ML and AI"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5>FinTech Summit 2024</h5>
                                    <p>
                                        Join us at the largest financial technology conference in
                                        North America.
                                    </p>
                                    <p>
                                        <strong>Date:</strong> September 15-17, 2024
                                    </p>
                                    <p>
                                        <strong>Location:</strong> New York City, NY
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="FinSightPro"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5>AI in Finance Webinar Series</h5>
                                    <p>
                                        A monthly webinar exploring the latest AI applications in
                                        financial planning and analysis.
                                    </p>
                                    <p>
                                        <strong>Date:</strong> First Thursday of every month
                                    </p>
                                    <p>
                                        <strong>Location:</strong> Virtual
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="DataFusion"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5>BizIntelAI User Conference</h5>
                                    <p>
                                        Our annual gathering of clients, partners, and industry
                                        experts.
                                    </p>
                                    <p>
                                        <strong>Date:</strong> November 8-10, 2024
                                    </p>
                                    <p>
                                        <strong>Location:</strong> San Francisco, CA
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md="3">
                            <CCard className="h-100">
                                <CCardBody>
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Magic Excel"
                                        style={{ width: "100%", marginBottom: "10px" }}
                                    />
                                    <h5 style={{ fontWeight: "bold" }}>Magic Excel</h5>
                                    <p>
                                        Transform your Excel experience with AI-powered financial
                                        modeling capabilities.
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </section>

            {/* Media Resources Section */}
            <section style={{ padding: "60px 10%", backgroundColor: "#fff" }}>
                <CContainer>
                    <h3 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
                        Media Resources
                    </h3>
                    <CCard>
                        <CCardBody>
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                <li>
                                    <a
                                        href="/path/to/press-kit"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        Download Press Kit
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/path/to/fact-sheet"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        Company Fact Sheet
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/path/to/executive-bios"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        Executive Bios
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/path/to/logos"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        High-Resolution Logos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/path/to/product-images"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        Product Images
                                    </a>
                                </li>
                            </ul>
                        </CCardBody>
                    </CCard>
                </CContainer>
            </section>

            <section
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "50px 0",
                    backgroundColor: "#fff",
                    textAlign: "center",
                }}
            >
                <CContainer>
                    <h3 style={{ fontWeight: "bold", color: "#0d3b66" }}>
                        Connect with Our Media Relations Team
                    </h3>
                    <p style={{ color: "#5a5a5a", maxWidth: "600px", margin: "15px auto" }}>
                        For press inquiries, interview requests, or additional information about
                        BizIntelAI
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
                        Contact Press Team
                    </button>
                </CContainer>
            </section>
        </div>
    )
}

export default Press

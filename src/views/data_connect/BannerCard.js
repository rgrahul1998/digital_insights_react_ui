import React from "react"
import { CCard, CCardBody, CRow, CCol } from "@coreui/react"
// import bannerImage from "./path-to-image.png"; // dynamic import

const BannerCard = () => {
    return (
        <CCard
            className="p-4 mb-4"
            style={{
                backgroundColor: "#f9fafb",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            <CRow className="align-items-center">
                <CCol md={6}>
                    <div style={{ padding: "20px" }}>
                        <h2 style={{ fontWeight: "700", color: "#333" }}>Build your report</h2>
                        <ul
                            style={{
                                listStyleType: "none",
                                paddingLeft: 0,
                                fontSize: "1rem",
                                color: "#555",
                                lineHeight: "1.8",
                            }}
                        >
                            <li>➔ Add and prepare your data</li>
                            <li>➔ Generate a premade report</li>
                            <li>➔ Customize to suit your needs</li>
                        </ul>
                    </div>
                </CCol>
                <CCol md={6} className="d-flex justify-content-center align-items-center">
                    <img
                        // src={bannerImage}
                        alt="banner"
                        style={{
                            width: "70%",
                            height: "auto",
                            borderRadius: "8px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                </CCol>
            </CRow>
        </CCard>
    )
}

export default BannerCard

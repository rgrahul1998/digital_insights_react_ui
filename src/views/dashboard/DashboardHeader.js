import React from "react"
import { CContainer, CNav, CNavItem, CNavLink, CNavbar } from "@coreui/react"

const DashboardHeader = () => {
    return (
        <CNavbar
            expand="lg"
            colorScheme="light"
            className="bg-light mb-3"
            style={{
                backgroundColor: "#f8f9fa", // Light grey background
                padding: "0.25rem 1rem", // Compact padding for a clean look
                borderRadius: "8px", // Slightly rounded corners
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            }}
        >
            <CContainer fluid>
                {/* Left Side Links */}
                <CNav className="me-auto">
                    {["File", "View", "Reading View", "Mobile Layout", "Open Data Model"].map(
                        (item) => (
                            <CNavItem key={item}>
                                <CNavLink
                                    href="#"
                                    style={{
                                        padding: "0.25rem 0.75rem",
                                        fontSize: "0.85rem",
                                        fontFamily: "'Inter', sans-serif", // Modern font
                                        transition: "color 0.3s ease",
                                    }}
                                    className="nav-link-modern"
                                >
                                    {item}
                                </CNavLink>
                            </CNavItem>
                        ),
                    )}
                </CNav>

                {/* Right Side Links */}
                <CNav className="ms-auto">
                    {[
                        "Explore this data",
                        "Ask a Question",
                        "Data/Drill",
                        "Text Box",
                        "Shapes",
                        "Buttons",
                        "Visual Interactions",
                    ].map((item) => (
                        <CNavItem key={item}>
                            <CNavLink
                                href="#"
                                style={{
                                    padding: "0.25rem 0.75rem",
                                    fontSize: "0.85rem",
                                    fontFamily: "'Inter', sans-serif", // Modern font
                                    transition: "color 0.3s ease",
                                }}
                                className="nav-link-modern"
                            >
                                {item}
                            </CNavLink>
                        </CNavItem>
                    ))}
                </CNav>
            </CContainer>
        </CNavbar>
    )
}

export default DashboardHeader

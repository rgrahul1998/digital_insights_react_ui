import React, { useState, useEffect, useCallback, useMemo } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Button from "react-bootstrap/Button"
import "./Navbar.css" // Global styles
import useLogout from "./use_logout"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material"
import Logo from "../assets/brand/adlogo.png"

const DropdownMenu = ({ title, items, isOpen, onMouseEnter, onMouseLeave }) => (
    <NavDropdown
        title={title}
        id={`${title.toLowerCase().replace(" ", "-")}-nav-dropdown`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        show={isOpen} // Control dropdown visibility
        style={{ cursor: "pointer" }} // Add pointer cursor
    >
        {items.map((item, index) => (
            <NavDropdown.Item key={index} href={item.href}>
                {item.label}
            </NavDropdown.Item>
        ))}
    </NavDropdown>
)

function NavBar() {
    const [openDropdown, setOpenDropdown] = useState(null)
    const handleLogout = useLogout()
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        setIsLoggedIn(!!token)
    }, [])

    const handleMenuOpen = useCallback((event) => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const handleDropdownMouseEnter = (dropdown) => setOpenDropdown(dropdown)
    const handleDropdownMouseLeave = () => setOpenDropdown(null)

    // Memoized logo styles
    const logoStyle = useMemo(
        () => ({
            transform: "scale(1.5)",
            transformOrigin: "left center",
            height: "50px",
            width: "auto",
        }),
        [],
    )

    // Dropdown menu items
    const menuItems = useMemo(
        () => ({
            solutions: [
                { label: "Finance Consolidation", href: "/solutions/finance-consolidation" },
                { label: "Predictive Analytics", href: "/solutions/predictive-analytics" },
                { label: "Budgeting & Forecasting", href: "/solutions/budgeting-forecasting" },
                { label: "Financial Reporting", href: "/solutions/financial-reporting" },
                { label: "Data Integration", href: "/solutions/data-integration" },
            ],
            products: [
                { label: "FP&A Powered by ML and AI", href: "/products/fp-and-a-ml-ai" },
                { label: "FinSightPro", href: "/products/finsightpro" },
                { label: "DataFusion", href: "/products/datafusion" },
                { label: "Magic Excel", href: "/products/magic-excel" },
                { label: "CRM", href: "/products/crm" },
            ],
            resources: [
                { label: "Blog", href: "/resources/blog" },
                { label: "Training Videos", href: "/resources/training-videos" },
                { label: "Knowledge Base", href: "/resources/knowledge-base" },
                { label: "Events", href: "/resources/events" },
            ],
            aboutUs: [
                { label: "Our Story", href: "/about-us/our-story" },
                { label: "Team", href: "/about-us/team" },
                { label: "Careers", href: "/about-us/careers" },
                { label: "Press", href: "/about-us/press" },
            ],
        }),
        [],
    )

    return (
        <Navbar bg="white" variant="light" className="custom-navbar" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} style={logoStyle} alt="Logo of Sitemark" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <DropdownMenu
                            title="Solutions"
                            items={menuItems.solutions}
                            isOpen={openDropdown === "Solutions"}
                            onMouseEnter={() => handleDropdownMouseEnter("Solutions")}
                            onMouseLeave={handleDropdownMouseLeave}
                        />
                        <DropdownMenu
                            title="Products"
                            items={menuItems.products}
                            isOpen={openDropdown === "Products"}
                            onMouseEnter={() => handleDropdownMouseEnter("Products")}
                            onMouseLeave={handleDropdownMouseLeave}
                        />
                        <Nav.Link href="/pricing">Pricing</Nav.Link>
                        <DropdownMenu
                            title="Resources"
                            items={menuItems.resources}
                            isOpen={openDropdown === "Resources"}
                            onMouseEnter={() => handleDropdownMouseEnter("Resources")}
                            onMouseLeave={handleDropdownMouseLeave}
                        />
                        <DropdownMenu
                            title="About Us"
                            items={menuItems.aboutUs}
                            isOpen={openDropdown === "About Us"}
                            onMouseEnter={() => handleDropdownMouseEnter("About Us")}
                            onMouseLeave={handleDropdownMouseLeave}
                        />
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto d-flex align-items-center">
                        {isLoggedIn ? (
                            <>
                                <IconButton onClick={handleMenuOpen}>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        )}
                        <Nav.Link href="/request-demo">
                            <Button variant="primary">Request Demo</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar

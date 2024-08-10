import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import useLogout from './use_logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
// eslint-disable-next-line

function NavBar() {
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);
  const handleLogout = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const logoStyle = {
    transform: 'scale(1.5)', // Adjust the scale factor as needed
    transformOrigin: 'left center', // Ensure it scales from the left center to not overflow the navbar
    height: '50px', // Ensure it doesn't exceed the navbar height
    width: 'auto' // Maintain the aspect ratio
  };
  return (
    <>
      <Navbar bg="light" variant="light" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
              style={logoStyle}
              alt="logo of sitemark"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item href="/products/automation">Automation</NavDropdown.Item>
                <NavDropdown.Item href="/products/ai-intelligence">AI Intelligence</NavDropdown.Item>
                <NavDropdown.Item href="/products/relationship-management">Relationship Management</NavDropdown.Item>
                <NavDropdown.Item href="/products/erp-system">ERP System</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Resources" id="basic-nav-dropdown">
                <NavDropdown.Item href="/resources/blog">Blog</NavDropdown.Item>
                <NavDropdown.Item href="/resources/case-studies">Case Studies</NavDropdown.Item>
                <NavDropdown.Item href="/resources/webinars">Webinars</NavDropdown.Item>
                <NavDropdown.Item href="/resources/documentation">Documentation</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="About Us" id="basic-nav-dropdown">
                <NavDropdown.Item href="/about/our-story">Our Story</NavDropdown.Item>
                <NavDropdown.Item href="/about/Team">Team</NavDropdown.Item>
                <NavDropdown.Item href="/about/careers">Careers</NavDropdown.Item>
                <NavDropdown.Item href="/about/press">Press</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
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
                  <Nav.Link href="/request-demo">
                    <Button variant="primary">Request Demo</Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

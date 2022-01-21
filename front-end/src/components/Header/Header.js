import React from 'react';
import {Nav,Navbar,NavDropdown} from 'react-bootstrap';
import './Header.css';
const Header = () => {
return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/login" className='ok'>Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className='dao'>
    <NavDropdown title="Products" id="nav-dropdown-products">
          <NavDropdown.Item href="/addProducts">Add Products</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/seeProducts">See Products</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/seeClaimableProducts">See Claimable Products</NavDropdown.Item>
        </NavDropdown>
      <Nav.Link href="/cart" >Cart</Nav.Link>
      <Nav.Link href="/" >Logout</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
};

export default Header;
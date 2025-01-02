import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { MdPersonOutline } from "react-icons/md";

function Header() {




  return (
    <Navbar expand="xxl" className="navbar d-flex align-items-center">
      <Container>
        <Navbar.Brand
          href="#home"
          className="mx-auto"
        >
          <h1 className="logo">TOTAL BALANÇAS</h1>
        </Navbar.Brand>
        <div className="user">
          <a href="#user" className="user-icon">
            <MdPersonOutline />
          </a>
        </div>
      </Container>

    </Navbar>
  );
}

export default Header;
import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaInfoCircle, FaServicestack, FaPhoneAlt } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Monitora redimensionamento da janela
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Botão de hambúrguer */}
      <div
        ref={hamburgerRef}
        className={`hamburger-btn ${isOpen ? "hamburger-expanded" : "hamburger-collapsed"}`}
        onClick={toggleSidebar}
      >
        <FaBars />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}
      >
        <Nav
          className="flex-column menu-items"
          activeKey={activeLink}
          onSelect={(selectedKey) => setActiveLink(selectedKey)}
        >
          <Nav.Link href="#home" eventKey="#home">
            <div className="menu-item">
              <FaHome className="menu-icon" />
              {isOpen && <span className="menu-text">Home</span>}
            </div>
          </Nav.Link>
          <Nav.Link href="#about" eventKey="#about">
            <div className="menu-item">
              <FaInfoCircle className="menu-icon" />
              {isOpen && <span className="menu-text">Sobre</span>}
            </div>
          </Nav.Link>
          <Nav.Link href="#services" eventKey="#services">
            <div className="menu-item">
              <FaServicestack className="menu-icon" />
              {isOpen && <span className="menu-text">Serviços</span>}
            </div>
          </Nav.Link>
          <Nav.Link href="#contact" eventKey="#contact">
            <div className="menu-item">
              <FaPhoneAlt className="menu-icon" />
              {isOpen && <span className="menu-text">Contato</span>}
            </div>
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
}

export default Sidebar;

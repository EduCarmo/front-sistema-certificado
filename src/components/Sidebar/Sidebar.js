import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHome, FaUserPlus, FaTools, FaFileAlt, FaUsers } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
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
    window.addEventListener("resize", handleResize);
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
        onMouseEnter={() => setIsOpen(true)} // Expande ao passar o mouse
        onMouseLeave={() => setIsOpen(false)} // Recolhe ao sair com o mouse
      >
        <Nav className="flex-column menu-items">
          <Nav.Link href="/home">
            <div className="menu-item">
              <FaHome className="menu-icon" />
              {isOpen && <span className="menu-text">Home</span>}
            </div>
          </Nav.Link>

          <Nav.Link href="/cadastro-cliente">
            <div className="menu-item">
              <FaUserPlus className="menu-icon" />
              {isOpen && <span className="menu-text">Clientes</span>}
            </div>
          </Nav.Link>

          <Nav.Link href="/cadastro-equipamento">
            <div className="menu-item">
              <FaTools className="menu-icon" />
              {isOpen && <span className="menu-text">Equipamentos</span>}
            </div>
          </Nav.Link>

          <Nav.Link href="/certificado">
            <div className="menu-item">
              <FaFileAlt className="menu-icon" />
              {isOpen && <span className="menu-text">Certificado</span>}
            </div>
          </Nav.Link>

          <Nav.Link href="/cadastro-usuario">
            <div className="menu-item">
              <FaUsers className="menu-icon" />
              {isOpen && <span className="menu-text">Usuários</span>}
            </div>
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
}

export default Sidebar;

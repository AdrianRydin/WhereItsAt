import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import "./hamburgermenu.css";
import { Link } from "react-router-dom";

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleMenu} className="hamburger-button">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 10 : 0,
          }}
          className="hamburger-line hamburger-line-black"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          className="hamburger-line hamburger-line-black"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -10 : 0,
          }}
          className="hamburger-line hamburger-line-black"
        />
      </button>

      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hamburger-menu hamburger-menu-white"
      >
        <ul>
          <Link to={"/"} className="link" onClick={toggleMenu}>
            <li>Home</li>
          </Link>
          <Link to={"/tickets"} className="link" onClick={toggleMenu}>
            <li>My Tickets</li>
          </Link>
          <Link to={"/cart"} className="link" onClick={toggleMenu}>
            <li>Shopping cart</li>
          </Link>
        </ul>
      </motion.nav>
    </div>
  );
}

export default Hamburger;

import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import "./hamburgermenu.css";

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
          className="hamburger-line"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          className="hamburger-line"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -10 : 0,
          }}
          className="hamburger-line"
        />
      </button>

      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hamburger-menu"
      >
        <ul>
          <li>Home</li>
          <li>My Tickets</li>
          <li>Shopping cart</li>
        </ul>
      </motion.nav>
    </div>
  );
}

export default Hamburger;

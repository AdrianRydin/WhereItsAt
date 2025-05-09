import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu.jsx";
import IndividualEvent from "./pages/IndividualEvent/IndividualEvent.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Tickets from "./pages/Tickets/Tickets.jsx";

function App() {
  return (
    <section className="app-wrapper">
      <Router>
        <HamburgerMenu />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/event/:id" element={<IndividualEvent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;

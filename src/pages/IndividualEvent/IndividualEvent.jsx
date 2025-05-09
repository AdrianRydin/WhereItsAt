/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./individualevent.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";
import BackArrow from "../../components/BackArrow/BackArrow";

function IndividualEvent() {
  const location = useLocation();
  const { e, index } = location.state || {};
  const [amount, setAmount] = useState(1);
  const [notification, setNotification] = useState("");

  if (!e) {
    return <div aria-live="assertive">No event data found.</div>;
  }

  function increaseAmount() {
    let newAmount = amount + 1;
    setAmount(newAmount);
  }
  function decreaseAmount() {
    let newAmount = amount - 1;
    setAmount(newAmount);
  }

  return (
    <section className="event-details-container">
      <BackArrow alt="Tillbaka till förra sidan" tabIndex="0" />
      <h1 className="event-details-container__header-title">Event</h1>

      <h2 className="event-details-container__desc">
        You are about to score some tickets to
      </h2>

      <aside className="event-details-info-container">
        <h1 className="pink-text">{e.name}</h1>
        <div className="event-details-info-container__date">
          <h3>{e.when.date}</h3>
          <h3>
            {e.when.from} - {e.when.to}
          </h3>
        </div>

        <p>@ {e.where}</p>
      </aside>

      <section className="event-details-container__price">
        <div className="price-text-container">
          <h1 className="pink-text-shadow price-text">
            {e.price * amount} sek
          </h1>
        </div>

        <aside className="amount-container">
          <aside className="amount-item">
            <RemoveIcon
              onClick={decreaseAmount}
              aria-label="Minska mängden biljetter"
            />
          </aside>
          <aside className="amount-item">
            <h1 id="quantity-display">{amount}</h1>
          </aside>
          <aside className="amount-item">
            <AddIcon
              onClick={increaseAmount}
              aria-label="Öka mängden av biljetter"
            />
          </aside>
        </aside>
      </section>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#37AEAB",
          width: "90%",
          height: "60px",
        }}
        onClick={() => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];

          const existingItemIndex = cart.findIndex((item) => item.id === e.id);

          if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += amount;
          } else {
            cart.push({
              id: e.id,
              title: e.name,
              date: e.when.date,
              from: e.when.from,
              to: e.when.to,
              price: e.price,
              quantity: amount,
              where: e.where,
            });
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          setNotification(`Lade till ${amount} ticket(s) to the cart!`);

          setTimeout(() => {
            setNotification("");
          }, 2000);
        }}
        aria-label={`Lägg till ${amount} biljetter till kundvagnen`}
      >
        Lägg i varukorgen
      </Button>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
    </section>
  );
}

export default IndividualEvent;

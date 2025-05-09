import React, { useEffect, useState } from "react";
import "./cart.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BackArrow from "../../components/BackArrow/BackArrow";

function Cart() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function decreaseCartItem(eventItem) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === eventItem.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  function increaseCartItem(eventItem) {
    const updatedCart = cart.map((item) => {
      if (item.id === eventItem.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  }

  function purchaseTickets() {
    localStorage.setItem("tickets", JSON.stringify(cart));

    localStorage.removeItem("cart");
    setCart([]);
  }

  return (
    <section className="cart-container flex">
      <BackArrow alt="Tillbaka till förra sidan" />
      <h1 className="pink-text">Shopping Cart</h1>

      <section className="orders-wrapper">
        {cart.map((event) => (
          <div className="order-container">
            <div className="event-text-container">
              <h1 className="pink-text">{event.title}</h1>
              <p>
                {event.date} kl {event.time}
              </p>
            </div>
            <aside className="amount-container">
              <aside className="amount-item">
                <RemoveIcon onClick={() => decreaseCartItem(event)} />
              </aside>
              <aside className="amount-item">
                <h1>{event.quantity}</h1>
              </aside>
              <aside className="amount-item">
                <AddIcon onClick={() => increaseCartItem(event)} />
              </aside>
            </aside>
          </div>
        ))}
      </section>

      <section className="purchase-container">
        <p
          style={{
            fontFamily: "Fira Sans",
            color: "rgba(255,255,255,0.8)",
            fontStyle: "italic",
          }}
        >
          Totalt värde på order
        </p>

        <h1
          style={{
            fontFamily: "Fira Sans",
            fontSize: "32px",
            fontWeight: "bold",
            textShadow: "1px 1px #f56b9a",
          }}
        >
          {cart.reduce((sum, item) => sum + item.quantity * item.price, 0)} sek
        </h1>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#37AEAB",
            width: "90%",
            height: "60px",
            fontFamily: "Fira Sans",
            fontSize: "22px",
            fontWeight: "semibold",
          }}
          onClick={() => {
            purchaseTickets();
            setNotification(`Biljett(er) skickade till "My Tickets"`);

            setTimeout(() => {
              setNotification("");
            }, 2000);
          }}
          aria-label="Lägg till order"
        >
          Skicka order
        </Button>
      </section>
      {notification && (
        <div className="notification">
          <p>{notification}</p>
        </div>
      )}
    </section>
  );
}

export default Cart;

import React from "react";
import "./tickets.css";
import BackArrow from "../../components/BackArrow/BackArrow";

function generateRandomString() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
function generateTickets(savedTickets) {
  const tickets = [];

  savedTickets.forEach((item) => {
    const section = String.fromCharCode(65 + Math.floor(Math.random() * 6));
    const startSeat = Math.floor(Math.random() * 200) + 1;

    for (let i = 0; i < item.quantity; i++) {
      tickets.push({
        id: `${item.id}-${i + 1}`,
        title: item.title,
        date: item.date,
        from: item.from,
        to: item.to,
        section,
        seat: startSeat + i,
        where: item.where,
        barcode: generateRandomString(),
      });
    }
  });
  return tickets;
}

function Tickets() {
  const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

  const tickets = generateTickets(savedTickets);
  return (
    <section className="tickets-wrapper">
      <BackArrow />
      <h1 className="pink-text">My Tickets</h1>

      <div className="ticket-list" aria-live="polite">
        {tickets.map((ticket) => (
          <section key={ticket.id} className="ticket-card">
            <aside className="ticket-title-container">
              <p className="what-text">WHAT</p>
              <h2 className="pink-text">{ticket.title}</h2>
            </aside>
            <aside className="ticket-where-container">
              <p className="where-text">WHERE</p>
              <h2 className="where-address">{ticket.where}</h2>
              <p className="where-specific">
                Göteborgs universitet. Pedagogen, hus A
              </p>
            </aside>

            <aside className="when-container">
              <div className="when-item dotted-right">
                <p>WHEN</p>
                <h1>{ticket.date}</h1>
              </div>
              <div className="when-item">
                <p>FROM</p>
                <h1>{ticket.from}</h1>
              </div>
              <div className="when-item dotted-left">
                <p>TO</p>
                <h1>{ticket.to}</h1>
              </div>
            </aside>

            <aside className="seating-address-container">
              <p>INFO</p>
              <p>
                Section {ticket.section} - seat {ticket.seat}, bring umbrella
              </p>
            </aside>

            <aside className="bar-code-container">
              <h1 className="barcode" aria-label="Barcode för biljett">
                {ticket.barcode}
              </h1>
              <p>#{ticket.barcode}</p>
            </aside>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Tickets;

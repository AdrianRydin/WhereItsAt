import React from "react";
import { useLocation } from "react-router-dom";

function IndividualEvent() {
  const location = useLocation();
  const { e, index } = location.state || {};

  if (!e) {
    return <div>No event data found.</div>; // fallback if someone goes to the URL manually
  }

  return (
    <div>
      <h1>{e.name}</h1>
      <p>{e.where}</p>
      <p>{e.when.date}</p>
      <p>
        {e.when.from} - {e.when.to}
      </p>
      <p>Price: {e.price} SEK</p>
      <p>Event index: {index}</p>
    </div>
  );
}

export default IndividualEvent;

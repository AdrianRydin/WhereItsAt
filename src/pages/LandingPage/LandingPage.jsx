import React, { useEffect } from "react";
import "./landingPage.css";
import Logo from "../../assets/Logo.png";
// eslint-disable-next-line no-unused-vars
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import eventsStore from "../../stores/events";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useSwipeStore from "../../stores/swipeStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function LandingPage() {
  const { events, isLoading, error, fetchData } = eventsStore();
  const { swipeIndex, setSwipeIndex } = useSwipeStore();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.swipeIndex === 1) {
      setSwipeIndex(1);
    }
  }, [location.state, setSwipeIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleSwipe = (e, info) => {
    // Swipe vänster
    if (info.offset.x < -100 && swipeIndex === 0) {
      animate(x, -300, { duration: 0.2 }).then(() => {
        x.set(0);
        setSwipeIndex(1);
      });
    } else if (info.offset.x > 100 && swipeIndex === 1) {
      // Swipe höger
      animate(x, 300, { duration: 0.2 }).then(() => {
        x.set(0);
        setSwipeIndex(0);
      });
    } else {
      animate(x, 0, { duration: 0.1 });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="motion-container">
      <motion.div
        className="Landing-page-container"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleSwipe}
        style={{ x, opacity }}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            setSwipeIndex(1);
          } else if (e.key === "ArrowLeft") {
            setSwipeIndex(0);
          }
        }}
      >
        {swipeIndex === 0 ? (
          <section className="landing-page-first-slide-container">
            <img src={Logo} alt="Logo for Where It's At" />
            <aside className="landing-page-text-container">
              <h1>Where It's @</h1>
              <p>Ticketing made easy</p>
            </aside>
          </section>
        ) : (
          <>
            <section className="event-list-container">
              <Link to={"/cart"}>
                <ShoppingCartIcon
                  sx={{
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    width: "30px",
                    height: "30px",
                    color: "white",
                  }}
                  aria-label="Gå till kundvagn"
                />
              </Link>
              <h1 className="event-list-title">Events</h1>

              <TextField
                id="search"
                variant="filled"
                color="warning"
                size="small"
                fullWidth
                label="Search"
                sx={{
                  marginBottom: "1.5rem",
                  backgroundColor: "#FFFFFF10",
                  borderRadius: "0.5rem",
                  "& .MuiFilledInput-root": {
                    height: "40px",
                    paddingTop: 0,
                    paddingBottom: "16px",
                    color: "white",
                    fontFamily: "Fira Sans",
                  },
                  "& Label": {
                    opacity: "0",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "white" }} />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />

              {events.map((e, index) => {
                return (
                  <section key={index} className="event-container">
                    <aside className="event-date">
                      {e.when.date && (
                        <>
                          <h2>{e.when.date.split(" ")[0]}</h2>
                          <h2>
                            {e.when.date
                              .split(" ")[1]
                              .slice(0, 3)
                              .toUpperCase()}
                          </h2>
                        </>
                      )}
                    </aside>
                    <aside className="event-info-container">
                      <Link
                        to={`/event/${e.id}`}
                        className="link"
                        state={{ e, index }}
                        aria-label={`Visa detaljer för ${e.name} evenemanget`}
                      >
                        <aside className="event-name-where-container">
                          <h1>{e.name}</h1>
                          <p>{e.where}</p>
                        </aside>
                        <aside className="event-time-price-container">
                          <p>
                            {e.when.from} - {e.when.to}
                          </p>
                          <h2>{e.price} SEK</h2>
                        </aside>
                      </Link>
                    </aside>
                  </section>
                );
              })}
            </section>
          </>
        )}

        <section className="progress-bar-container">
          <div className={`circle ${swipeIndex === 0 ? "active" : ""}`}></div>
          <div className={`circle ${swipeIndex === 1 ? "active" : ""}`}></div>
        </section>
      </motion.div>
    </div>
  );
}

export default LandingPage;

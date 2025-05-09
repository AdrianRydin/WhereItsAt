import React from "react";
import "./backarrow.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";

function BackArrow() {
  return (
    <div>
      <Link
        to={"/"}
        state={{ swipeIndex: 1 }}
        aria-label="Gå till evenemang sidan"
      >
        <KeyboardArrowLeftIcon
          sx={{
            position: "fixed",
            top: "20px",
            left: "20px",
            color: "white",
            width: "30px",
            height: "30px",
          }}
        />
      </Link>
    </div>
  );
}

export default BackArrow;

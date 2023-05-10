import React from "react";
import { useRef } from "react";
import "./ErrNotification.css";

function ErrNotification({ text }) {
  return (
    <>
      <div className="err_notification">
        <p className="err_text">{text}</p>
      </div>
    </>
  );
}

export default ErrNotification;

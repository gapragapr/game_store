import React from "react";
import "./SearchInput.css";

export default function SearchInput({ placeholder }) {
  return (
    <input id="search_input" type="text" placeholder={placeholder || "Поиск"} />
  );
}

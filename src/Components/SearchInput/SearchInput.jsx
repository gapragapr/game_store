import React from "react";
import "./SearchInput.css";
import Tooltip from "./Tooltip/Tooltip";
import { useGetSearchResultQuery } from "../../store/api/searchApi";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function SearchInput({ placeholder }) {
  const [searchText, setSearchText] = useState("");
  const { data } = useGetSearchResultQuery(searchText);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchText !== "") {
      searchRef.current.classList.add("active_search");
    } else {
      searchRef.current.classList.remove("active_search");
    }
  }, [searchText]);

  function onChangeInputHandler(e) {
    setSearchText(e.target.value);
  }

  return (
    <div ref={searchRef} className="input_container">
      <input
        onChange={(e) => onChangeInputHandler(e)}
        id="search_input"
        type="text"
        placeholder={placeholder || "Поиск"}
      />
      {searchText !== "" && data && (
        <Tooltip setSearchText={setSearchText} game={data} />
      )}
    </div>
  );
}

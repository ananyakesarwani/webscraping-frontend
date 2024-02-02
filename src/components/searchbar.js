// SearchBar.js
import React, { useState } from "react";
import { appConstants } from "../constants/constants";

const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <input
            type="text"
            placeholder={`Input here ${
              props.searchOption && props.searchOption.target.value === "keyword"
                ? "Keyword"
                : "Part Number"
            }`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={() => props.handleSearch(appConstants.apiKey, searchText)}>
            <span role="img" aria-label="Search">
              🔍
            </span>
          </button>
        </div>
    </div>
  );
};

export default SearchBar;

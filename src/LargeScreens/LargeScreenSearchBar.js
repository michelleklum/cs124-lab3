import React, { Fragment } from "react";
import "./LargeScreenSearchBar.css";

function LargeScreenSearchBar(props) {
  return (
    <Fragment>
      <div className="large-screen-search">
        <i className="fas fa-search fa-3x"></i>
        <label
          htmlFor="large-screen-search"
          className="large-screen-search-label"
        >
          Search
        </label>
        <input
          type="text"
          id="large-screen-search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          autoFocus
          value={props.searchQuery}
          onInput={(e) => props.setSearchQuery(e.target.value)}
        />
      </div>
    </Fragment>
  );
}

export default LargeScreenSearchBar;

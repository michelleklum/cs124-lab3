import React, { Fragment } from "react";
import "./LargeScreenSearchBar.css";

function LargeScreenSearchBar(props) {
  return (
    <Fragment>
      <div id="large-screen-search-bar" className="large-screen-search">
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
          value={props.searchQuery}
          onInput={(e) => props.setSearchQuery(e.target.value)}
          autoFocus={props.searchQuery.length > 0}
          aria-label={props.listName}
        />
      </div>
    </Fragment>
  );
}

export default LargeScreenSearchBar;

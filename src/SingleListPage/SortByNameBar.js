import React, { Fragment } from "react";

function SortByNameBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-sort-alpha-down sort-by-name-icon"
        onClick={() => props.onChangeSort("name")}
      ></i>
      <h2
        className="sort-by-name-desc"
        onClick={() => props.onChangeSort("name")}
      >
        Sort tasks by name
      </h2>
    </Fragment>
  );
}

export default SortByNameBar;

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
        Sort by name
      </h2>
      {props.listTasksPrimarySortField === "name" && (
        <i className="fas fa-check fa-4x sort-by-name-check"></i>
      )}
    </Fragment>
  );
}

export default SortByNameBar;

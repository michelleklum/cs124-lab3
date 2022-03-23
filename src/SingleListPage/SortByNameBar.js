import React, { Fragment } from "react";

function SortByNameBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-sort-alpha-down sort-by-name-icon"
        onClick={() => props.onChangeSort("nameLowercasedForSorting")}
      ></i>
      <h2
        className="sort-by-name-desc"
        onClick={() => props.onChangeSort("nameLowercasedForSorting")}
      >
        name
      </h2>
      {props.listTasksPrimarySortField === "nameLowercasedForSorting" && (
        <i className="fas fa-check fa-4x sort-by-name-check"></i>
      )}
    </Fragment>
  );
}

export default SortByNameBar;

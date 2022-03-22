import React, { Fragment } from "react";

function SortByModificationTimeBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-calendar-check sort-by-modified-time-icon"
        onClick={() => props.onChangeSort("modifiedTime")}
      ></i>
      <h2
        className="sort-by-modified-time-desc"
        onClick={() => props.onChangeSort("modifiedTime")}
      >
        Sort by modification time
      </h2>
      {props.listTasksPrimarySortField === "modifiedTime" && (
        <i className="fas fa-check fa-4x sort-by-modified-time-check"></i>
      )}
    </Fragment>
  );
}

export default SortByModificationTimeBar;

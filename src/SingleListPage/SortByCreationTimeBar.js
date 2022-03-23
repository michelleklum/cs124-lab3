import React, { Fragment } from "react";

function SortByCreationTimeBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-calendar-plus sort-by-creation-time-icon"
        onClick={() => props.onChangeSort("creationTime")}
      ></i>
      <h2
        className="sort-by-creation-time-desc"
        onClick={() => props.onChangeSort("creationTime")}
      >
        creation time
      </h2>
      {props.listTasksPrimarySortField === "creationTime" && (
        <i className="fas fa-check fa-4x sort-by-creation-time-check"></i>
      )}
    </Fragment>
  );
}

export default SortByCreationTimeBar;

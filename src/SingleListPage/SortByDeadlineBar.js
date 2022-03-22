import React, { Fragment } from "react";

function SortByDeadlineBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-clock sort-by-deadline-icon"
        onClick={() => props.onChangeSort("deadline")}
      ></i>
      <h2
        className="sort-by-deadline-desc"
        onClick={() => props.onChangeSort("deadline")}
      >
        Sort by deadline
      </h2>
      {props.listTasksSortField === "deadline" && (
        <i className="fas fa-check fa-4x sort-by-deadline-check"></i>
      )}
    </Fragment>
  );
}

export default SortByDeadlineBar;

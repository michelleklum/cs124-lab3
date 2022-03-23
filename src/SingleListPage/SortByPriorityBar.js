import React, { Fragment } from "react";

function SortByPriorityBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-exclamation-circle sort-by-priority-icon"
        onClick={() => props.onChangeSort("priority")}
      ></i>
      <h2
        className="sort-by-priority-desc"
        onClick={() => props.onChangeSort("priority")}
      >
        priority
      </h2>
      {props.listTasksPrimarySortField === "priority" && (
        <i className="fas fa-check fa-4x sort-by-priority-check"></i>
      )}
    </Fragment>
  );
}

export default SortByPriorityBar;

import React, { Fragment } from "react";

function SortByDeadlineBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-calendar sort-by-deadline-icon"
        onClick={() => props.onChangeSort("deadline")}
      ></i>
      <h2
        className="sort-by-deadline-desc"
        onClick={() => props.onChangeSort("deadline")}
      >
        Sort tasks by deadline
      </h2>
    </Fragment>
  );
}

export default SortByDeadlineBar;

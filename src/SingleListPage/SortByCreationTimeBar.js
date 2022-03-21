import React, { Fragment } from "react";

function SortByCreationTimeBar(props) {
  return (
    <Fragment>
      <i
        className="fas fa-clock sort-by-creation-time-icon"
        onClick={() => props.onChangeSort("creationTime")}
      ></i>
      <h2
        className="sort-by-creation-time-desc"
        onClick={() => props.onChangeSort("creationTime")}
      >
        Sort tasks by creation time
      </h2>
    </Fragment>
  );
}

export default SortByCreationTimeBar;

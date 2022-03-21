import React, { Fragment } from "react";

function SortByCreationTimeBar(props) {
  function changeListToSortByCreationTime() {
    props.onEditList(props.currentListId, "sortBy", "creationTime");
  }

  return (
    <Fragment>
      <i
        className="fas fa-clock sort-by-creation-time-icon"
        onClick={changeListToSortByCreationTime}
      ></i>
      <h2
        className="sort-by-creation-time-desc"
        onClick={changeListToSortByCreationTime}
      >
        Sort tasks by creation time
      </h2>
    </Fragment>
  );
}

export default SortByCreationTimeBar;

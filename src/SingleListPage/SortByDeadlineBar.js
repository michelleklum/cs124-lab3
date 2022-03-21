import React, { Fragment } from "react";

function SortByDeadlineBar(props) {
  function changeListToSortByDeadline() {
    props.onEditList(props.currentListId, "sortBy", "deadline");
  }

  return (
    <Fragment>
      <i
        className="fas fa-calendar sort-by-deadline-icon"
        onClick={changeListToSortByDeadline}
      ></i>
      <h2
        className="sort-by-deadline-desc"
        onClick={changeListToSortByDeadline}
      >
        Sort tasks by deadline
      </h2>
    </Fragment>
  );
}

export default SortByDeadlineBar;
